"use client";

import { useState } from "react";
import { from, Observable } from "rxjs";

interface Class {
  uuid: string;
  name: string;
}

interface Arm {
  uuid: string;
  name: string;
}

export interface ClassArmData {
  class_arm_id: string;
  class_id: string;
  arms_id: string;
  class_arm_description: string;
  created_by: string;
  createdAt: string;
  updatedAt: string;
  class: Class;
  arm: Arm;
}

export interface ClassArmCreateInput {
  class_id: string;
  arms_id: string;
  class_arm_description: string;
}

interface ApiResponse<T> {
  message?: string;
  classes?: ClassApi[];
  arms?: ArmApi[];
  classArms?: ClassArmApi[];
  classArm?: T;
}

interface ClassApi {
  class_id: string | number;
  name: string;
}

interface ArmApi {
  arms_id: string | number;
  name: string;
}

interface ClassArmApi {
  class_arm_id: string;
  class_id: string;
  arms_id: string;
  class_arm_description: string;
  created_by: string;
  createdAt: string;
  updatedAt: string;
  class?: { name: string };
  arm?: { name: string };
}

export interface UseClass {
  loading: boolean;
  error: Error | null;
  fetchClassArms: () => Observable<ClassArmData[]>;
  fetchClass: () => Observable<Class[]>;
  fetchArms: () => Observable<Arm[]>;
  registerClassArm: (data: ClassArmCreateInput) => Observable<ClassArmData>;
  fetchClassArmById: (id: string) => Observable<ClassArmData>;
  updateClassArm: (id: string, data: Partial<ClassArmData>) => Observable<ClassArmData>;
  deleteClassArm: (id: string) => Observable<boolean>;
}

export function useClassArms(): UseClass {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchClass = (): Observable<Class[]> =>
    from((async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/class", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        const responseData: ApiResponse<Class> = await res.json();
        if (!res.ok || !responseData.classes) {
          throw new Error(responseData.message || "Failed to fetch class");
        }

        return responseData.classes
          .map((cls: ClassApi) => ({
            uuid: cls.class_id.toString(),
            name: cls.name,
          }));
      } catch (err: unknown) {
        const e = err instanceof Error ? err : new Error("Unknown error");
        setError(e);
        throw e;
      } finally {
        setLoading(false);
      }
    })());

  const fetchClassArms = (): Observable<ClassArmData[]> =>
    from((async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/class_arm", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        const result: ClassArmApi[] = await res.json();
        if (!res.ok) throw new Error("Failed to fetch class arms");

        return result.map((item: ClassArmApi) => ({
          class_arm_id: item.class_arm_id,
          class_id: item.class_id,
          arms_id: item.arms_id,
          class_arm_description: item.class_arm_description,
          created_by: item.created_by,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          class: { uuid: item.class_id, name: item.class?.name || "" },
          arm: { uuid: item.arms_id, name: item.arm?.name || "" },
        }));
      } catch (err: unknown) {
        const e = err instanceof Error ? err : new Error("Unknown error");
        setError(e);
        throw e;
      } finally {
        setLoading(false);
      }
    })());

  const fetchArms = (): Observable<Arm[]> =>
    from((async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/arms", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        const responseData: ApiResponse<Arm> = await res.json();
        if (!res.ok || !responseData.arms) {
          throw new Error(responseData.message || "Failed to fetch arms");
        }

        return responseData.arms.map((arm: ArmApi) => ({
          uuid: arm.arms_id.toString(),
          name: arm.name,
        }));
      } catch (err: unknown) {
        const e = err instanceof Error ? err : new Error("Unknown error");
        setError(e);
        throw e;
      } finally {
        setLoading(false);
      }
    })());

  const registerClassArm = (data: ClassArmCreateInput): Observable<ClassArmData> =>
    from((async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/class_arm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data),
        });

        const result: { classArm: ClassArmApi } = await res.json();
        if (!res.ok || !result.classArm) {
          throw new Error("Failed to register class arm");
        }

        return {
          ...result.classArm,
          class: { uuid: result.classArm.class_id, name: result.classArm.class?.name || "" },
          arm: { uuid: result.classArm.arms_id, name: result.classArm.arm?.name || "" },
        };
      } catch (err: unknown) {
        const e = err instanceof Error ? err : new Error("Unknown error");
        setError(e);
        throw e;
      } finally {
        setLoading(false);
      }
    })());

  const fetchClassArmById = (id: string): Observable<ClassArmData> =>
    from((async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/class_arm/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        const result: ClassArmApi = await res.json();
        if (!res.ok) {
          throw new Error("Failed to fetch class arm");
        }

        return {
          ...result,
          class: { uuid: result.class_id, name: result.class?.name || "" },
          arm: { uuid: result.arms_id, name: result.arm?.name || "" },
        };
      } catch (err: unknown) {
        const e = err instanceof Error ? err : new Error("Unknown error");
        setError(e);
        throw e;
      } finally {
        setLoading(false);
      }
    })());

  const updateClassArm = (id: string, data: Partial<ClassArmData>): Observable<ClassArmData> =>
    from((async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/class_arm/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data),
        });

        const result: ClassArmApi = await res.json();
        if (!res.ok) {
          throw new Error("Failed to update class arm");
        }

        return {
          ...result,
          class: { uuid: result.class_id, name: result.class?.name || "" },
          arm: { uuid: result.arms_id, name: result.arm?.name || "" },
        };
      } catch (err: unknown) {
        const e = err instanceof Error ? err : new Error("Unknown error");
        setError(e);
        throw e;
      } finally {
        setLoading(false);
      }
    })());

  const deleteClassArm = (id: string): Observable<boolean> =>
    from((async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/class_arm/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (!res.ok) {
          const result: ApiResponse<null> = await res.json();
          throw new Error(result.message || "Failed to delete class arm");
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
    fetchClassArms,
    fetchClass,
    fetchArms,
    registerClassArm,
    fetchClassArmById,
    updateClassArm,
    deleteClassArm,
  };
}
