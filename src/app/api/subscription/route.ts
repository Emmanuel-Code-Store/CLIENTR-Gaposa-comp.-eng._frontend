'use server';

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || '';
const API_KEY = process.env.API_KEY || '';

export async function GET() {
  try {
    const cookieStore = await  cookies();
    const accessToken = cookieStore.get('access_token')?.value || '';

    const backendRes = await fetch(`${API_BASE}/subscriptions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        ...(accessToken && { Cookie: `access_token=${accessToken}` }),
      },
    });

    const data = await backendRes.json();
    console.log('Backend Subscriptions Response:', data);

    if (!backendRes.ok) {
      return NextResponse.json(
        { message: data.message || 'Failed to fetch subscriptions' },
        { status: backendRes.status }
      );
    }

    return NextResponse.json({ subscriptions: data }, { status: 200 });
  } catch (err) {
    console.error('[GET /api/subscribe] Error:', err);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value || '';

    const backendRes = await fetch(`${API_BASE}/subscriptions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        ...(accessToken && { Cookie: `access_token=${accessToken}` }),
      },
      body: JSON.stringify({ email }),
    });

    const data = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json(
        { message: data.message || 'Failed to subscribe' },
        { status: backendRes.status }
      );
    }

    return NextResponse.json(
      { message: 'Subscription created successfully', subscription: data },
      { status: 201 }
    );
  } catch (err) {
    console.error('[POST /api/subscribe] Error:', err);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
