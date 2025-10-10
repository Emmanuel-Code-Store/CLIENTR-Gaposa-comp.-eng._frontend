"use client";

import { useState } from "react";
import { from, Observable } from "rxjs";

interface Term {
  id: number;
  term_id: string;
  name: string;
  code: string;
  term_description?: string;
  createdAt: string;
  updatedAt: string;
}

interface TermSignupData {
  name: string;
  code: string;
  term_description?: string;
}

interface TermSignupResponse {
  message: string;
  term?: Term;
}

export interface UseTerm {
  loading: boolean;
  error: Error | null;
  signup: (data: TermSignupData) => Observable<TermSignupResponse>;
  fetchTerm: () => Observable<Term[]>;
}

export function useTerm(): UseTerm {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const signup = (data: TermSignupData): Observable<TermSignupResponse> => {
    return from(
      (async () => {
        setLoading(true);
        setError(null);
        try {
          console.log("useTerm: Sending signup request:", {
            endpoint: "/api/term",
            payload: data,
          });

          const res = await fetch("/api/term", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            credentials: "include",
          });

          const responseData: TermSignupResponse = await res.json();
          console.log("useTerm: Signup response:", {
            status: res.status,
            data: responseData,
          });

          if (!res.ok) {
            throw new Error(responseData.message || "Signup failed");
          }

          return responseData;
        } catch (err: unknown) {
          const error = err instanceof Error ? err : new Error("Unknown error");
          console.error("useTerm: Signup error:", {
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

  const fetchTerm = (): Observable<Term[]> => {
    return from(
      (async () => {
        try {
          const res = await fetch("/api/term", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          });

          const responseData = await res.json();
          console.log("useTerm: Fetch term response:", {
            status: res.status,
            data: responseData,
          });

          if (!res.ok) {
            throw new Error(responseData.message || "Failed to fetch terms");
          }

          if (!responseData.terms || !Array.isArray(responseData.terms)) {
            throw new Error("Invalid response format: Expected terms array");
          }

          return responseData.terms as Term[];
        } catch (err: unknown) {
          const error = err instanceof Error ? err : new Error("Unknown error");
          console.error("useTerm: Fetch term error:", {
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
    fetchTerm,
  };
}