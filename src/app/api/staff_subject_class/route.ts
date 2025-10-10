import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || '';
const API_KEY = process.env.API_KEY || '';

interface ForwardResult<T = unknown> {
  ok: boolean;
  status: number;
  data: T;
}

async function forwardRequest<T = unknown>(
  path: string,
  method: string,
  body?: Record<string, unknown>
): Promise<ForwardResult<T>> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value || '';

  const res = await fetch(`${API_BASE}/${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      ...(accessToken && { Cookie: `access_token=${accessToken}` }),
    },
    ...(body && { body: JSON.stringify(body) }),
  });

  const data = (await res.json()) as T;
  return { ok: res.ok, status: res.status, data };
}

export async function GET() {
  try {
    const result = await forwardRequest('staff-subject-class', 'GET');
    console.log('Backend StaffSubjectClass GET response:', result.data);

    if (!result.ok) {
      return NextResponse.json(
        { message: (result.data as { message?: string }).message || 'Failed to fetch staff-subject classes' },
        { status: result.status }
      );
    }

    return NextResponse.json(result.data, { status: 200 });
  } catch (err) {
    console.error('[GET /api/staff_subject_class] Error:', err);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: Record<string, unknown> = await request.json();
    const {
      staff_uuid_id,
      class_subject_uuid_id,
      semester_term_uuid_id,
      session_uuid_id,
      staff_class_subject_description,
    } = body;

    if (!staff_uuid_id || !class_subject_uuid_id || !semester_term_uuid_id || !session_uuid_id) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const result = await forwardRequest('staff-subject-class', 'POST', {
      staff_uuid_id,
      class_subject_uuid_id,
      semester_term_uuid_id,
      session_uuid_id,
      staff_class_subject_description,
    });

    if (!result.ok) {
      return NextResponse.json(
        { message: (result.data as { message?: string }).message || 'Failed to create staff subject class' },
        { status: result.status }
      );
    }

    return NextResponse.json(
      { message: 'Staff subject class created successfully', staffSubjectClass: result.data },
      { status: 201 }
    );
  } catch (err) {
    console.error('[POST /api/staff_subject_class] Error:', err);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ message: 'Missing id param' }, { status: 400 });
    }

    const body: Record<string, unknown> = await request.json();
    const {
      staff_uuid_id,
      class_subject_uuid_id,
      semester_term_uuid_id,
      session_uuid_id,
    } = body;

    if (!staff_uuid_id && !class_subject_uuid_id && !semester_term_uuid_id && !session_uuid_id) {
      return NextResponse.json({ message: 'No updatable fields provided' }, { status: 400 });
    }

    const result = await forwardRequest(`staff-subject-class/${id}`, 'PUT', body);

    if (!result.ok) {
      return NextResponse.json(
        { message: (result.data as { message?: string }).message || 'Failed to update staff subject class' },
        { status: result.status }
      );
    }

    return NextResponse.json(
      { message: 'Staff subject class updated successfully', staffSubjectClass: result.data },
      { status: 200 }
    );
  } catch (err) {
    console.error('[PUT /api/staff_subject_class] Error:', err);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ message: 'Missing id param' }, { status: 400 });
    }

    const result = await forwardRequest(`staff-subject-class/${id}`, 'DELETE');

    if (!result.ok) {
      return NextResponse.json(
        { message: (result.data as { message?: string }).message || 'Failed to delete staff subject class' },
        { status: result.status }
      );
    }

    return NextResponse.json(
      { message: 'Staff subject class deleted successfully' },
      { status: 200 }
    );
  } catch (err) {
    console.error('[DELETE /api/staff_subject_class] Error:', err);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
