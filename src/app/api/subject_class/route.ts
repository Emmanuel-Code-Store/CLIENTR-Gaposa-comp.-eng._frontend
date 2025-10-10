import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "";
const API_KEY = process.env.API_KEY || "";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const subject_uuid = searchParams.get("subject_uuid");
  const classarm_uuid = searchParams.get("classarm_uuid");
  
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value || "";

    if (subject_uuid && classarm_uuid) {
      const uuidRes = await fetch(
        `${API_BASE}/class-subject/cs-uuid?subject_uuid=${subject_uuid}&classarm_uuid=${classarm_uuid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
            ...(accessToken && { Cookie: `access_token=${accessToken}` }),
          },
        }
      );

      const data = await uuidRes.json();
      console.log("result dta:", data);
      if (!uuidRes.ok) {
        return NextResponse.json(
          { message: data.message || "Failed to fetch class subject UUID" },
          { status: uuidRes.status }
        );
      }

      return NextResponse.json(
        typeof data === "string" ? { class_subject_uuid: data } : data,
        { status: 200 }
      );
    }

    const backendRes = await fetch(`${API_BASE}/class-subject`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        ...(accessToken && { Cookie: `access_token=${accessToken}` }),
      },
    });

    const data = await backendRes.json();
    console.log("Backend Class Subjects Response:", data);

    if (!backendRes.ok) {
      return NextResponse.json(
        { message: data.message || "Failed to fetch class subjects" },
        { status: backendRes.status }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("[GET /api/subject_class] Error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      session_uuid,
      semester_term_uuid,
      subject_uuid,
      classarm_uuid,
      class_subject_description,
    } = body;

    if (
      !session_uuid ||
      !semester_term_uuid ||
      !subject_uuid ||
      !classarm_uuid
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value || "";

    const backendRes = await fetch(`${API_BASE}/class-subject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        ...(accessToken && { Cookie: `access_token=${accessToken}` }),
      },
      body: JSON.stringify({
        session_uuid,
        semester_term_uuid,
        subject_uuid,
        classarm_uuid,
        class_subject_description,
      }),
    });

    const data = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json(
        { message: data.message || "Failed to create class subject" },
        { status: backendRes.status }
      );
    }

    return NextResponse.json(
      { message: "Class subject created successfully", classSubject: data },
      { status: 201 }
    );
  } catch (err) {
    console.error("[POST /api/subject_class] Error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Missing class subject ID" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const {
      session_uuid,
      semester_term_uuid,
      subject_uuid,
      classarm_uuid,
      class_subject_description,
    } = body;

    if (
      !session_uuid ||
      !semester_term_uuid ||
      !subject_uuid ||
      !classarm_uuid
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value || "";

    const backendRes = await fetch(`${API_BASE}/class-subject/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        ...(accessToken && { Cookie: `access_token=${accessToken}` }),
      },
      body: JSON.stringify({
        session_uuid,
        semester_term_uuid,
        subject_uuid,
        classarm_uuid,
        class_subject_description,
      }),
    });

    const data = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json(
        { message: data.message || "Failed to update class subject" },
        { status: backendRes.status }
      );
    }

    return NextResponse.json(
      { message: "Class subject updated successfully", classSubject: data },
      { status: 200 }
    );
  } catch (err) {
    console.error("[PUT /api/subject_class] Error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Missing class subject ID" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value || "";

    const backendRes = await fetch(`${API_BASE}/class-subject/${id}`, {
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
        { message: data.message || "Failed to delete class subject" },
        { status: backendRes.status }
      );
    }

    return NextResponse.json(
      { message: "Class subject deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("[DELETE /api/subject_class] Error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
