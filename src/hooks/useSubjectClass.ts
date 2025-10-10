"use client";

import { useState } from "react";
import { from, Observable } from "rxjs";

interface Session {
  uuid: string;
  name: string;
}

interface SemesterTerm {
  uuid: string;
  name: string;
}

interface Subject {
  subject_id: number;
  name: string;
  code: string;
}

interface ClassArm {
  class_arm_id: number;
  class_arm_description: string;
}

interface Allocation {
  id: string;
  session_uuid: string;
  semester_term_uuid: string;
  subject_uuid: string;
  classarm_uuid: string;
  class_subject_description?: string;
  createdAt: string;
}

interface ClassSubjectData {
  session_uuid: string;
  semester_term_uuid: string;
  subject_uuid: string;
  classarm_uuid: string;
  class_subject_description?: string;
}

interface ResponseData {
  message?: string;
  sessions?: { session_id: number; name: string }[];
  terms?: { term_id: number; name: string }[];
  subjects?: Subject[];
  class_arms?: ClassArm[];
  allocations?: Allocation[];
}

interface ClassSubjectResponse {
  message: string;
  allocation?: Allocation;
}

export interface UseSubjectClass {
  loading: boolean;
  error: Error | null;
  fetchSessions: () => Observable<Session[]>;
  fetchSemesterTerms: () => Observable<SemesterTerm[]>;
  fetchSubjects: () => Observable<Subject[]>;
  fetchClassArms: () => Observable<ClassArm[]>;
  fetchClassSubjects: () => Observable<Allocation[]>;
  registerClassSubject: (data: ClassSubjectData) => Observable<ClassSubjectResponse>;
  updateClassSubject: (id: string, data: ClassSubjectData) => Observable<ClassSubjectResponse>;
  deleteClassSubject: (id: string) => Observable<void>;
}

export function useSubjectClass(): UseSubjectClass {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchSessions = (): Observable<Session[]> => {
    return from(
      (async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch("/api/session", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          });

          if (!res.ok) {
            const errorResponse = await res.json();
            throw new Error(errorResponse?.message || "Failed to fetch sessions");
          }

          const responseData: ResponseData = await res.json();
          console.log("✅ Sessions response:", responseData);

          return (
            responseData.sessions?.map((session) => ({
              uuid: session.session_id.toString(),
              name: session.name,
            })) || []
          );
        } catch (err: unknown) {
          const error = err instanceof Error ? err : new Error("Unknown error");
          console.error("❌ Error in fetchSessions:", error);
          setError(error);
          throw error;
        } finally {
          setLoading(false);
        }
      })()
    );
  };

  const fetchSemesterTerms = (): Observable<SemesterTerm[]> => {
    return from(
      (async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch("/api/term", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          });

          if (!res.ok) {
            const errorResponse = await res.json();
            throw new Error(errorResponse?.message || "Failed to fetch semester terms");
          }

          const responseData: ResponseData = await res.json();
          console.log("✅ Semester Terms response:", responseData);

          return (
            responseData.terms?.map((term) => ({
              uuid: term.term_id.toString(),
              name: term.name,
            })) || []
          );
        } catch (err: unknown) {
          const error = err instanceof Error ? err : new Error("Unknown error");
          console.error("❌ Error in fetchSemesterTerms:", error);
          setError(error);
          throw error;
        } finally {
          setLoading(false);
        }
      })()
    );
  };

  const fetchSubjects = (): Observable<Subject[]> => {
    return from(
      (async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch("/api/subject", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          });

          if (!res.ok) {
            const errorResponse = await res.json();
            throw new Error(errorResponse?.message || "Failed to fetch subjects");
          }

          const responseData: ResponseData = await res.json();
          console.log("✅ Subjects response:", responseData);

          return (
            Array.isArray(responseData.subjects)
              ? responseData.subjects.map((subject) => ({
                  subject_id: subject.subject_id,
                  name: subject.name,
                  code: subject.code,
                }))
              : []
          );
        } catch (err: unknown) {
          const error = err instanceof Error ? err : new Error("Unknown error");
          console.error("❌ Error in fetchSubjects:", error);
          setError(error);
          throw error;
        } finally {
          setLoading(false);
        }
      })()
    );
  };

  const fetchClassArms = (): Observable<ClassArm[]> => {
    return from(
      (async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch("/api/class_arm", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          });

          if (!res.ok) {
            const errorResponse = await res.json();
            throw new Error(errorResponse?.message || "Failed to fetch class arms");
          }

          const responseData: ResponseData = await res.json();
          console.log("✅ Class Arms response:", responseData);

          return (
            Array.isArray(responseData.class_arms)
              ? responseData.class_arms.map((classArm) => ({
                  class_arm_id: classArm.class_arm_id,
                  class_arm_description: classArm.class_arm_description,
                }))
              : []
          );
        } catch (err: unknown) {
          const error = err instanceof Error ? err : new Error("Unknown error");
          console.error("❌ Error in fetchClassArms:", error);
          setError(error);
          throw error;
        } finally {
          setLoading(false);
        }
      })()
    );
  };

  const fetchClassSubjects = (): Observable<Allocation[]> => {
    return from(
      (async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch("/api/subject_class", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          });

          if (!res.ok) {
            const errorResponse = await res.json();
            throw new Error(errorResponse?.message || "Failed to fetch class subjects");
          }

          const responseData: ResponseData = await res.json();
          console.log("✅ Class Subjects response:", responseData);

          return Array.isArray(responseData.allocations) ? responseData.allocations : [];
        } catch (err: unknown) {
          const error = err instanceof Error ? err : new Error("Unknown error");
          console.error("❌ Error in fetchClassSubjects:", error);
          setError(error);
          throw error;
        } finally {
          setLoading(false);
        }
      })()
    );
  };

  const registerClassSubject = (data: ClassSubjectData): Observable<ClassSubjectResponse> => {
    return from(
      (async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch("/api/subject_class", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(data),
          });

          if (!res.ok) {
            const errorResponse = await res.json();
            throw new Error(errorResponse?.message || "Failed to register class subject");
          }

          const responseData: ClassSubjectResponse = await res.json();
          console.log("✅ Register response:", responseData);

          return responseData;
        } catch (err: unknown) {
          const error = err instanceof Error ? err : new Error("Unknown error");
          console.error("❌ Error in registerClassSubject:", error);
          setError(error);
          throw error;
        } finally {
          setLoading(false);
        }
      })()
    );
  };

  const updateClassSubject = (id: string, data: ClassSubjectData): Observable<ClassSubjectResponse> => {
    return from(
      (async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch(`/api/subject_class/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(data),
          });

          if (!res.ok) {
            const errorResponse = await res.json();
            throw new Error(errorResponse?.message || "Failed to update class subject");
          }

          const responseData: ClassSubjectResponse = await res.json();
          console.log("✅ Update response:", responseData);

          return responseData;
        } catch (err: unknown) {
          const error = err instanceof Error ? err : new Error("Unknown error");
          console.error("❌ Error in updateClassSubject:", error);
          setError(error);
          throw error;
        } finally {
          setLoading(false);
        }
      })()
    );
  };

  const deleteClassSubject = (id: string): Observable<void> => {
    return from(
      (async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch(`/api/subject_class/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          });

          if (!res.ok) {
            const errorResponse = await res.json();
            throw new Error(errorResponse?.message || "Failed to delete class subject");
          }

          console.log("✅ Delete response: Success");
        } catch (err: unknown) {
          const error = err instanceof Error ? err : new Error("Unknown error");
          console.error("❌ Error in deleteClassSubject:", error);
          setError(error);
          throw error;
        } finally {
          setLoading(false);
        }
      })()
    );
  };

  return {
    loading,
    error,
    fetchSessions,
    fetchSemesterTerms,
    fetchSubjects,
    fetchClassArms,
    fetchClassSubjects,
    registerClassSubject,
    updateClassSubject,
    deleteClassSubject,
  };
}
