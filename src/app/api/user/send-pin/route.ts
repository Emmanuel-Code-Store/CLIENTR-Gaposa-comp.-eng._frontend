import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "";
const API_KEY = process.env.API_KEY || "";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json(); 

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value || "";

    const backendResponse = await fetch(`${API_BASE}/users/send-pin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        ...(accessToken && { Cookie: `access_token=${accessToken}` }),
      },
      body: JSON.stringify({ userId }),
    });

    const data = await backendResponse.json();
    console.log("[SendOtp] Backend response status:", backendResponse.status);
    console.log("[SendOtp] Backend response data:", data);

    if (!backendResponse.ok) {
      console.error("[SendOtp] Backend request failed:", data);
      return NextResponse.json(
        { error: data.message || "Failed to send OTP" },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json(
      { message: "OTP sent to user's email" },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[SendOtp] Internal error:", message);
    return NextResponse.json(
      { error: "Failed to send OTP" },
      { status: 500 }
    );
  }
}
