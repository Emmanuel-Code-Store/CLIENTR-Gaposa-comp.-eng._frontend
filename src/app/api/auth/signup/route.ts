import { NextRequest, NextResponse } from "next/server";
import formidable, { Fields, Files } from "formidable";
import { IncomingMessage } from "http";
import { Readable } from "stream";

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "";
const API_KEY = process.env.API_KEY || "";
if (!API_BASE || !API_KEY) {
  console.error("[Signup] Missing API_BASE or API_KEY environment variables");
}

class MockIncomingMessage extends Readable {
  headers: Record<string, string>;
  constructor(buffer: Buffer, headers: Record<string, string>) {
    super();
    this.headers = headers;
    this.push(buffer);
    this.push(null);
  }
}
export async function POST(request: NextRequest) {
  try {
    const buffer = Buffer.from(await request.arrayBuffer());
    const requestHeaders = Object.fromEntries(request.headers.entries());

    const mockReq = new MockIncomingMessage(buffer, requestHeaders);

    const form = formidable({
      maxFileSize: 5 * 1024 * 1024,
      keepExtensions: true,
    });

    const [fields] = await new Promise<[Fields, Files]>(
      (resolve, reject) => {
        form.parse(mockReq as IncomingMessage, (err, fields, files) => {
          if (err) reject(err);
          else resolve([fields, files]);
        });
      }
    );

    const roleId_str = fields.roleId?.[0] || fields.role_id?.[0];

    let roleId: number | undefined;

    if (roleId_str !== undefined) {
      roleId = parseInt(roleId_str, 10);
      if (isNaN(roleId)) {
        console.warn("[Signup] Invalid roleId format", { roleId_str });
        return NextResponse.json(
          { message: "Role ID must be a number" },
          { status: 400 }
        );
      }

      const validRoles = [1, 2, 3, 4, 5, 6];
      if (!validRoles.includes(roleId)) {
        console.warn("[Signup] Invalid roleId", { roleId });
        return NextResponse.json(
          { message: "Invalid role ID" },
          { status: 400 }
        );
      }
    }

    const payload = {
      email: fields.email?.[0],
      password: fields.password?.[0],
      fullname: fields.fullname?.[0],
      phone: fields.phone?.[0],
      address: fields.address?.[0],
      isActive: fields.isActive?.[0] === "true",
      roleId,
    };

    if (!payload.email || !payload.password || !payload.fullname) {
      console.warn("[Signup] Missing required fields", { payload });
      return NextResponse.json(
        { message: "Email, password, and full name are required" },
        { status: 400 }
      );
    }

    if (!API_BASE) {
      console.error("[Signup] API_BASE is missing");
      return NextResponse.json(
        { message: "Server configuration error" },
        { status: 500 }
      );
    }

    console.log("[Signup] Sending to backend:", {
      url: `${API_BASE}/users`,
      payload: { ...payload, password: "[REDACTED]" },
    });

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    };

    const backendResponse = await fetch(`${API_BASE}/users`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      credentials: "include",
    });

    const data = await backendResponse.json();
    console.log("[Signup] Backend response:", {
      status: backendResponse.status,
      data,
      headers: Object.fromEntries(backendResponse.headers.entries()),
    });

    if (!backendResponse.ok) {
      console.error("[Signup] Backend creation failed:", data);
      return NextResponse.json(
        { message: data.message || "Creation failed" },
        { status: backendResponse.status }
      );
    }

    const responseData = {
      message: "Created successfully",
      user: {
        userId: data.user?.userId,
        email: data.user?.email,
        fullname: data.user?.fullname || null,
        role: data.user?.roleId || roleId,
        staffId: data.user?.staffId || null,
      },
    };

    return NextResponse.json(responseData, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[Signup] Internal error:", message, error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
