import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "";
const API_KEY = process.env.API_KEY || "";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value || "";

    const backendRes = await fetch(`${API_BASE}/class-arm`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        ...(accessToken && { Cookie: `access_token=${accessToken}` }),
      },
    });

    const data = await backendRes.json();
    console.log("Backend Class Arms Response:", data);

    if (!backendRes.ok) {
      return NextResponse.json(
        { message: data.message || "Failed to fetch class arms" },
        { status: backendRes.status }
      );
    }
    console.log(data);
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("[GET /api/class-arm] Error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { class_uuid_id, arms_uuid_id, class_arm_description } = body;

    if (!class_uuid_id || !arms_uuid_id || !class_arm_description) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value || "";

    const backendRes = await fetch(`${API_BASE}/class-arm`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        ...(accessToken && { Cookie: `access_token=${accessToken}` }),
      },
      body: JSON.stringify({
        class_uuid_id,
        arms_uuid_id,
        class_arm_description,
      }),
    });

    const data = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json(
        { message: data.message || "Failed to create class-arm" },
        { status: backendRes.status }
      );
    }

    return NextResponse.json(
      { message: "Class-arm created successfully", classArm: data },
      { status: 201 }
    );
  } catch (err) {
    console.error("[POST /api/class-arm] Error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
