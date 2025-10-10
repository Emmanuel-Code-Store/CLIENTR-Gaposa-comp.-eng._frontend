import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "";
const API_KEY = process.env.API_KEY || "";

interface ForwardResult<T = unknown> {
  ok: boolean;
  status: number;
  data: T;
}

interface ApiError {
  message?: string;
}

async function forwardRequest<T = unknown>(
  path: string,
  method: string,
  body?: Record<string, unknown>
): Promise<ForwardResult<T>> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value || "";

  const res = await fetch(`${API_BASE}/${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
      ...(accessToken && { Cookie: `access_token=${accessToken}` }),
    },
    ...(body && { body: JSON.stringify(body) }),
  });

  const data = (await res.json()) as T;
  return { ok: res.ok, status: res.status, data };
}

export async function GET(request: NextRequest) {
  try {
    
    const staffSubjectClassId = request.nextUrl.pathname.split("/").pop();
    if (!staffSubjectClassId) {
      return NextResponse.json(
        { message: "Staff Subject Class ID is required" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value || "";

    const backendRes = await fetch(
      `${API_BASE}/staff-subject-class/${staffSubjectClassId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
          ...(accessToken && { Cookie: `access_token=${accessToken}` }),
        },
      }
    );

    const data = await backendRes.json();
    console.log("✅ Fetched Staff Subject Class:", data);

    if (!backendRes.ok) {
      return NextResponse.json(
        { message: (data as ApiError).message || "Failed to fetch staff subject class" },
        { status: backendRes.status }
      );
    }

    return NextResponse.json({ staffSubjectClass: data }, { status: 200 });
  } catch (err) {
    console.error("[GET /api/staff_subject_class] Error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    
    const staffSubjectClassId = request.nextUrl.pathname.split("/").pop();
    if (!staffSubjectClassId) {
      return NextResponse.json(
        { message: "Staff Subject Class ID is required" },
        { status: 400 }
      );
    }

    const body: Record<string, unknown> = await request.json();
    const {
      staff_uuid_id,
      class_subject_uuid_id,
      semester_term_uuid_id,
      session_uuid_id,
    } = body;

    if (!staff_uuid_id && !class_subject_uuid_id && !semester_term_uuid_id && !session_uuid_id) {
      return NextResponse.json(
        { message: "At least one updatable field is required" },
        { status: 400 }
      );
    }

    const result = await forwardRequest(
      `staff-subject-class/${staffSubjectClassId}`,
      "PUT",
      body
    );

    if (!result.ok) {
      return NextResponse.json(
        { message: (result.data as ApiError).message || "Failed to update staff subject class" },
        { status: result.status }
      );
    }

    return NextResponse.json(
      { message: "Staff subject class updated successfully", staffSubjectClass: result.data },
      { status: 200 }
    );
  } catch (err) {
    console.error("[PUT /api/staff_subject_class] Error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    
    const staffSubjectClassId = request.nextUrl.pathname.split("/").pop();
    if (!staffSubjectClassId) {
      return NextResponse.json(
        { message: "Staff Subject Class ID is required" },
        { status: 400 }
      );
    }

    const result = await forwardRequest(
      `staff-subject-class/${staffSubjectClassId}`,
      "DELETE"
    );

    if (!result.ok) {
      return NextResponse.json(
        { message: (result.data as ApiError).message || "Failed to delete staff subject class" },
        { status: result.status }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[DELETE /api/staff_subject_class] Error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}