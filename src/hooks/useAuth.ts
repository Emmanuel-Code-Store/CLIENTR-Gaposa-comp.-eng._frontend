"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { setAuth, logout, auth$ } from "../lib/stores/auth.store";
import { AuthState } from "../types/auth";
import { User } from "../types/user";

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const fetchUser = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/auth/me`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      console.log("me:", data);

      if (!res.ok || !data.user) {
        throw new Error(data.message || "Unauthorized");
      }

      const combined_res = await fetch(
        `/api/user/${data.user.userId}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      const combined_data = await combined_res.json();
      console.log("combined_data:", combined_data);

      if (!combined_res.ok || !combined_data.user) {
        throw new Error(
          combined_data.message || "Failed to fetch user details"
        );
      }
      const user: User & { userRoleType: string } = {
        userId: data.user.userId,
        email: data.user.email,
        fullname: data.user.fullname || null,
        roleId: data.user.roleId,
        roleName: combined_data.user.roleName || data.user.roleName,
        role: combined_data.user.role || data.user.role,
        avatar: data.user.avatar || null,
        phone: data.user.phone || null,
        address: data.user.address || null,
        isActive: data.user.isActive ?? true,
        registered: data.user.registered,
        studentId: data.user.studentId || null,
        staffId: data.user.staffId || null,
        parentId: data.user.parentId || null,
        createdAt: data.user.createdAt,
        updatedAt: data.user.updatedAt,

        candidatePartyPosts: combined_data.user.candidatePartyPosts || [],
        userPositions: combined_data.user.userPositions || [],
        userPermissions: combined_data.user.userPermissions || [],
        createdSettings: combined_data.user.createdSettings || [],

        permissions: combined_data.user.permissions || [],

        userRoleType: data.user.roleType,
      };

      setAuth({ isAuthenticated: true, user });
    } catch (err: unknown) {
      console.error(
        "useAuth: Fetch user error:",
        err instanceof Error ? err.message : err
      );
      setError(err instanceof Error ? err : new Error("Unknown error"));
      logout();
      router.push("/auth/user-login");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    const subscription = auth$.subscribe((state) => setAuthState(state));

    const skipPaths = [
      "/login",
      "/user-login",
      "/auth/user-login",
      "/auth/superadmin-login",
      "/auth/admin-login",
      "/auth/staff-login",
      "/auth/student-login",
    ];

    if (!skipPaths.includes(pathname)) {
      fetchUser();
    } else {
      setLoading(false);
    }

    return () => subscription.unsubscribe();
  }, [pathname, fetchUser]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      console.log("login response:", data);
      await fetchUser();
      router.push("/dashboard");
    } catch (err: unknown) {
      console.error("Login error:", err);
      setError(err instanceof Error ? err : new Error("Login failed"));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    try {
      await fetch(`/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      logout();
      router.push("/auth/user-login");
    }
  };

  return {
    isAuthenticated: authState.isAuthenticated,
    user: authState.user,
    loading,
    error,
    login,
    logout: logoutUser,
    refetchUser: fetchUser,
  };
}
