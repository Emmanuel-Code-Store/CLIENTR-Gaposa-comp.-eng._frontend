import { NextRequest, NextResponse } from 'next/server';

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || '';
const API_KEY = process.env.API_KEY || '';

export async function GET(request: NextRequest) {
  try {
    
    const accessToken = request.cookies.get('access_token')?.value;

    if (!accessToken) {
      return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
    }

    const backendResponse = await fetch(`${API_BASE}/module-access`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'Cookie': `access_token=${accessToken}`,
      },
      credentials: 'include',
    });

    const data = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(
        { message: data.message || 'Failed to fetch module permissions' },
        { status: backendResponse.status }
      );
    }

    if (!Array.isArray(data)) {
      return NextResponse.json(
        { message: 'Invalid response format: Expected array of module permissions' },
        { status: 500 }
      );
    }

    const response = NextResponse.json(data, { status: 200 });

    const setCookie = backendResponse.headers.get('set-cookie');
    if (setCookie) {
      response.headers.set('Set-Cookie', setCookie);
    }

    return response;
  } catch (error) {
    console.error('[ModuleAccess] Internal error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}