import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

interface Vote {
  id: string;
  userId: string;
  partyId: string;
}

interface ApiError {
  message?: string;
}

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "";
const API_KEY = process.env.API_KEY || "";

export async function GET(request: NextRequest) {
  try {

    const uuid = request.nextUrl.pathname.split("/").pop();
    if (!uuid) {
      console.warn("[GET /api/vote] Missing uuid parameter");
      return NextResponse.json(
        { message: "Vote UUID is required" },
        { status: 400 }
      );
    }

    if (!API_BASE || !API_KEY) {
      console.error("[GET /api/vote] Missing API_BASE or API_KEY");
      return NextResponse.json(
        { message: "Server configuration error" },
        { status: 500 }
      );
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value || "";

    const backendRes = await fetch(`${API_BASE}/votes/${uuid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        ...(accessToken && { Cookie: `access_token=${accessToken}` }),
      },
    });

    const data: Vote | ApiError = await backendRes.json();
    console.log("[GET /api/vote] Backend response status:", backendRes.status);

    if (!backendRes.ok) {
      console.error("[GET /api/vote] Backend fetch failed:", data);
      return NextResponse.json(
        { message: (data as ApiError).message || "Failed to fetch vote" },
        { status: backendRes.status }
      );
    }

    return NextResponse.json({ vote: data as Vote }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[GET /api/vote] Internal error:", message);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    
    const uuid = request.nextUrl.pathname.split("/").pop();
    if (!uuid) {
      console.warn("[PATCH /api/vote] Missing uuid parameter");
      return NextResponse.json(
        { message: "Vote UUID is required" },
        { status: 400 }
      );
    }

    if (!API_BASE || !API_KEY) {
      console.error("[PATCH /api/vote] Missing API_BASE or API_KEY");
      return NextResponse.json(
        { message: "Server configuration error" },
        { status: 500 }
      );
    }

    const body = await request.json();
    if (!Object.keys(body).length) {
      console.warn("[PATCH /api/vote] Empty request body");
      return NextResponse.json(
        { message: "Request body is required" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value || "";

    const backendRes = await fetch(`${API_BASE}/votes/${uuid}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        ...(accessToken && { Cookie: `access_token=${accessToken}` }),
      },
      body: JSON.stringify(body),
    });

    const data: Vote | ApiError = await backendRes.json();
    console.log("[PATCH /api/vote] Backend response status:", backendRes.status);

    if (!backendRes.ok) {
      console.error("[PATCH /api/vote] Update failed:", data);
      return NextResponse.json(
        { message: (data as ApiError).message || "Failed to update vote" },
        { status: backendRes.status }
      );
    }

    return NextResponse.json(
      { message: "Vote updated", vote: data as Vote },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[PATCH /api/vote] Internal error:", message);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    
    const uuid = request.nextUrl.pathname.split("/").pop();
    if (!uuid) {
      console.warn("[DELETE /api/vote] Missing uuid parameter");
      return NextResponse.json(
        { message: "Vote UUID is required" },
        { status: 400 }
      );
    }

    if (!API_BASE || !API_KEY) {
      console.error("[DELETE /api/vote] Missing API_BASE or API_KEY");
      return NextResponse.json(
        { message: "Server configuration error" },
        { status: 500 }
      );
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value || "";

    const backendRes = await fetch(`${API_BASE}/votes/${uuid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        ...(accessToken && { Cookie: `access_token=${accessToken}` }),
      },
    });

    let data: ApiError | null = null;
    const text = await backendRes.text();
    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        data = { message: text }; 
      }
    }

    console.log("[DELETE /api/vote] Backend response status:", backendRes.status);

    if (!backendRes.ok) {
      console.error("[DELETE /api/vote] Delete failed:", data);
      return NextResponse.json(
        { message: data?.message || "Failed to delete vote" },
        { status: backendRes.status }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[DELETE /api/vote] Internal error:", message);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}