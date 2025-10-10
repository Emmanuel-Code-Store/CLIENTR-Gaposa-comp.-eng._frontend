import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "../../../../utils/auth.utils";

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "";
const API_KEY = process.env.API_KEY || "";

const tokenToRoleIdMap: Record<string, number> = {
  [process.env.NEXT_PUBLIC_GUEST_ROLE_TOKEN!]: 1,
  [process.env.NEXT_PUBLIC_STUDENT_ROLE_TOKEN!]: 2,
  [process.env.NEXT_PUBLIC_ALUMNI_ROLE_TOKEN!]: 3,
  [process.env.NEXT_PUBLIC_STAFF_ROLE_TOKEN!]: 4,
  [process.env.NEXT_PUBLIC_PARENT_ROLE_TOKEN!]: 5,
};

// --- Types ---
interface Role {
  role_name: string;
}

interface Position {
  position_name: string;
}

interface UserPosition {
  position: Position;
}

interface Permission {
  name: string;
}

interface UserPermission {
  permission: Permission;
}

interface RawUser {
  userId: string;
  email: string;
  fullname?: string;
  avatar?: string;
  role?: Role;
  userPositions?: UserPosition[];
  userPermissions?: UserPermission[];
  staff_id?: string | null;
  student_id?: string | null;
  parent_id?: string | null;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
}

interface NormalizedUser {
  userId: string;
  email: string;
  fullname?: string;
  avatar: string | null;
  role: string | null;
  positions: string[];
  permissions: string[];
  staffId: string | null;
  studentId: string | null;
  parentId: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ErrorResponse {
  message: string;
}

// --- Route ---
export async function GET(request: NextRequest) {
  try {
    const accessToken = await requireAuth();
    const urlParams = request.nextUrl.searchParams;

    const term = urlParams.get("query");
    const noUserIdType = urlParams.get("noUserIdType");
    const userIdType = urlParams.get("userIdType");
    const roleToken = urlParams.get("role_token");

    const role_id = roleToken ? tokenToRoleIdMap[roleToken] : null;

    if (roleToken && !role_id) {
      return NextResponse.json(
        { message: "Invalid role token" },
        { status: 400 }
      );
    }

    // --- shared fetcher ---
    const fetchUsers = async (backendUrl: string) => {
      const backendResponse = await fetch(backendUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
          Cookie: `access_token=${accessToken}`,
        },
      });

      const data: RawUser[] | ErrorResponse = await backendResponse.json();

      if (!backendResponse.ok) {
        const message =
          (data as ErrorResponse).message || "Failed to search users";
        return NextResponse.json({ message }, { status: backendResponse.status });
      }

      return NextResponse.json(
        { users: normalizeUsers(data as RawUser[]) },
        { status: backendResponse.status }
      );
    };

    // CASE 1: Search by term only
    if (term && !(noUserIdType || userIdType || roleToken)) {
      const backendUrl = `${API_BASE}/users/search?query=${encodeURIComponent(
        term
      )}`;
      return fetchUsers(backendUrl);
    }

    // CASE 2: Search by noUserIdType + role_token
    if (noUserIdType && role_id && !(term || userIdType)) {
      const backendUrl = `${API_BASE}/users/search?noUserIdType=${encodeURIComponent(
        noUserIdType
      )}&role_id=${encodeURIComponent(role_id)}`;
      return fetchUsers(backendUrl);
    }

    // CASE 3: Search by userIdType + role_token
    if (userIdType && role_id && !(term || noUserIdType)) {
      const backendUrl = `${API_BASE}/users/search?userIdType=${encodeURIComponent(
        userIdType
      )}&role_id=${encodeURIComponent(role_id)}`;
      return fetchUsers(backendUrl);
    }

    return NextResponse.json(
      {
        message:
          "Invalid query parameters. Provide either (query) OR (noUserIdType and role_token) OR (userIdType and role_token).",
      },
      { status: 400 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[SearchUsers] Internal error:", message);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// --- Helpers ---
function normalizeUsers(raw: RawUser[]): NormalizedUser[] {
  return raw.map((user) => ({
    userId: user.userId,
    email: user.email,
    fullname: user.fullname,
    avatar: user.avatar || null,
    role: user.role?.role_name || null,
    positions:
      user.userPositions?.map((pos) => pos.position.position_name) || [],
    permissions:
      user.userPermissions?.map((perm) => perm.permission.name) || [],
    staffId: user.staff_id || null,
    studentId: user.student_id || null,
    parentId: user.parent_id || null,
    isActive: user.is_active,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }));
}
