"use client";

import { useState } from "react";
import { from, Observable } from "rxjs";

export interface Arms {
  id: number;
  arms_id: string;
  name: string;
  arms_description?: string | null;
  created_by?: number;
  createdAt?: string;
  updatedAt?: string;
}

interface ArmsInputData {
  name: string;
  arms_description?: string;
  [key: string]: unknown; 
}

export interface UseArms {
  loading: boolean;
  error: Error | null;
  signup: (data: ArmsInputData) => Observable<Arms>;
  fetchArms: () => Observable<Arms[]>;
  fetchArmsById: (id: string) => Observable<Arms>;
  updateArms: (id: string, data: Partial<Arms>) => Observable<Arms>;
  deleteArms: (id: string) => Observable<boolean>;
}

export function useArms(): UseArms {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleError = (err: unknown) => {
    const e = err instanceof Error ? err : new Error("Unknown error");
    console.error("useArms error:", e.message);
    setError(e);
    throw e;
  };

  const signup = (data: ArmsInputData): Observable<Arms> =>
    from(
      (async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch("/api/arms", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(data),
          });

          const responseData = await res.json();
          if (!res.ok) throw new Error(responseData.message || "Signup failed");

          return responseData as Arms;
        } catch (err) {
          return handleError(err);
        } finally {
          setLoading(false);
        }
      })()
    );

  const fetchArms = (): Observable<Arms[]> =>
    from(
      (async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch("/api/arms", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          });

          const responseData = await res.json();
          if (!res.ok) throw new Error(responseData.message || "Fetch failed");

          if (!Array.isArray(responseData.arms)) {
            throw new Error("Expected response to be an array");
          }

          return responseData.arms as Arms[];
        } catch (err) {
          return handleError(err);
        } finally {
          setLoading(false);
        }
      })()
    );

  const fetchArmsById = (id: string): Observable<Arms> =>
    from(
      (async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch(`/api/arms/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          });

          const responseData = await res.json();
          if (!res.ok)
            throw new Error(responseData.message || "Fetch by ID failed");

          return responseData as Arms;
        } catch (err) {
          return handleError(err);
        } finally {
          setLoading(false);
        }
      })()
    );

  const updateArms = (id: string, data: Partial<Arms>): Observable<Arms> =>
    from(
      (async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch(`/api/arms/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(data),
          });

          const responseData = await res.json();
          if (!res.ok) throw new Error(responseData.message || "Update failed");

          return responseData.arm as Arms; 
        } catch (err) {
          return handleError(err);
        } finally {
          setLoading(false);
        }
      })()
    );

  const deleteArms = (id: string): Observable<boolean> =>
    from(
      (async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch(`/api/arms/${id}`, {
            method: "DELETE",
            credentials: "include",
          });

          if (!res.ok) {
            const responseData = await res.json();
            throw new Error(responseData.message || "Delete failed");
          }

          return true; 
        } catch (err) {
          return handleError(err);
        } finally {
          setLoading(false);
        }
      })()
    );

  return {
    loading,
    error,
    signup,
    fetchArms,
    fetchArmsById,
    updateArms,
    deleteArms,
  };
}
