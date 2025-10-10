import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

interface User {
  id: string;
}

interface ApiError {
  message?: string;
}

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "";
const API_KEY = process.env.API_KEY || "";

export async function GET(request: NextRequest) {
  try {
  
    const userId = request.nextUrl.pathname.split("/").pop();
    if (!userId) {
      console.warn("[GET /api/user] Missing userId parameter");
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    if (!API_BASE || !API_KEY) {
      console.error("[GET /api/user] Missing API_BASE or API_KEY");
      return NextResponse.json(
        { message: "Server configuration error" },
        { status: 500 }
      );
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value || "";

    const backendResponse = await fetch(`${API_BASE}/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        ...(accessToken && { Cookie: `access_token=${accessToken}` }),
      },
      credentials: "include",
    });

    const data: User | ApiError = await backendResponse.json();
    console.log("[GET /api/user] Backend response status:", backendResponse.status);

    if (!backendResponse.ok) {
      console.error("[GET /api/user] Backend fetch failed:", data);
      return NextResponse.json(
        { message: (data as ApiError).message || "Failed to fetch user details" },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json({ user: data as User }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[GET /api/user] Internal error:", message);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {

    const userId = request.nextUrl.pathname.split("/").pop();
    if (!userId) {
      console.warn("[PUT /api/user] Missing userId parameter");
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    if (!API_BASE || !API_KEY) {
      console.error("[PUT /api/user] Missing API_BASE or API_KEY");
      return NextResponse.json(
        { message: "Server configuration error" },
        { status: 500 }
      );
    }

    const body = await request.json();
    if (!Object.keys(body).length) {
      console.warn("[PUT /api/user] Empty request body");
      return NextResponse.json(
        { message: "Request body is required" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value || "";

    const backendResponse = await fetch(`${API_BASE}/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        ...(accessToken && { Cookie: `access_token=${accessToken}` }),
      },
      body: JSON.stringify(body),
      credentials: "include",
    });

    const data: User | ApiError = await backendResponse.json();
    console.log("[PUT /api/user] Backend response status:", backendResponse.status);

    if (!backendResponse.ok) {
      console.error("[PUT /api/user] Update failed:", data);
      return NextResponse.json(
        { message: (data as ApiError).message || "Failed to update user" },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json(
      { message: "User updated", user: data as User },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[PUT /api/user] Internal error:", message);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
  
    const userId = request.nextUrl.pathname.split("/").pop();
    if (!userId) {
      console.warn("[DELETE /api/user] Missing userId parameter");
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    if (!API_BASE || !API_KEY) {
      console.error("[DELETE /api/user] Missing API_BASE or API_KEY");
      return NextResponse.json(
        { message: "Server configuration error" },
        { status: 500 }
      );
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value || "";

    const backendResponse = await fetch(`${API_BASE}/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        ...(accessToken && { Cookie: `access_token=${accessToken}` }),
      },
      credentials: "include",
    });

    let data: ApiError | null = null;
    const text = await backendResponse.text();
    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        data = { message: text };
      }
    }

    console.log("[DELETE /api/user] Backend response status:", backendResponse.status);

    if (!backendResponse.ok) {
      console.error("[DELETE /api/user] Delete failed:", data);
      return NextResponse.json(
        { message: data?.message || "Failed to delete user" },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[DELETE /api/user] Internal error:", message);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}