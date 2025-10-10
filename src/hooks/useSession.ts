"use client";

import { useState } from "react";
import { from, Observable } from "rxjs";

interface Session {
  id: number;
  session_id: string;
  name: string;
  code: string;
  session_description?: string;
  createdAt: string;
  updatedAt: string;
}

interface SessionSignupData {
  name: string;
  code: string;
  session_description?: string;
}

interface SessionResponse {
  message: string;
  session?: Session;
}

interface FetchSessionResponse {
  message?: string;
  sessions: Session[];
}

export interface UseSession {
  loading: boolean;
  error: Error | null;
  signup: (data: SessionSignupData) => Observable<SessionResponse>;
  fetchSession: () => Observable<Session[]>;
}

export function useSession(): UseSession {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const signup = (data: SessionSignupData): Observable<SessionResponse> => {
    return from(
      (async () => {
        setLoading(true);
        setError(null);
        try {
          console.log("useSession: Sending signup request:", {
            endpoint: "/api/session",
            payload: data,
          });

          const res = await fetch("/api/session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            credentials: "include",
          });

          const responseData: SessionResponse = await res.json();
          console.log("useSession: Signup response:", {
            status: res.status,
            data: responseData,
          });

          if (!res.ok) {
            throw new Error(responseData.message || "Signup failed");
          }

          return responseData;
        } catch (err: unknown) {
          const error = err instanceof Error ? err : new Error("Unknown error");
          console.error("useSession: Signup error:", {
            message: error.message,
            stack: error.stack,
            data,
          });
          setError(error);
          throw error;
        } finally {
          setLoading(false);
        }
      })()
    );
  };

  const fetchSession = (): Observable<Session[]> => {
    return from(
      (async () => {
        try {
          const res = await fetch("/api/session", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          });

          const responseData: FetchSessionResponse = await res.json();
          console.log("useSession: Fetch session response:", {
            status: res.status,
            data: responseData,
          });

          if (!res.ok) {
            throw new Error(responseData.message || "Failed to fetch sessions");
          }

          if (!responseData.sessions || !Array.isArray(responseData.sessions)) {
            throw new Error("Invalid response format: Expected sessions array");
          }

          return responseData.sessions;
        } catch (err: unknown) {
          const error = err instanceof Error ? err : new Error("Unknown error");
          console.error("useSession: Fetch session error:", {
            message: error.message,
            stack: error.stack,
          });
          throw error;
        }
      })()
    );
  };

  return {
    loading,
    error,
    signup,
    fetchSession,
  };
}