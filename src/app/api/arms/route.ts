import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || '';
const API_KEY = process.env.API_KEY || '';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const armsName = body.name || body.arms_name;

    if (!armsName) {
      return NextResponse.json(
        { message: 'Arms name is required' },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value || '';

    const backendRes = await fetch(`${API_BASE}/arms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        ...(accessToken && { Cookie: `access_token=${accessToken}` }),
      },
      body: JSON.stringify({ name: armsName }),
    });

    const data = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json(
        { message: data.message || 'Failed to create arms' },
        { status: backendRes.status }
      );
    }

    return NextResponse.json(
      { message: 'Arms created', arms: data },
      { status: 201 }
    );
  } catch (error) {
    console.error('[POST /api/arms] Error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value || '';

    const backendRes = await fetch(`${API_BASE}/arms`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        ...(accessToken && { Cookie: `access_token=${accessToken}` }),
      },
    });

    const data = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json(
        { message: data.message || 'Failed to fetch arms' },
        { status: backendRes.status }
      );
    }

    return NextResponse.json({ arms: data }, { status: 200 });
  } catch (error) {
    console.error('[GET /api/arms] Error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
