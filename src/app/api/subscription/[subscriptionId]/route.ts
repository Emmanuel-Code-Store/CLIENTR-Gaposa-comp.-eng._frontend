import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

interface Subscription {
  id: string;
  email?: string;
}

interface ApiError {
  message?: string;
}

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "";
const API_KEY = process.env.API_KEY || "";

export async function GET(request: NextRequest) {
  try {
    const subscriptionId = request.nextUrl.pathname.split("/").pop();
    if (!subscriptionId) {
      return NextResponse.json(
        { message: "Subscription ID is required" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value || "";

    const backendRes = await fetch(`${API_BASE}/subscriptions/${subscriptionId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        ...(accessToken && { Cookie: `access_token=${accessToken}` }),
      },
    });

    const data: Subscription | ApiError = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json(
        { message: (data as ApiError).message || "Subscription not found" },
        { status: backendRes.status }
      );
    }

    return NextResponse.json({ subscription: data as Subscription }, { status: 200 });
  } catch (error) {
    console.error("[GET /api/subscription] Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    
    const subscriptionId = request.nextUrl.pathname.split("/").pop();
    if (!subscriptionId) {
      return NextResponse.json(
        { message: "Subscription ID is required" },
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

    const backendRes = await fetch(`${API_BASE}/subscriptions/${subscriptionId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        ...(accessToken && { Cookie: `access_token=${accessToken}` }),
      },
      body: JSON.stringify(body),
    });

    const data: Subscription | ApiError = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json(
        { message: (data as ApiError).message || "Failed to update subscription" },
        { status: backendRes.status }
      );
    }

    return NextResponse.json(
      { message: "Subscription updated", subscription: data as Subscription },
      { status: 200 }
    );
  } catch (error) {
    console.error("[PATCH /api/subscription] Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    
    const subscriptionId = request.nextUrl.pathname.split("/").pop();
    if (!subscriptionId) {
      return NextResponse.json(
        { message: "Subscription ID is required" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value || "";

    const backendRes = await fetch(`${API_BASE}/subscriptions/${subscriptionId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        ...(accessToken && { Cookie: `access_token=${accessToken}` }),
      },
    });

    let data: ApiError | null = null;
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
        { message: data?.message || "Failed to delete subscription" },
        { status: backendRes.status }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("[DELETE /api/subscription] Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}