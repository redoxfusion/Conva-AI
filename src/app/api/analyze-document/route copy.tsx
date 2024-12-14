import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import formidable, { File } from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false, // Disable body parsing to handle the form data manually
  },
};

interface AnalysisResponse {
  summary: string;
}

async function parseFormData(req: NextRequest): Promise<{ fields: formidable.Fields; files: formidable.Files }> {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm();

    form.parse(req.body as any, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { files } = await parseFormData(req);

    const file = files.document as File | File[];
    if (!file || (Array.isArray(file) && !file[0].filepath)) {
      return NextResponse.json({ error: 'No document uploaded' }, { status: 400 });
    }

    const filePath = Array.isArray(file) ? file[0].filepath : file.filepath;
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    const response = await axios.post<AnalysisResponse>('https://gemini-api-endpoint.com/analyze', {
      document: fileContent,
      model: 'gemini-1.5-flash', // Specify your model
    });

    const { summary } = response.data;
    return NextResponse.json({ summary });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Document analysis failed' }, { status: 500 });
  }
}
