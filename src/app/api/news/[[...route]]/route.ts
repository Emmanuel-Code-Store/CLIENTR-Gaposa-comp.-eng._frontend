import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "";

export async function GET(request: NextRequest) {
  try {
    
    const pathSegments = request.nextUrl.pathname
      .split("/")
      .slice(3)
      .filter(segment => segment); 
    const path = pathSegments.join("/");

    const access_token = request.cookies.get("access_token")?.value;

    const response = await fetch(`${BACKEND_URL}/news/${path}`, {
      headers: access_token ? { Authorization: `Bearer ${access_token}` } : {},
      credentials: "include",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch news" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("[GET /api/news] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const access_token = request.cookies.get("access_token")?.value;
    const body = await request.json();
    if (!Object.keys(body).length) {
      return NextResponse.json(
        { error: "Request body is required" },
        { status: 400 }
      );
    }

    const response = await fetch(`${BACKEND_URL}/news`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(access_token ? { Authorization: `Bearer ${access_token}` } : {}),
      },
      credentials: "include",
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to create news" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("[POST /api/news] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    
    const id = request.nextUrl.pathname
      .split("/")
      .slice(3) 
      .filter(segment => segment)[0]; 
    if (!id) {
      return NextResponse.json(
        { error: "News ID is required" },
        { status: 400 }
      );
    }

    const access_token = request.cookies.get("access_token")?.value;
    const body = await request.json();
    if (!Object.keys(body).length) {
      return NextResponse.json(
        { error: "Request body is required" },
        { status: 400 }
      );
    }

    const response = await fetch(`${BACKEND_URL}/news/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(access_token ? { Authorization: `Bearer ${access_token}` } : {}),
      },
      credentials: "include",
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to update news" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("[PUT /api/news] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    
    const id = request.nextUrl.pathname
      .split("/")
      .slice(3)
      .filter(segment => segment)[0]; 
    if (!id) {
      return NextResponse.json(
        { error: "News ID is required" },
        { status: 400 }
      );
    }

    const access_token = request.cookies.get("access_token")?.value;

    const response = await fetch(`${BACKEND_URL}/news/${id}`, {
      method: "DELETE",
      headers: access_token ? { Authorization: `Bearer ${access_token}` } : {},
      credentials: "include",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to delete news" },
        { status: response.status }
      );
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[DELETE /api/news] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}