import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "";
const API_KEY = process.env.API_KEY || "";

type Endpoint = "session" | "term" | "subject" | "class_arm";

interface SessionItem {
  session_uuid: string;
  session_id: number;
}

interface TermItem {
  term_uuid: string;
  term_id: number;
}

interface SubjectItem {
  subject_uuid: string;
  subject_id: number;
}

interface ClassArmItem {
  class_arm_uuid: string;
  class_arm_id: number;
}

type EntityMap = {
  session: SessionItem;
  term: TermItem;
  subject: SubjectItem;
  class_arm: ClassArmItem;
};

const fetchIdByUuid = async <T extends Endpoint>(
  endpoint: T,
  uuid: string
): Promise<number> => {
  try {
    const res = await fetch(`${API_BASE}/${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch ${endpoint}`);
    }

    const data = await res.json();

    const items: EntityMap[T][] =
      data[
        endpoint === "session"
          ? "sessions"
          : endpoint === "term"
          ? "terms"
          : endpoint === "subject"
          ? "subjects"
          : "classArms"
      ];

    const uuidKey = `${endpoint}_uuid` as keyof EntityMap[T];
    const idKey = `${endpoint}_id` as keyof EntityMap[T];

    const item = items.find((i) => i[uuidKey] === uuid);

    return item ? (item[idKey] as number) : 0;
  } catch (err) {
    console.error(`Error fetching ID for UUID ${uuid} from ${endpoint}:`, err);
    throw err;
  }
};

export async function GET(request: NextRequest) {
  try {
    
    const subjectClassId = request.nextUrl.pathname.split("/").pop();
    if (!subjectClassId) {
      return NextResponse.json(
        { message: "Class Subject ID is required" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value || "";

    const backendRes = await fetch(
      `${API_BASE}/class-subject/${subjectClassId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
          ...(accessToken && { Cookie: `access_token=${accessToken}` }),
        },
      }
    );

    const data = await backendRes.json();
    console.log("✅ Fetched Class Subject:", data);

    if (!backendRes.ok) {
      return NextResponse.json(
        { message: (data as { message?: string }).message || "Failed to fetch class subject" },
        { status: backendRes.status }
      );
    }

    return NextResponse.json({ classSubject: data }, { status: 200 });
  } catch (err) {
    console.error("[GET /api/subject_class] Error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
  
    const subjectClassId = request.nextUrl.pathname.split("/").pop();
    if (!subjectClassId) {
      return NextResponse.json(
        { message: "Class Subject ID is required" },
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

    if (!session_uuid || !semester_term_uuid || !subject_uuid || !classarm_uuid) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const [session_id, semester_term_id, subject_id, classarm_id] =
      await Promise.all([
        fetchIdByUuid("session", session_uuid),
        fetchIdByUuid("term", semester_term_uuid),
        fetchIdByUuid("subject", subject_uuid),
        fetchIdByUuid("class_arm", classarm_uuid),
      ]);

    if (!session_id || !semester_term_id || !subject_id || !classarm_id) {
      return NextResponse.json(
        { message: "Invalid UUID provided" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value || "";

    const backendRes = await fetch(
      `${API_BASE}/class-subject/${subjectClassId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
          ...(accessToken && { Cookie: `access_token=${accessToken}` }),
        },
        body: JSON.stringify({
          session_id,
          semester_term_id,
          subject_id,
          classarm_id,
          class_subject_description,
        }),
      }
    );

    const data = await backendRes.json();
    console.log("✅ Updated Class Subject:", data);

    if (!backendRes.ok) {
      return NextResponse.json(
        { message: (data as { message?: string }).message || "Failed to update class subject" },
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
    
    const subjectClassId = request.nextUrl.pathname.split("/").pop();
    if (!subjectClassId) {
      return NextResponse.json(
        { message: "Class Subject ID is required" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value || "";

    const backendRes = await fetch(
      `${API_BASE}/class-subject/${subjectClassId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
          ...(accessToken && { Cookie: `access_token=${accessToken}` }),
        },
      }
    );

    let data: { message?: string } | null = null;
    const text = await backendRes.text();
    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        data = { message: text }; 
      }
    }

    if (!backendRes.ok) {
      return NextResponse.json(
        { message: data?.message || "Failed to delete class subject" },
        { status: backendRes.status }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[DELETE /api/subject_class] Error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}