import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

interface Subject {
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
    
    const subjectId = request.nextUrl.pathname.split("/").pop();
    if (!subjectId) {
      return NextResponse.json(
        { message: "Subject ID is required" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value || "";

    const backendRes = await fetch(`${API_BASE}/subjects/${subjectId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        ...(accessToken && { Cookie: `access_token=${accessToken}` }),
      },
    });

    const data: Subject | ApiError = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json(
        { message: (data as ApiError).message || "Failed to fetch subject" },
        { status: backendRes.status }
      );
    }

    return NextResponse.json({ subject: data as Subject }, { status: 200 });
  } catch (error) {
    console.error("[GET /api/subject] Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
  
    const subjectId = request.nextUrl.pathname.split("/").pop();
    if (!subjectId) {
      return NextResponse.json(
        { message: "Subject ID is required" },
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

    const backendRes = await fetch(`${API_BASE}/subjects/${subjectId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        ...(accessToken && { Cookie: `access_token=${accessToken}` }),
      },
      body: JSON.stringify(body),
    });

    const data: Subject | ApiError = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json(
        { message: (data as ApiError).message || "Failed to update subject" },
        { status: backendRes.status }
      );
    }

    return NextResponse.json(
      { message: "Subject updated", subject: data as Subject },
      { status: 200 }
    );
  } catch (error) {
    console.error("[PATCH /api/subject] Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    
    const subjectId = request.nextUrl.pathname.split("/").pop();
    if (!subjectId) {
      return NextResponse.json(
        { message: "Subject ID is required" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value || "";

    const backendRes = await fetch(`${API_BASE}/subjects/${subjectId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        ...(accessToken && { Cookie: `access_token=${accessToken}` }),
      },
    });

    let data: Subject | ApiError | null = null;
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
      { message: (data as ApiError)?.message || "Failed to delete subject" },
      { status: backendRes.status }
    );
  } catch (error) {
    console.error("[DELETE /api/subject] Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}