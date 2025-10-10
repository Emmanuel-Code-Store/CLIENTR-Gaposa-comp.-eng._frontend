import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "";
const API_KEY = process.env.API_KEY || "";

export async function POST(request: NextRequest) {
  try {
    const { partyPostId } = await request.json();
    if (!partyPostId) {
      return NextResponse.json({ error: "partyPostId is required" }, { status: 400 });
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value || "";

    const backendResponse = await fetch(`${API_BASE}/vote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        ...(accessToken && { Cookie: `access_token=${accessToken}` }),
      },
      body: JSON.stringify({ partyPostId }),
    });

    const data = await backendResponse.json();
    if (!backendResponse.ok) {
      return NextResponse.json(
        { error: data.message || "Failed to submit vote" },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Error occurred while submitting vote." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const backendResponse = await fetch(`${API_BASE}/vote`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
    });

    const data = await backendResponse.json();
    if (!backendResponse.ok) {
      return NextResponse.json(
        { error: data.message || "Failed to fetch results" },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Error occurred while fetching results." },
      { status: 500 }
    );
  }
}