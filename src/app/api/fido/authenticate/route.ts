import { NextResponse } from 'next/server';

const API_KEY = process.env.API_KEY!;
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, response } = body;

    if (!userId || !response) {
      return new NextResponse(JSON.stringify({ message: 'Missing userId or response' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const cookieHeader = req.headers.get('cookie') || '';

    const backendRes = await fetch(`${BACKEND_URL}/fido/authenticate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookieHeader,
        'x-api-key': API_KEY,
      },
      credentials: 'include',
      body: JSON.stringify({ userId, response }),
    });

    const result = await backendRes.json();

    return new NextResponse(JSON.stringify(result), {
      status: backendRes.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[API] FIDO Authentication Error:', err);
    return new NextResponse(JSON.stringify({ message: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}