import { NextResponse } from 'next/server';

const API_KEY = process.env.API_KEY!;
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

export async function POST(
  req: Request,
  context: { params: Promise<{ userId: string }> } 
) {
  
  const { userId } = await context.params;

  if (!userId) {
    return new NextResponse(JSON.stringify({ message: 'User ID is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const response = await fetch(`${BACKEND_URL}/fido/register/initiate/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': req.headers.get('cookie') || '',
        'x-api-key': API_KEY,
      },
      credentials: 'include',
    });

    const data = await response.json();

    return new NextResponse(JSON.stringify(data), {
      status: response.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('[API] Error proxying FIDO auth initiation:', error);
    return new NextResponse(JSON.stringify({ message: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}