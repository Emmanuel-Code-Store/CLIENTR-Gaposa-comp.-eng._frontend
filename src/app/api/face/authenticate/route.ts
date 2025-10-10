import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "";
const API_KEY = process.env.API_KEY || "";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const faceImage = formData.get("faceImage") as File;

    if (!faceImage || !(faceImage instanceof File)) {
      return NextResponse.json(
        { message: "faceImage is required and must be a file" },
        { status: 400 }
      );
    }

    console.log("✅ Received faceImage in route.ts:", faceImage.name, faceImage.size);

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value || "";

    const form = new FormData();
    form.append("faceImage", faceImage);

    const backendRes = await fetch(`${API_BASE}/face/authenticate`, {
      method: "POST",
      headers: {
        "x-api-key": API_KEY,
        ...(accessToken && { cookie: `access_token=${accessToken}` }),
      },
      body: form,
    });

    const data = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json(
        { message: data.message || "Failed to authenticate face" },
        { status: backendRes.status }
      );
    }

    return NextResponse.json(
      { message: "Face authentication successful", data },
      { status: 200 }
    );
  } catch (error) {
    console.error("[POST /api/face/authenticate] Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
