import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "";
const API_KEY = process.env.API_KEY || "";

export async function GET(request: NextRequest) {
  try {

    const departmentId = request.nextUrl.pathname.split("/").pop();
    if (!departmentId) {
      return NextResponse.json(
        { message: "Department ID is required" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value || "";

    const backendRes = await fetch(`${API_BASE}/department/${departmentId}`, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        ...(accessToken && { Cookie: `access_token=${accessToken}` }),
      },
    });

    const data = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json(
        { message: data.message || "Department not found" },
        { status: backendRes.status }
      );
    }

    return NextResponse.json({ department: data }, { status: 200 });
  } catch (error) {
    console.error("[GET /api/department] Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    
    const departmentId = request.nextUrl.pathname.split("/").pop();
    if (!departmentId) {
      return NextResponse.json(
        { message: "Department ID is required" },
        { status: 400 }
      );
    }

    const body = await request.json();
    if (!body.name) {
      return NextResponse.json(
        { message: "Department name is required" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value || "";

    console.log("PATCH proxy forwarding:", body);

    const backendRes = await fetch(`${API_BASE}/department/${departmentId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        ...(accessToken && { Cookie: `access_token=${accessToken}` }),
      },
      body: JSON.stringify(body),
    });

    const data = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json(
        { message: data.message || "Update failed" },
        { status: backendRes.status }
      );
    }

    return NextResponse.json(
      { message: "Department updated", department: data },
      { status: 200 }
    );
  } catch (error) {
    console.error("[PATCH /api/department] Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    
    const departmentId = request.nextUrl.pathname.split("/").pop();
    if (!departmentId) {
      return NextResponse.json(
        { message: "Department ID is required" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value || "";

    const backendRes = await fetch(`${API_BASE}/department/${departmentId}`, {
      method: "DELETE",
      headers: {
        "x-api-key": API_KEY,
        ...(accessToken && { Cookie: `access_token=${accessToken}` }),
      },
    });

    if (!backendRes.ok) {
      const data = await backendRes.json();
      return NextResponse.json(
        { message: data.message || "Delete failed" },
        { status: backendRes.status }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("[DELETE /api/department] Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}