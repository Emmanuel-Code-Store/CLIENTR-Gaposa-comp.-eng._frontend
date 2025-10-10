"use client";

import { useState } from "react";
import { from, Observable } from "rxjs";

export interface Department {
  id: number;
  department_uuid: string;
  name: string;
  department_description?: string | null;
  created_by?: number;
  createdAt?: string;
  updatedAt?: string;
}

interface DepartmentSignupData {
  name: string;
  department_description?: string | null;
}

interface ApiResponse<T> {
  message?: string;
  department?: T;
  departments?: T[];
}

export interface UseDepartment {
  loading: boolean;
  error: Error | null;
  signup: (data: DepartmentSignupData) => Observable<Department>;
  fetchDepartment: () => Observable<Department[]>;
  fetchDepartmentById: (deptUuid: string) => Observable<Department>;
  updateDepartment: (deptUuid: string, data: Partial<Department>) => Observable<Department>;
  deleteDepartment: (deptUuid: string) => Observable<boolean>;
}

export function useDepartment(): UseDepartment {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const signup = (data: DepartmentSignupData): Observable<Department> =>
    from((async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/department", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data),
        });

        const responseData: ApiResponse<Department> = await res.json();
        if (!res.ok || !responseData.department) {
          throw new Error(responseData.message || "Signup failed");
        }
        return responseData.department;
      } catch (err: unknown) {
        const e = err instanceof Error ? err : new Error("Unknown error");
        setError(e);
        throw e;
      } finally {
        setLoading(false);
      }
    })());

  const fetchDepartment = (): Observable<Department[]> =>
    from((async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/department", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        const responseData: ApiResponse<Department> = await res.json();
        if (!res.ok || !Array.isArray(responseData.departments)) {
          throw new Error(responseData.message || "Fetch failed");
        }
        return responseData.departments;
      } catch (err: unknown) {
        const e = err instanceof Error ? err : new Error("Unknown error");
        setError(e);
        throw e;
      } finally {
        setLoading(false);
      }
    })());

  const fetchDepartmentById = (deptUuid: string): Observable<Department> =>
    from((async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/department/${deptUuid}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        const responseData: ApiResponse<Department> = await res.json();
        if (!res.ok || !responseData.department) {
          throw new Error(responseData.message || "Fetch failed");
        }
        return responseData.department;
      } catch (err: unknown) {
        const e = err instanceof Error ? err : new Error("Unknown error");
        setError(e);
        throw e;
      } finally {
        setLoading(false);
      }
    })());

  const updateDepartment = (deptUuid: string, data: Partial<Department>): Observable<Department> =>
    from((async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/department/${deptUuid}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data),
        });

        const responseData: ApiResponse<Department> = await res.json();
        if (!res.ok || !responseData.department) {
          throw new Error(responseData.message || "Update failed");
        }
        return responseData.department;
      } catch (err: unknown) {
        const e = err instanceof Error ? err : new Error("Unknown error");
        setError(e);
        console.error("Error updating department:", e.message);
        throw e;
      } finally {
        setLoading(false);
      }
    })());

  const deleteDepartment = (deptUuid: string): Observable<boolean> =>
    from((async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/department/${deptUuid}`, {
          method: "DELETE",
          credentials: "include",
        });

        if (!res.ok) {
          const responseData: ApiResponse<Department> = await res.json();
          throw new Error(responseData.message || "Delete failed");
        }

        return true;
      } catch (err: unknown) {
        const e = err instanceof Error ? err : new Error("Unknown error");
        setError(e);
        throw e;
      } finally {
        setLoading(false);
      }
    })());

  return {
    loading,
    error,
    signup,
    fetchDepartment,
    fetchDepartmentById,
    updateDepartment,
    deleteDepartment,
  };
}
