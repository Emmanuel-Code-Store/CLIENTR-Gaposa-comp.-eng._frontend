import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

interface ElectionPost {
  id: string;
  name: string;
  description: string;
  message: string;
}

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || '';
const API_KEY = process.env.API_KEY || '';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ electionPostId: string }> }
) {
  try {
    const { electionPostId } = await context.params;

    if (!electionPostId) {
      return NextResponse.json({ message: 'Election post UUID is required' }, { status: 400 });
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value || '';

    const backendRes = await fetch(`${API_BASE}/election_post/${electionPostId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        ...(accessToken && { Cookie: `access_token=${accessToken}` }),
      },
    });

    const data: ElectionPost = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json(
        { message: data.message || 'Failed to fetch election post' },
        { status: backendRes.status }
      );
    }

    return NextResponse.json({ electionPost: data }, { status: 200 });
  } catch (error) {
    console.error('[GET /api/election_post/[electionPostId]] Error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ electionPostId: string }> }
) {
  try {
    const { electionPostId } = await context.params;

    if (!electionPostId) {
      return NextResponse.json({ message: 'Election post UUID is required' }, { status: 400 });
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value || '';

    const backendRes = await fetch(`${API_BASE}/election_post/${electionPostId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        ...(accessToken && { Cookie: `access_token=${accessToken}` }),
      },
    });

    if (backendRes.status === 200) {
      return NextResponse.json({ message: 'Election post deleted successfully' }, { status: 200 });
    }

    let data = null;
    const text = await backendRes.text();
    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        data = text; 
      }
    }

    return NextResponse.json(
      { message: (data as ElectionPost)?.message || 'Failed to delete election post' },
      { status: backendRes.status }
    );
  } catch (error) {
    console.error('[DELETE /api/election_post/[uuid]] Error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}