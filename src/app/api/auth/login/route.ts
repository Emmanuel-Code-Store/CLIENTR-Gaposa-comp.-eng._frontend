import { NextRequest, NextResponse } from 'next/server';

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || '';
const API_KEY = process.env.API_KEY || '';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const backendResponse = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    });

    const data = await backendResponse.json();

    if (!backendResponse.ok || !data.user) {
      return NextResponse.json({ message: data.message || 'Login failed' }, { status: backendResponse.status });
    }

    const setCookie = backendResponse.headers.get('set-cookie');
    const response = NextResponse.json(
      {
        message: 'Logged in successfully',
        user: {
          userId: data.user.userId,
          email: data.user.email,
          fullname: data.user.fullname,
          role: data.user.role,
        },
      },
      { status: 200 }
    );

    if (setCookie) {
      response.headers.set('Set-Cookie', setCookie);
    }

    return response;
  } catch (error) {
    console.error('[Login] Internal error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
