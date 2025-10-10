import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '../../../utils/auth.utils';

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || '';
const API_KEY = process.env.API_KEY || '';

interface Position {
  position_uuid: string;
  position_name: string;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * GET /api/positions
 * Fetch all positions or a single position by UUID
 */
export async function GET(request: NextRequest) {
  try {
    const accessToken = await requireAuth();

    if (!API_BASE) {
      console.error('[GetPositions] API_BASE is missing');
      return NextResponse.json(
        { message: 'Server configuration error' },
        { status: 500 }
      );
    }

    const position_uuid = request.nextUrl.searchParams.get('position_uuid');
    const url = position_uuid
      ? `${API_BASE}/positions/${position_uuid}`
      : `${API_BASE}/positions`;

    console.log('[GetPositions] Fetching from backend:', url);
    const backendResponse = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        Cookie: `access_token=${accessToken}`,
      },
    });

    const data = await backendResponse.json();
    console.log('[GetPositions] Backend response:', {
      status: backendResponse.status,
      data,
    });

    if (!backendResponse.ok) {
      return NextResponse.json(
        { message: data.message || 'Failed to fetch positions' },
        { status: backendResponse.status }
      );
    }

    const positions: Position[] = Array.isArray(data) ? data : [data];
    return NextResponse.json({ positions }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[GetPositions] Internal error:', message);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/positions
 * Create a new position
 */
export async function POST(request: NextRequest) {
  try {
    const accessToken = await requireAuth();

    const { position_name, description } = await request.json();

    if (!position_name) {
      return NextResponse.json(
        { message: 'Position name is required' },
        { status: 400 }
      );
    }

    const backendResponse = await fetch(`${API_BASE}/positions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        Cookie: `access_token=${accessToken}`,
      },
      body: JSON.stringify({ position_name, description }),
    });

    const data = await backendResponse.json();

    if (!backendResponse.ok || !data.position) {
      return NextResponse.json(
        { message: data.message || 'Failed to create position' },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json(
      {
        message: 'Position created successfully',
        position: data.position as Position,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[CreatePosition] Internal error:', message);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/positions
 * Update an existing position
 */
export async function PUT(request: NextRequest) {
  try {
    const accessToken = await requireAuth();

    const { position_uuid, position_name, description } = await request.json();

    if (!position_uuid || !position_name) {
      return NextResponse.json(
        { message: 'Position ID and name are required' },
        { status: 400 }
      );
    }

    const backendResponse = await fetch(
      `${API_BASE}/positions/${position_uuid}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
          Cookie: `access_token=${accessToken}`,
        },
        body: JSON.stringify({ position_name, description }),
      }
    );

    const data = await backendResponse.json();

    if (!backendResponse.ok || !data.position) {
      return NextResponse.json(
        { message: data.message || 'Failed to update position' },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json(
      {
        message: 'Position updated successfully',
        position: data.position as Position,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[UpdatePosition] Internal error:', message);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/positions
 * Delete a position by UUID
 */
export async function DELETE(request: NextRequest) {
  try {
    const accessToken = await requireAuth();

    const position_uuid = request.nextUrl.searchParams.get('position_uuid');

    if (!position_uuid) {
      return NextResponse.json(
        { message: 'Position ID is required' },
        { status: 400 }
      );
    }

    const backendResponse = await fetch(
      `${API_BASE}/positions/${position_uuid}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
          Cookie: `access_token=${accessToken}`,
        },
      }
    );

    const data = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(
        { message: data.message || 'Failed to delete position' },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json(
      { message: 'Position deleted successfully' },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[DeletePosition] Internal error:', message);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}