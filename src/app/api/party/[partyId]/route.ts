import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

interface Party {
  id: string;
  name: string;
  description: string;
  message: string;
}

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "";
const API_KEY = process.env.API_KEY || "";

export async function GET(request: NextRequest) {
  try {
  
    const partyId = request.nextUrl.pathname.split("/").pop();
    if (!partyId) {
      return NextResponse.json(
        { message: "Party ID is required" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value || "";

    const backendRes = await fetch(`${API_BASE}/parties/${partyId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        ...(accessToken && { Cookie: `access_token=${accessToken}` }),
      },
    });

    const data: Party = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json(
        { message: data.message || "Failed to fetch party" },
        { status: backendRes.status }
      );
    }

    return NextResponse.json({ party: data }, { status: 200 });
  } catch (error) {
    console.error("[GET /api/party] Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
  
    const partyId = request.nextUrl.pathname.split("/").pop();
    if (!partyId) {
      return NextResponse.json(
        { message: "Party ID is required" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value || "";

    const backendRes = await fetch(`${API_BASE}/parties/${partyId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        ...(accessToken && { Cookie: `access_token=${accessToken}` }),
      },
    });

    if (backendRes.status === 200) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    let data = null;
    const text = await backendRes.text();
    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        data = text;
      }
    }

    return NextResponse.json(
      { message: (data as Party)?.message || "Failed to delete party" },
      { status: backendRes.status }
    );
  } catch (error) {
    console.error("[DELETE /api/party] Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}