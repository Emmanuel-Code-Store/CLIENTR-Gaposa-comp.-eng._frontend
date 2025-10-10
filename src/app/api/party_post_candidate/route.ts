import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || '';
const API_KEY = process.env.API_KEY || '';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { postId, partyId, candidateId, electionId } = body;

    if (!postId || !partyId || !candidateId || !electionId) {
      return NextResponse.json(
        { message: 'All fields (post, party, candidate, election) are required' },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value || '';

    const backendRes = await fetch(`${API_BASE}/party_post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        ...(accessToken && { Cookie: `access_token=${accessToken}` }),
      },
      body: JSON.stringify({ postId, partyId, candidateId, electionId }),
    });

    const data = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json(
        { message: data.message || 'Failed to create party post candidate' },
        { status: backendRes.status }
      );
    }

    return NextResponse.json(
      { message: 'Party Post Candidate created successfully', partyPostCandidate: data },
      { status: 201 }
    );
  } catch (error) {
    console.error('[POST /api/party_post] Error:', error);
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

    const backendRes = await fetch(`${API_BASE}/party_post`, {
      method: 'GET',
      headers: {
        'x-api-key': API_KEY,
        ...(accessToken && { Cookie: `access_token=${accessToken}` }),
      },
    });

    const data = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json(
        { message: data.message || 'Failed to fetch party post candidates' },
        { status: backendRes.status }
      );
    }

    return NextResponse.json({ partyPostCandidates: data }, { status: 200 });
  } catch (error) {
    console.error('[GET /api/party_post] Error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
