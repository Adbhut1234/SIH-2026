import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase admin client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    // Ensure data exists
    if (!data || !data.documentUrl) {
      return NextResponse.json({ error: 'Missing documentUrl in payload' }, { status: 400 });
    }

    // Insert record into Supabase land_records table
    const { data: insertedData, error } = await supabase
      .from('land_records')
      .insert([
        {
          document_url: data.documentUrl,
          document_type: data.documentType || 'Unknown',
          khasra_number: data.khasraNumber || 'N/A',
          grantor_name: data.grantorName || 'N/A',
          grantee_name: data.granteeName || 'N/A',
          total_area: data.totalArea || 'N/A',
          tehsil: data.tehsil || 'N/A',
          district: data.district || 'N/A',
          registration_date: data.registrationDate || 'N/A',
          metes_and_bounds: data.metesAndBounds || {},
          hash_fingerprint: '0x8f3c72a819b16ef549bb3c21b9a45e78', // Defaulting to the deterministic hash we used in UI
          status: 'verified'
        }
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data: insertedData }, { status: 201 });
  } catch (error: unknown) {
    console.error("API error:", error);
    const err = error as Error;
    return NextResponse.json({ error: err.message || 'Failed to save record' }, { status: 500 });
  }
}
