import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Metadata } from "next";
import DashboardClient from "../components/DashboardClient";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Welcome to your dashboard",
};

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    console.warn("[Dashboard] No access token found, redirecting to /auth/user-login");
    redirect("/auth/user-login");
  }

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <DashboardClient />
    </div>
  );
}