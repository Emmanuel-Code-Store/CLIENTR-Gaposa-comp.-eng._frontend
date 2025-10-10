import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "";
const API_KEY = process.env.API_KEY || "";

export async function GET(request: NextRequest) {
  try {

    const classArmId = request.nextUrl.pathname.split("/").pop();
    if (!classArmId) {
      return NextResponse.json(
        { message: "Class Arm ID is required" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value || "";

    const backendRes = await fetch(`${API_BASE}/class-arm/${classArmId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        ...(accessToken && { Cookie: `access_token=${accessToken}` }),
      },
    });

    const data = await backendRes.json();
    console.log("Backend Class Arm Response:", data);

    if (!backendRes.ok) {
      return NextResponse.json(
        { message: data.message || "Failed to fetch class arm" },
        { status: backendRes.status }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("[GET /api/class_arm] Error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
  
    const classArmId = request.nextUrl.pathname.split("/").pop();
    if (!classArmId) {
      return NextResponse.json(
        { message: "Class Arm ID is required" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { class_arm_description } = body;

    if (!class_arm_description) {
      return NextResponse.json(
        { message: "Class arm description is required" },
        { status: 400 }
      );
    }

    console.log(class_arm_description);

    
    const backendRes = await fetch(`${API_BASE}/class-arm/${classArmId}/description`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      body: JSON.stringify({ class_arm_description }),
    });

    const data = await backendRes.json();

    console.log(data);

    if (!backendRes.ok) {
      return NextResponse.json(
        { message: data.message || "Failed to update class arm description" },
        { status: backendRes.status }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("[PUT /api/class_arm] Error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    
    const classArmId = request.nextUrl.pathname.split("/").pop();
    if (!classArmId) {
      return NextResponse.json(
        { message: "Class Arm ID is required" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value || "";

    const backendRes = await fetch(`${API_BASE}/class-arm/${classArmId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        ...(accessToken && { Cookie: `access_token=${accessToken}` }),
      },
    });

    const data = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json(
        { message: data.message || "Failed to delete class arm" },
        { status: backendRes.status }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[DELETE /api/class_arm] Error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}