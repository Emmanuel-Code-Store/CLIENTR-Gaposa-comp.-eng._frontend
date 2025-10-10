import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "";
const API_KEY = process.env.API_KEY || "";

interface BackendRole {
  role_name: string;
}

interface BackendUser {
  userId: string;
  email: string;
  fullname?: string | null;
  role: BackendRole;
  staff_id?: string | null;
  student_id?: string | null;
  parent_id?: string | null;
}

interface BackendError {
  message?: string;
  [key: string]: unknown;
}

export async function GET() {
  try {
    if (!API_BASE) {
      console.error("[GetAllUsers] API_BASE is missing");
      return NextResponse.json(
        { message: "Server configuration error" },
        { status: 500 }
      );
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value || "";

    const backendResponse = await fetch(`${API_BASE}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        ...(accessToken && { Cookie: `access_token=${accessToken}` }),
      },
    });

    const data: BackendUser[] | BackendError = await backendResponse.json();
    console.log(
      "[GetAllUsers] Backend response status:",
      backendResponse.status
    );
    console.log("[GetAllUsers] Backend response data:", data);

    if (!backendResponse.ok) {
      const errorData = data as BackendError;
      console.error("[GetAllUsers] Backend fetch failed:", errorData);
      return NextResponse.json(
        { message: errorData.message || "Failed to fetch all users" },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json(
      {
        users: (data as BackendUser[]).map((user) => ({
          userId: user.userId,
          email: user.email,
          fullname: user.fullname || null,
          role: user.role?.role_name || "unknown",
          staffId: user.staff_id || null,
          studentId: user.student_id || null,
          parentId: user.parent_id || null,
        })),
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[GetAllUsers] Internal error:", message);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}