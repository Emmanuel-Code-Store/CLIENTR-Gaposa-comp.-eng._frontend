"use client";

import UserProfile from "@/components/UserProfile";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/user-login");
    }
  }, [user, loading, router]);

  if (loading || !user) return <Loading />;

  return <UserProfile user={user} />;
}