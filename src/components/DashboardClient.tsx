"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import SuperAdminDashboard from "./SuperAdminDashboard";
import { StudentDashboard } from "./StudentDashboard";
import { StaffDashboard } from "./StaffDashboard";
import { ParentDashboard } from "./ParentDashboard";
import GuestDashboard from "./GuestDashboard";
import { useAuth } from "../hooks/useAuth";
import { useRoleChecker } from "../hooks/useRoleChecker";

export default function DashboardClient() {
  const { isAuthenticated, user, loading, error } = useAuth();
  const router = useRouter();
  const {
    isParent,
    isStaff,
    isStudent,
    isSuperAdmin,
  } = useRoleChecker();

  useEffect(() => {
    if (!loading && (!isAuthenticated || error || !user)) {
      console.warn("DashboardClient: Redirecting to /auth/user-login due to:", error?.message || "Not authenticated");
      router.push("/auth/user-login");
    }
  }, []);

  if (loading) return <Loading />;
  if (!isAuthenticated || !user) return null;

  const roleName =
    typeof user.role === "string" ? user.role : user.role?.role_name || "Guest";

  if (isSuperAdmin) {
    return <SuperAdminDashboard user={user} roleName={roleName} />;
  } else if (isStudent) {
    return <StudentDashboard user={user} roleName={roleName} />;
  } else if (isStaff) {
    return <StaffDashboard user={user} roleName={roleName} />;
  } else if (isParent) {
    return <ParentDashboard user={user} roleName={roleName} />;
  } else {
    return <GuestDashboard user={user} roleName={roleName} />;
  }
}
