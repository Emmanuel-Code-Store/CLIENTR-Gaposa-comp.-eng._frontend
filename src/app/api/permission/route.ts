import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "";
const API_KEY = process.env.API_KEY || "";

export async function GET() {
  try {
    if (!API_BASE || !API_KEY) {
      console.error("[GET] Missing API_BASE or API_KEY");
      return NextResponse.json(
        { message: "Server configuration error" },
        { status: 500 }
      );
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value || "";

    const backendResponse = await fetch(`${API_BASE}/permissions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        ...(accessToken && { Cookie: `access_token=${accessToken}` }),
      },
      credentials: "include",
    });

    const data = await backendResponse.json();
    if (!backendResponse.ok) {
      console.error("[GET] Backend fetch failed:", data);
      return NextResponse.json(
        { message: data.message || "Failed to fetch permissions" },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json({ permissions: data }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[GET] Internal error:", message);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
