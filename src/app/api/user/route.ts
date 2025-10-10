import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "";
const API_KEY = process.env.API_KEY || "";

const tokenToRoleIdMap: Record<string, number> = {
  [process.env.NEXT_PUBLIC_STUDENT_ROLE_TOKEN!]: 2,
  [process.env.NEXT_PUBLIC_ALUMNI_ROLE_TOKEN!]: 3,
  [process.env.NEXT_PUBLIC_STAFF_ROLE_TOKEN!]: 4,
  [process.env.NEXT_PUBLIC_PARENT_ROLE_TOKEN!]: 5,
};

// ---------- Types ----------
interface Role {
  role_name: string;
}

interface User {
  userId: number;
  email: string;
  fullname?: string | null;
  role: Role;
  staff_id?: number | null;
  student_id?: number | null;
  parent_id?: number | null;
}

interface Position {
  positionId: number;
}

interface UserWithPositions extends User {
  positionIds: number[];
}

// ---------- Handler ----------
export async function GET(request: NextRequest) {
  try {
    const roleToken = request.nextUrl.searchParams.get("roleId");
    const role_id = roleToken ? tokenToRoleIdMap[roleToken] : null;

    if (!role_id) {
      console.warn("[GetUsers] Missing or invalid role parameter");
      return NextResponse.json(
        { message: "Role parameter is required" },
        { status: 400 }
      );
    }

    const allowedRoles = [2, 3, 4, 5, 6];
    if (!allowedRoles.includes(role_id)) {
      console.warn("[GetUsers] Invalid role_id:", role_id);
      return NextResponse.json({ message: "Invalid role ID" }, { status: 400 });
    }

    if (!API_BASE) {
      console.error("[GetUsers] API_BASE is missing");
      return NextResponse.json(
        { message: "Server configuration error" },
        { status: 500 }
      );
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value || "";

    const backendResponse = await fetch(
      `${API_BASE}/users/roleId/${encodeURIComponent(role_id)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
          ...(accessToken && { Cookie: `access_token=${accessToken}` }),
        },
      }
    );

    const data: User[] = await backendResponse.json();
    console.log("[GetUsers] Backend response status:", backendResponse.status);
    console.log("[GetUsers] Backend response data:", data);

    if (!backendResponse.ok) {
      console.error("[GetUsers] Backend fetch failed:", data);
      return NextResponse.json(
        { message: (data as { message?: string }).message || "Failed to fetch users" },
        { status: backendResponse.status }
      );
    }

    const usersWithPositions: UserWithPositions[] = await Promise.all(
      data.map(async (user: User): Promise<UserWithPositions> => {
        try {
          const positionResponse = await fetch(
            `${API_BASE}/users/${user.userId}/positions`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "x-api-key": API_KEY,
                ...(accessToken && { Cookie: `access_token=${accessToken}` }),
              },
            }
          );

          const positionData: Position[] | { message?: string } =
            await positionResponse.json();
          console.log(
            `[GetUsers] Positions for user ${user.userId}:`,
            positionData
          );

          if (!positionResponse.ok || !Array.isArray(positionData)) {
            console.warn(
              `[GetUsers] Failed to fetch positions for user ${user.userId}:`,
              (positionData as { message?: string }).message
            );
            return { ...user, positionIds: [] };
          }

          const positionIds = positionData
            .map((pos) => pos.positionId)
            .filter((id): id is number => typeof id === "number");

          return { ...user, positionIds };
        } catch (error) {
          console.error(
            `[GetUsers] Error fetching positions for user ${user.userId}:`,
            error
          );
          return { ...user, positionIds: [] };
        }
      })
    );

    return NextResponse.json(
      {
        users: usersWithPositions.map((user) => ({
          userId: user.userId,
          email: user.email,
          fullname: user.fullname || null,
          role: user.role.role_name || "unknown",
          staffId: user.staff_id ?? null,
          studentId: user.student_id ?? null,
          parentId: user.parent_id ?? null,
          positionIds: user.positionIds,
        })),
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[GetUsers] Internal error:", message);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}