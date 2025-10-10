import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { User } from "../types/user";

export interface ModulePermission {
  id: number;
  module_path: string;
  allowed_position_ids: number[];
  createdAt: string;
  updatedAt: string;
}

// 🔹 Server-side: get logged in user (basic)
export async function getServerUser() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/me`, {
    headers: {
      "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
    },
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}

// 🔹 Server-side guard (redirect if no auth)
export async function requireAuth(
  redirectTo: string = "/auth/user-login",
  forApi: boolean = false
): Promise<string | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    if (forApi) return null;
    redirect(redirectTo);
  }

  return accessToken ?? null;
}

// 🔹 Fetch permissions
export async function fetchModulePermissions(
  accessToken: string
): Promise<ModulePermission[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/module-access`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `access_token=${accessToken}`,
        },
        credentials: "include",
      }
    );

    if (!response.ok) return [];
    return response.json();
  } catch (error) {
    console.error("[authUtils] Fetch permissions error:", error);
    return [];
  }
}

export function hasSectionAccess(
  userPositionIds: number[],
  allowedPositionIds: number[]
): boolean {
  return userPositionIds.some((id) => allowedPositionIds.includes(id));
}

// 🔹 Fetch full user (merged auth + profile) — server-side
export async function fetchUserData(
  accessToken: string
): Promise<{ user: User; roleName: string } | null> {
  try {
    // Step 1: /auth/me
    const meResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `access_token=${accessToken}`,
      },
      credentials: "include",
    });

    const meData = await meResponse.json();
    if (!meResponse.ok || !meData.user) {
      console.warn("[authUtils] Failed to fetch user from /api/auth/me:", meData.message);
      return null;
    }

    // Step 2: /user/:id
    const userResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${meData.user.userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `access_token=${accessToken}`,
        },
        credentials: "include",
      }
    );

    const userData = await userResponse.json();
    if (!userResponse.ok || !userData.user) {
      console.warn("[authUtils] Failed to fetch user details:", userData.message);
      return null;
    }

    // Step 3: Merge
    const user: User = {
      userId: meData.user.userId,
      email: meData.user.email,
      fullname: meData.user.fullname || null,
      roleId: meData.user.roleId,
      roleName: userData.user.roleName || meData.user.roleName,
      role: userData.user.role || meData.user.role,
      avatar: meData.user.avatar || null,
      phone: meData.user.phone || null,
      address: meData.user.address || null,
      isActive: meData.user.isActive ?? true,
      registered: meData.user.registered,
      studentId: meData.user.studentId || null,
      staffId: meData.user.staffId || null,
      parentId: meData.user.parentId || null,
      createdAt: meData.user.createdAt,
      updatedAt: meData.user.updatedAt,
      candidatePartyPosts: userData.user.candidatePartyPosts || [],
      userPositions: userData.user.userPositions || [],
      userPermissions: userData.user.userPermissions || [],
      createdSettings: userData.user.createdSettings || [],
      permissions: userData.user.permissions || [],
    };

    const roleName =
      typeof user.role === "string" ? user.role : user.role.role_name;

    return { user, roleName };
  } catch (error) {
    console.error("[authUtils] Fetch user error:", error);
    return null;
  }
}
