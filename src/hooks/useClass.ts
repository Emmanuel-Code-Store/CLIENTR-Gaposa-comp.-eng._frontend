"use client";

import { useState } from "react";
import { from, Observable } from "rxjs";

export interface Class {
  class_id: string;
  name: string;
  class_description?: string | null;
  created_by?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ClassSignupData {
  className: string;
  class_description?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface UseClass {
  loading: boolean;
  error: Error | null;
  signup: (data: ClassSignupData) => Observable<Class>;
  fetchClass: () => Observable<Class[]>;
  fetchClassById: (id: string) => Observable<Class>;
  updateClass: (id: string, data: Partial<Class>) => Observable<Class>;
  deleteClass: (id: string) => Observable<boolean>;
}

export function useClass(): UseClass {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const handleError = (err: unknown): never => {
    const error = err instanceof Error ? err : new Error("Unknown error");
    console.error("useClass Error:", error.message);
    setError(error);
    throw error;
  };

  const signup = (data: ClassSignupData): Observable<Class> =>
    from(
      (async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch("/api/class", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(data),
          });

          const responseData = await res.json();
          if (!res.ok)
            throw new Error(responseData.message || "Class signup failed");

          return responseData as Class;
        } catch (err) {
          return handleError(err);
        } finally {
          setLoading(false);
        }
      })()
    );

  const fetchClass = (): Observable<Class[]> =>
    from(
      (async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch("/api/class", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          });

          const responseData = await res.json();
          if (!res.ok)
            throw new Error(responseData.message || "Failed to fetch classes");

          if (!Array.isArray(responseData.classes)) {
            throw new Error("Expected response to contain a 'classes' array");
          }
          return responseData.classes as Class[];
        } catch (err) {
          return handleError(err);
        } finally {
          setLoading(false);
        }
      })()
    );

  const fetchClassById = (id: string): Observable<Class> =>
    from(
      (async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch(`/api/class/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          });

          const responseData = await res.json();
          if (!res.ok)
            throw new Error(
              responseData.message || "Failed to fetch class by ID"
            );

          return responseData as Class;
        } catch (err) {
          return handleError(err);
        } finally {
          setLoading(false);
        }
      })()
    );

  const updateClass = (id: string, data: Partial<Class>): Observable<Class> =>
    from(
      (async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch(`/api/class/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(data),
          });

          const responseData = await res.json();
          if (!res.ok)
            throw new Error(responseData.message || "Failed to update class");

          return responseData.class as Class;
        } catch (err) {
          return handleError(err);
        } finally {
          setLoading(false);
        }
      })()
    );

  const deleteClass = (id: string): Observable<boolean> =>
    from(
      (async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch(`/api/class/${id}`, {
            method: "DELETE",
            credentials: "include",
          });

          if (!res.ok) {
            const responseData = await res.json();
            throw new Error(responseData.message || "Failed to delete class");
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
    fetchClass,
    fetchClassById,
    updateClass,
    deleteClass,
  };
}
