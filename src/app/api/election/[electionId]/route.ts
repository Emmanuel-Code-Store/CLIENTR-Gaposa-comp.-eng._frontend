import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "";
const API_KEY = process.env.API_KEY || "";

interface BackendResponse<T = unknown> {
  message?: string;
  data?: T;
}

interface ContextParams {
  electionId: string;
}

export async function GET(
  _request: NextRequest,
  context: { params: Promise<ContextParams> }
) {
  try {
    const { electionId } = await context.params;

    if (!electionId) {
      return NextResponse.json(
        { message: "Election ID is required" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value || "";

    const backendRes = await fetch(`${API_BASE}/election/${electionId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        ...(accessToken && { Cookie: `access_token=${accessToken}` }),
      },
    });

    const data: BackendResponse = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json(
        { message: data.message || "Failed to fetch election" },
        { status: backendRes.status }
      );
    }

    return NextResponse.json({ election: data }, { status: 200 });
  } catch (error) {
    console.error("[GET /api/election/[electionId]] Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<ContextParams> }
) {
  try {
    const { electionId } = await context.params;

    if (!electionId) {
      return NextResponse.json(
        { message: "Election ID is required" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value || "";

    const backendRes = await fetch(`${API_BASE}/election/${electionId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        ...(accessToken && { Cookie: `access_token=${accessToken}` }),
      },
    });

    let data: BackendResponse = { message: "Failed to delete election" }; 

    const text = await backendRes.text();
    if (text) {
      try {
        data = JSON.parse(text) as BackendResponse;
      } catch {
        data = { message: text }; 
      }
    }

    if (!backendRes.ok) {
      return NextResponse.json(
        { message: data.message || "Failed to delete election" },
        { status: backendRes.status }
      );
    }

    return NextResponse.json(
      {
        message: "Election deleted",
        result: data.data ?? null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[DELETE /api/election/[electionId]] Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}