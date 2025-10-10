import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || '';
const API_KEY = process.env.API_KEY || '';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value || '';

    const backendRes = await fetch(`${API_BASE}/subject`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        ...(accessToken && { Cookie: `access_token=${accessToken}` }),
      },
    });

    const data = await backendRes.json();
    console.log('Backend Subjects Response:', data);

    if (!backendRes.ok) {
      return NextResponse.json(
        { message: data.message || 'Failed to fetch subjects' },
        { status: backendRes.status }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error('[GET /api/subject] Error:', err);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, code, subject_description } = body;

    if (!name || !code || !subject_description) {
      return NextResponse.json(
        { message: 'Name, code, and subject description are required' },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value || '';

    const backendRes = await fetch(`${API_BASE}/subject`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        ...(accessToken && { Cookie: `access_token=${accessToken}` }),
      },
      body: JSON.stringify({ name, code, subject_description }),
    });

    const data = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json(
        { message: data.message || 'Failed to register subject' },
        { status: backendRes.status }
      );
    }

    return NextResponse.json(
      { message: 'Subject created successfully', subject: data },
      { status: 201 }
    );
  } catch (err) {
    console.error('[POST /api/subject] Error:', err);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}