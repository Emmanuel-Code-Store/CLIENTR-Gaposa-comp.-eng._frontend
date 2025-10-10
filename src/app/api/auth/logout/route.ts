import { NextResponse } from 'next/server';
import { serialize } from 'cookie';
import { COOKIE_NAME } from '@/constants';

export async function POST() {
  try {
    console.log('API Proxy: Logging out, clearing cookie');
    const serialized = serialize(COOKIE_NAME, '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/',
    });

    return NextResponse.json(
      { message: 'Logged out successfully' },
      {
        status: 200,
        headers: { 'Set-Cookie': serialized },
      }
    );
  } catch (error) {
    console.error('API Proxy: /api/auth/logout error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}