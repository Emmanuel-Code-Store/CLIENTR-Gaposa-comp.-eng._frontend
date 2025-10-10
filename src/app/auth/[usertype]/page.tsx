import Login from "@/components/Login";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_SCHOOL_NAME} | Login`,
  description: "Login to access your account",
};

export default async function LoginPage({ params }: { params: Promise<{ usertype: string }> }) {
  const { usertype } = await params;
  console.log("LoginPage: Rendering for usertype:", usertype);

  const userTypeComponents: Record<string, React.ReactNode> = {
    "superadmin-login": <Login userType={usertype} />,
    "admin-login": <Login userType={usertype} />,
    "staff-login": <Login userType={usertype} />,
    "student-login": <Login userType={usertype} />,
    "user-login": <Login userType={usertype} />,
  };

  if (!(usertype in userTypeComponents)) {
    console.error("LoginPage: Invalid usertype:", usertype);
    return notFound();
  }

  return userTypeComponents[usertype];
}