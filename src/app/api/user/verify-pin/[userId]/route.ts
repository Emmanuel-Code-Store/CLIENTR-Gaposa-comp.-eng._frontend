import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

interface ApiError {
  message?: string;
}

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "";
const API_KEY = process.env.API_KEY || "";

export async function POST(request: NextRequest) {
  try {

    const userId = request.nextUrl.pathname.split("/").pop();
    if (!userId) {
      console.warn("[POST /api/user/verify-pin] Missing userId parameter");
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const { inputPin } = await request.json();
    if (!inputPin) {
      console.warn("[POST /api/user/verify-pin] Missing inputPin in request body");
      return NextResponse.json(
        { error: "PIN is required" },
        { status: 400 }
      );
    }

    if (!API_BASE || !API_KEY) {
      console.error("[POST /api/user/verify-pin] Missing API_BASE or API_KEY");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value || "";

    const backendResponse = await fetch(`${API_BASE}/users/verify_pin/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        ...(accessToken && { Cookie: `access_token=${accessToken}` }),
      },
      body: JSON.stringify({ inputPin }),
    });

    const data = await backendResponse.json();
    console.log("[POST /api/user/verify-pin] Backend response status:", backendResponse.status);
    console.log("[POST /api/user/verify-pin] Backend response data:", data);

    if (!backendResponse.ok) {
      console.error("[POST /api/user/verify-pin] Backend request failed:", data);
      return NextResponse.json(
        { error: (data as ApiError).message || "Failed to verify PIN" },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[POST /api/user/verify-pin] Internal error:", message);
    return NextResponse.json(
      { error: "Error occurred while verifying PIN. Please try again later." },
      { status: 500 }
    );
  }
}