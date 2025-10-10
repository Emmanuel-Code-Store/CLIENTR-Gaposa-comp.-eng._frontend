import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "";
const API_KEY = process.env.API_KEY || "";

interface AssignPayload {
  type: string;
  userIds: string[] | string | number[] | number;
}

export async function POST(request: NextRequest) {
  try {
    const payload: AssignPayload = await request.json();
    let { type } = payload;
    const { userIds } = payload;

    switch (type) {
      case process.env.NEXT_PUBLIC_STAFF_ASSIGN_TOKEN:
        type = "staff";
        break;
      case process.env.NEXT_PUBLIC_STUDENT_ASSIGN_TOKEN:
        type = "student";
        break;
      case process.env.NEXT_PUBLIC_PARENT_ASSIGN_TOKEN:
        type = "parent";
        break;
      default:
        return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    if (!type || !userIds) {
      return NextResponse.json(
        { message: "Missing type or users" },
        { status: 400 }
      );
    }

    const users: string[] = (Array.isArray(userIds) ? userIds : [userIds])
      .map((id) => (typeof id === "string" ? id.trim() : String(id)))
      .filter((id): id is string => id.length > 0);

    if (users.length === 0) {
      return NextResponse.json(
        { message: "users must be a non-empty array of strings" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value || "";

    const backendResponse = await fetch(`${API_BASE}/users/assign-user-id`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        ...(accessToken && { Cookie: `access_token=${accessToken}` }),
      },
      body: JSON.stringify({ type, users }),
      credentials: "include",
    });

    const data = await backendResponse.json();

    if (!backendResponse.ok) {
      console.error("[proxy] assign-ids failed:", data);
      return NextResponse.json(
        {
          message:
            (data as { message?: string }).message || "Failed to assign IDs",
          error: data,
        },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err: unknown) {
    console.error("[proxy] assign-ids error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ message }, { status: 500 });
  }
}
