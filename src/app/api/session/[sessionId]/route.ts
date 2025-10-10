import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

interface Session {
  id: string;
  name: string;
  description?: string;
}

interface ApiError {
  message?: string;
}

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "";
const API_KEY = process.env.API_KEY || "";

export async function GET(request: NextRequest) {
  try {
    
    const sessionId = request.nextUrl.pathname.split("/").pop();
    if (!sessionId) {
      return NextResponse.json(
        { message: "Session ID is required" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value || "";

    const backendRes = await fetch(`${API_BASE}/sessions/${sessionId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        ...(accessToken && { Cookie: `access_token=${accessToken}` }),
      },
    });

    const data: Session | ApiError = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json(
        { message: (data as ApiError).message || "Failed to fetch session" },
        { status: backendRes.status }
      );
    }

    return NextResponse.json({ session: data as Session }, { status: 200 });
  } catch (error) {
    console.error("[GET /api/session] Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
  
    const sessionId = request.nextUrl.pathname.split("/").pop();
    if (!sessionId) {
      return NextResponse.json(
        { message: "Session ID is required" },
        { status: 400 }
      );
    }

    const body = await request.json();
    if (!Object.keys(body).length) {
      return NextResponse.json(
        { message: "Request body is required" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value || "";

    const backendRes = await fetch(`${API_BASE}/sessions/${sessionId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        ...(accessToken && { Cookie: `access_token=${accessToken}` }),
      },
      body: JSON.stringify(body),
    });

    const data: Session | ApiError = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json(
        { message: (data as ApiError).message || "Failed to update session" },
        { status: backendRes.status }
      );
    }

    return NextResponse.json(
      { message: "Session updated", session: data as Session },
      { status: 200 }
    );
  } catch (error) {
    console.error("[PATCH /api/session] Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    
    const sessionId = request.nextUrl.pathname.split("/").pop();
    if (!sessionId) {
      return NextResponse.json(
        { message: "Session ID is required" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value || "";

    const backendRes = await fetch(`${API_BASE}/sessions/${sessionId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        ...(accessToken && { Cookie: `access_token=${accessToken}` }),
      },
    });

    let data: Session | ApiError | null = null;
    const text = await backendRes.text();
    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        data = { message: text };
      }
    }

    if (backendRes.ok) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    return NextResponse.json(
      { message: (data as ApiError)?.message || "Failed to delete session" },
      { status: backendRes.status }
    );
  } catch (error) {
    console.error("[DELETE /api/session] Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}