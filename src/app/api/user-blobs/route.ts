import { db } from '../../../lib/db';
import { auth } from '@clerk/nextjs/server';
import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 })
    }

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

    const userBlob = await db.userBlob.create({
      data: {
        userId,
        blobUrl: blob.url,
        pathname: blob.pathname,
      }
    })

    return NextResponse.json(userBlob);
  } catch (error) {
    console.log("[USERBLOB]", error);
    return new NextResponse("Internal Error", { status: 500 })
  }
}

// The next lines are required for Pages API Routes only
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
