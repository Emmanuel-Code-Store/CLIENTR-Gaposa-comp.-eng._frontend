import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ROLE_TOKENS } from "@/constants/roleTokens";

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "";
const API_KEY = process.env.API_KEY || "";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token");

    if (!token?.value) {
      return NextResponse.json(
        { user: null, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const cookieHeader = `access_token=${token.value}`;

    const res = await fetch(`${API_BASE}/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      credentials: "include",
    });

    const data = await res.json();
    console.log(data);

    if (!res.ok) {
      return NextResponse.json(
        { user: null, message: data.message || "Unauthorized" },
        { status: res.status }
      );
    }

    let roleType: string = '';

    switch (data.user.roleId) {
      case 1:
        roleType = ROLE_TOKENS.guest;
        break;
      case 2:
        roleType = ROLE_TOKENS.student;
        break;
      case 3:
        roleType = ROLE_TOKENS.alumni;
        break;
      case 4:
        roleType = ROLE_TOKENS.staff;
        break;
      case 5:
        roleType = ROLE_TOKENS.parent;
        break;
      case 6:
        roleType = ROLE_TOKENS.superadmin;
        break;
      default:
        roleType = 'unknown';
        break;
    }

    return NextResponse.json(
      {
        user: {
          userId: data.user.userId,
          email: data.user.email,
          fullname: data.user.fullname || null,
          // roleId: data.user.roleId,
          role: data.user.role || 'unknown',
          roleType,
          avatar: data.user.avatar || null,
          registered: data.user.registered || false,
          studentId: data.user.studentId || null,
          staffId: data.user.staffId || null,
          parentId: data.user.parentId || null,
          fingerprint_credential_id: data.user.fingerprint_credential_id || null,
          fingerprint_public_key: data.user.fingerprint_public_key || null,
          fingerprint_counter: data.user.fingerprint_counter || null,
          createdAt: data.user.createdAt,
          updatedAt: data.user.updatedAt,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[ME] Internal error:", error);
    return NextResponse.json(
      { user: null, message: "Internal server error" },
      { status: 500 }
    );
  }
}
