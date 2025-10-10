import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || '';
const API_KEY = process.env.API_KEY || '';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const className = body.name;
    const createdBy = body.created_by;

    if (!className) {
      return NextResponse.json(
        { message: 'Class name are required' },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value || '';

    const backendRes = await fetch(`${API_BASE}/class`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        ...(accessToken && { Cookie: `access_token=${accessToken}` }),
      },
      body: JSON.stringify({ name: className, created_by: createdBy }),
    });

    const data = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json(
        { message: data.message || 'Failed to create class' },
        { status: backendRes.status }
      );
    }

    return NextResponse.json(
      { message: 'Class created', class: data },
      { status: 201 }
    );
  } catch (error) {
    console.error('[POST /api/class] Error:', error);
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

    const backendRes = await fetch(`${API_BASE}/class`, {
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
        { message: data.message || 'Failed to fetch classes' },
        { status: backendRes.status }
      );
    }

    return NextResponse.json({ classes: data }, { status: 200 });
  } catch (error) {
    console.error('[GET /api/class] Error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
