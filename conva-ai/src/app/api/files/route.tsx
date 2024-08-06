import { put, del } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request){
    const json = await request.json();
    console.log({json});
    await del(json.url);
    return NextResponse.json({});
}

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  if (!filename) {
    return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
  }

  const body = request.body;

  if (!body) {
    return NextResponse.json({ error: 'Request body is required' }, { status: 400 });
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN; // Ensure this environment variable is set

  if (!token) {
    return NextResponse.json({ error: 'Token is required' }, { status: 500 });
  }

  const blob = await put(filename, body, {
    access: 'public',
    token: token,
  });

  return NextResponse.json(blob);
}

// The next lines are required for Pages API Routes only
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
