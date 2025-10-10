// "use client";

// import { useParams, useRouter } from "next/navigation";
// import Loading from "@/components/Loading";
// import UserProfile from "@/components/UserProfile";
// import { useUser } from "@/hooks/useUser";

// export default function ProfileUuidPage() {
//   const router = useRouter();
//   const { uuid } = useParams() as { uuid: string };

//   const { user, loading, error } = useUser(uuid);

//   if (loading) return <Loading />;

//   if (error || !user) {
//     router.push("/auth/user-login");
//     return null;
//   }

//   console.log(user)
//   console.log(uuid)
//   return <UserProfile user={user} />;
// }










"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "@/components/Loading";
import UserProfile from "@/components/UserProfile";
import { useUser } from "@/hooks/useUser";
import { User } from "@/types/user";

export default function ProfileUuidPage() {
  const router = useRouter();
  const { uuid } = useParams() as { uuid: string };
  const { user, loading, error } = useUser(uuid);

  useEffect(() => {
    if (error || !user) {
      router.push("/auth/user-login");
    }
  }, [error, user, router]);

  if (loading) return <Loading />;
  if (!user) return null;

  // Map hook user to component user
  const profileUser: User = {
    ...user,
    permissions: user.userPermissions?.map((p) => p.module_path) ?? [],
  };

  return <UserProfile user={profileUser} />;
}