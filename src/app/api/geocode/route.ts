import { NextRequest, NextResponse } from 'next/server';

// -------------------------------------------------------------
// HACKATHON MOCK CADASTRAL DATABASE
// -------------------------------------------------------------
// In a real system, you would query a Spatial DB (like PostGIS) 
// using the Khasra number to get the exact parcel coordinates.
const CADASTRAL_DATABASE: Record<string, { lat: string, lon: string }> = {
  '142/3': { lat: '18.5204', lon: '73.8567' }, // Haveli, Pune
  '1007': { lat: '28.5050000', lon: '77.1720000' },  // Chhatarpur, Delhi
  '45': { lat: '28.6139', lon: '77.2090' } // Example Central Delhi
};

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get('q');
  const khasra = req.nextUrl.searchParams.get('khasra');
  
  if (!query) {
    return NextResponse.json({ error: 'Query parameter "q" is required' }, { status: 400 });
  }

  // 1. Check Exact Cadastral Match
  if (khasra && CADASTRAL_DATABASE[khasra]) {
    return NextResponse.json([
      {
        lat: CADASTRAL_DATABASE[khasra].lat,
        lon: CADASTRAL_DATABASE[khasra].lon,
        isExactMatch: true,
        display_name: `Exact Cadastral Match: Khasra ${khasra}, ${query}`
      }
    ]);
  }

  // 2. Fallback to Approximate (Tehsil/District Center) via OpenStreetMap
  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'TerraVerify/1.0 (Contact: admin@terraverify.com)'
      }
    });

    if (!response.ok) {
      throw new Error(`Nominatim responded with status: ${response.status}`);
    }

    const data = await response.json();
    if (data && data.length > 0) {
      data[0].isExactMatch = false; // Mark as approximate
    }
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Geocoding API Route Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
