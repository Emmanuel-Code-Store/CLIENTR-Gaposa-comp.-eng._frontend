import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || '';
const API_KEY = process.env.API_KEY || '';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const departmentname = body.name || body.departmentname;

    if (!departmentname) {
      return NextResponse.json(
        { message: 'Department name is required' },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value || '';

    const backendRes = await fetch(`${API_BASE}/department`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        ...(accessToken && { Cookie: `access_token=${accessToken}` }),
      },
      body: JSON.stringify({ name: departmentname }),
    });

    const data = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json({ message: data.message || 'Failed to create department' }, { status: backendRes.status });
    }

    return NextResponse.json({ message: 'Department created', department: data }, { status: 201 });
  } catch (error) {
    console.error('[POST /api/department] Error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}


export async function GET() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value || '';

    const backendRes = await fetch(`${API_BASE}/department`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        ...(accessToken && { Cookie: `access_token=${accessToken}` }),
      },
    });

    const data = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json({ message: data.message || 'Failed to fetch departments' }, { status: backendRes.status });
    }

    return NextResponse.json({ departments: data }, { status: 200 });
  } catch (error) {
    console.error('[GET /api/department] Error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}