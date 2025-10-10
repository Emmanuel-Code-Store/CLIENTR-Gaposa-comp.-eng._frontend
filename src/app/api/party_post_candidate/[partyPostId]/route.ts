import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "";
const API_KEY = process.env.API_KEY || "";

interface ApiError {
  message?: string;
}

type ApiResponse = Record<string, unknown> | string | null;

/**
 * Fetch a single party post by ID
 */
export async function GET(request: NextRequest) {
  try {

    const partyPostId = request.nextUrl.pathname.split("/").pop();
    if (!partyPostId) {
      return NextResponse.json(
        { message: "Party Post ID is required" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value || "";

    const backendRes = await fetch(`${API_BASE}/party_post/${partyPostId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        ...(accessToken && { Cookie: `access_token=${accessToken}` }),
      },
    });

    const data: ApiResponse = await backendRes.json();

    if (!backendRes.ok) {
      const errorData = data as ApiError;
      return NextResponse.json(
        { message: errorData?.message || "Failed to fetch party post details" },
        { status: backendRes.status }
      );
    }

    return NextResponse.json({ partyPost: data }, { status: 200 });
  } catch (error) {
    console.error("[GET /api/party_post_candidate] Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * Delete a party post by ID
 */
export async function DELETE(request: NextRequest) {
  try {
    
    const partyPostId = request.nextUrl.pathname.split("/").pop();
    if (!partyPostId) {
      return NextResponse.json(
        { message: "Party Post ID is required" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value || "";

    const backendRes = await fetch(`${API_BASE}/party_post/${partyPostId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        ...(accessToken && { Cookie: `access_token=${accessToken}` }),
      },
    });

    let data: ApiResponse = null;
    const text = await backendRes.text();
    if (text) {
      try {
        data = JSON.parse(text) as Record<string, unknown>;
      } catch {
        data = text;
      }
    }

    if (backendRes.ok) {
      return NextResponse.json(
        { success: true, result: data },
        { status: 200 }
      );
    }

    const errorData = data as ApiError;
    return NextResponse.json(
      { message: errorData?.message || "Failed to delete party post" },
      { status: backendRes.status }
    );
  } catch (error) {
    console.error("[DELETE /api/party_post_candidate] Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}