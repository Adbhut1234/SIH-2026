import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

// Initialize the Google GenAI SDK
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { fileUrl } = await req.json();

    if (!fileUrl) {
      return NextResponse.json({ error: 'fileUrl is required' }, { status: 400 });
    }

    // 1. Fetch the image/PDF data from the public Supabase URL
    const imageResponse = await fetch(fileUrl);
    if (!imageResponse.ok) {
      return NextResponse.json({ error: 'Failed to fetch the file from the provided URL' }, { status: 400 });
    }
    
    const arrayBuffer = await imageResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const mimeType = imageResponse.headers.get('content-type') || 'application/pdf';

    // 2. Call Gemini 2.5 Flash API with Structured Outputs (JSON)
    const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: "You are a professional Land Record Analyst. Analyze this land record document (it could be an Indian 7/12 extract, a Khasra/Khatauni, a Sale Deed, or a survey map). Extract the details and return ONLY a valid JSON object matching this exact structure: { documentType: string, registrationDate: string, district: string, tehsil: string, khasraNumber: string, grantorName: string, granteeName: string, metesAndBounds: { north: string, south: string, east: string, west: string }, totalArea: string }. If a field is not found, return 'N/A' or 'Not specified'. Do not use markdown backticks in the response."
              },
              {
                inlineData: {
                  data: buffer.toString('base64'),
                  mimeType: mimeType,
                }
              }
            ]
          }
        ],
        config: {
          responseMimeType: 'application/json',
          temperature: 0.1,
          maxOutputTokens: 8192
        }
    });

    const jsonText = response.text || "{}";
    
    try {
      const parsedData = JSON.parse(jsonText);
      return NextResponse.json({ data: parsedData });
    } catch (parseError) {
      console.error("JSON Parse Error on Gemini output:", jsonText);
      return NextResponse.json({ error: 'Failed to parse Gemini output as JSON' }, { status: 500 });
    }
    
  } catch (error: any) {
    console.error("Gemini Extraction Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
