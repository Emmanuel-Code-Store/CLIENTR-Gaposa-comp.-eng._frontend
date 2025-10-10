import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "";
const API_KEY = process.env.API_KEY || "";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const userId = formData.get("userId")?.toString();
    const faceImage = formData.get("faceImage") as File;

    if (!userId || !faceImage) {
      return NextResponse.json(
        { message: "User ID and image are required" },
        { status: 400 }
      );
    }

    const form = new FormData();
    form.append("userId", userId);
    form.append("faceImage", faceImage);

    const backendRes = await fetch(`${API_BASE}/face/register`, {
      method: "POST",
      headers: {
        "x-api-key": API_KEY,
      },
      body: form,
      credentials: "include", // ✅ allows cookies cross-domain
    });

    const data = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json(
        { message: data.message || "Failed to register face" },
        { status: backendRes.status }
      );
    }

    return NextResponse.json(
      { message: "Face registration successful", data },
      { status: 201 }
    );
  } catch (error) {
    console.error("[POST /api/face/register] Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
