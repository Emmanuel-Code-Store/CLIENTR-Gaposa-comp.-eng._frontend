"use client";

import { useState } from "react";
import { from, Observable } from "rxjs";
import { ROLE_TOKENS } from "@/constants/roleTokens";

interface Session {
  uuid: string;
  id: number;
  name: string;
}

interface SemesterTerm {
  uuid: string;
  id: number;
  name: string;
}

interface Subject {
  uuid: string;
  id: number;
  name: string;
  code: string;
}

interface Class {
  id: number;
  name: string;
}

interface Arm {
  id: number;
  name: string;
}

interface ClassArm {
  uuid: string;
  id: number;
  name: string;
}

interface Staff {
  uuid: string;
  id: number;
  fullname: string;
  staff_id: string;
}

interface Allocation {
  staff_subject_class_id: string;
  session_uuid: string;
  semester_term_uuid: string;
  subject_uuid: string;
  classarm_uuid: string;
  staff_uuid: string;
  allocated_by_uuid: string;
  class_subject_description?: string;
  createdAt: string;
  session_name?: string;
  term_name?: string;
  subject_name?: string;
  subject_code?: string;
  class_arm_name?: string;
  staff_fullname?: string;
  allocated_by_fullname?: string;
}

interface StaffSubjectClassData {
  session_uuid: string;
  semester_term_uuid: string;
  subject_uuid: string;
  classarm_uuid: string;
  staff_uuid: string;
  class_subject_description?: string;
}

interface ResponseData {
  message?: string;
  sessions?: { session_id: number; id: number; name: string }[];
  terms?: { term_id: number; id: number; name: string }[];
  subjects?: { subject_id: number; id: number; name: string; code: string }[];
  classes?: { class_id: number; id: number; name: string }[];
  arms?: { arms_id: number; id: number; name: string }[];
  class_arms?: { class_arm_id: number; id: number; class?: { name: string }; arm?: { name: string }; class_id?: number; arms_id?: number }[];
  users?: { userId: string; id: number; fullname: string; staff_id: string }[];
  allocations?: {
    staff_subject_class_id: string;
    session_id?: string;
    semester_term_id?: string;
    subject_id?: string;
    classarm_id?: string;
    staff_alloacted_id?: string;
    allocated_by?: string;
    class_subject_description?: string;
    createdAt: string;
    classSubject?: {
      session?: { session_id: string; name: string };
      term?: { term_id: string; name: string };
      subject?: { subject_id: string; name: string; code: string };
      classArm?: { class_arm_id: string; class?: { name: string }; arm?: { name: string } };
    };
    allocatedStaff?: { userId: string; fullname: string };
    allocator?: { userId: string; fullname: string };
  }[];
}

interface StaffSubjectClassResponse {
  message: string;
  id?: string;
  staffSubjectClass?: {
    staff_subject_class_id: string;
    staff_uuid: string;
    class_subject_description?: string;
    Session?: { name: string };
    Term?: { name: string };
    Subject?: { name: string; code: string };
    ClassArm?: { name: string };
  };
  allocatedBy?: {
    id: string;
    fullname: string;
  };
  createdAt?: string;
}

interface DeleteResponse {
  message: string;
  success: boolean;
}

interface ClassSubjectUuidResponse {
  message?: string;
  class_subject_uuid_id?: string;
}

export interface UseStaffSubjectClass {
  loading: boolean;
  error: Error | null;
  fetchSessions: () => Observable<Session[]>;
  fetchSemesterTerms: () => Observable<SemesterTerm[]>;
  fetchSubjects: () => Observable<Subject[]>;
  fetchClasses: () => Observable<Class[]>;
  fetchArms: () => Observable<Arm[]>;
  fetchClassArms: () => Observable<ClassArm[]>;
  fetchStaff: () => Observable<Staff[]>;
  fetchStaffSubjectClasses: () => Observable<Allocation[]>;
  registerStaffSubjectClass: (data: StaffSubjectClassData) => Observable<StaffSubjectClassResponse>;
  updateStaffSubjectClass: (
    staff_subject_class_id: string,
    data: StaffSubjectClassData
  ) => Observable<StaffSubjectClassResponse>;
  deleteStaffSubjectClass: (staff_subject_class_id: string) => Observable<DeleteResponse>;
}

export function useStaffSubjectClass(): UseStaffSubjectClass {
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
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });

          const responseData: ResponseData = await res.json();
          console.log("✅ Sessions response:", responseData);

          if (!res.ok) {
            throw new Error(responseData.message || "Failed to fetch sessions");
          }

          const sessions: Session[] =
            responseData.sessions?.map((session) => ({
              uuid: session.session_id.toString(),
              id: session.id,
              name: session.name,
            })) || [];

          return sessions;
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
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });

          const responseData: ResponseData = await res.json();
          console.log("✅ Semester Terms response:", responseData);

          if (!res.ok) {
            throw new Error(responseData.message || "Failed to fetch semester terms");
          }

          const terms: SemesterTerm[] =
            responseData.terms?.map((term) => ({
              uuid: term.term_id.toString(),
              id: term.id,
              name: term.name,
            })) || [];

          return terms;
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
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });

          const responseData: ResponseData = await res.json();
          console.log("✅ Subjects response:", responseData);

          if (!res.ok) {
            throw new Error(responseData.message || "Failed to fetch subjects");
          }

          const subjects: Subject[] =
            responseData.subjects?.map((subject) => ({
              uuid: subject.subject_id.toString(),
              id: subject.id,
              name: subject.name,
              code: subject.code,
            })) || [];

          return subjects;
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

  const fetchClasses = (): Observable<Class[]> => {
    return from(
      (async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch("/api/class", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });

          const responseData: ResponseData = await res.json();
          console.log("✅ Classes response:", responseData);

          if (!res.ok) {
            throw new Error(responseData.message || "Failed to fetch classes");
          }

          const classes: Class[] =
            responseData.classes?.map((c) => ({
              id: c.id,
              name: c.name,
            })) || [];

          return classes;
        } catch (err: unknown) {
          const error = err instanceof Error ? err : new Error("Unknown error");
          console.error("❌ Error in fetchClasses:", error);
          setError(error);
          throw error;
        } finally {
          setLoading(false);
        }
      })()
    );
  };

  const fetchArms = (): Observable<Arm[]> => {
    return from(
      (async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch("/api/arms", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });

          const responseData: ResponseData = await res.json();
          console.log("✅ Arms response:", responseData);

          if (!res.ok) {
            throw new Error(responseData.message || "Failed to fetch arms");
          }

          const arms: Arm[] =
            responseData.arms?.map((a) => ({
              id: a.id,
              name: a.name,
            })) || [];

          return arms;
        } catch (err: unknown) {
          const error = err instanceof Error ? err : new Error("Unknown error");
          console.error("❌ Error in fetchArms:", error);
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
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });

          const responseData: ResponseData = await res.json();
          console.log("✅ Class Arms response:", responseData);

          if (!res.ok) {
            throw new Error(responseData.message || "Failed to fetch class arms");
          }

          const classArms: ClassArm[] =
            responseData.class_arms?.map((classArm) => ({
              uuid: classArm.class_arm_id.toString(),
              id: classArm.id,
              name: `${classArm.class?.name || ""} ${classArm.arm?.name || ""}`.trim(),
            })) || [];

          console.log("classArms: ", classArms);

          return classArms;
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

  const fetchStaff = (): Observable<Staff[]> => {
    return from(
      (async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch(`/api/user?roleId=${ROLE_TOKENS.staff}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });

          const responseData: ResponseData = await res.json();
          console.log("✅ Staff response:", responseData);

          if (!res.ok) {
            throw new Error(responseData.message || "Failed to fetch staff");
          }

          const staff: Staff[] =
            responseData.users?.map((s) => ({
              uuid: s.userId.toString(),
              id: s.id,
              fullname: s.fullname,
              staff_id: s.staff_id,
            })) || [];

          return staff;
        } catch (err: unknown) {
          const error = err instanceof Error ? err : new Error("Unknown error");
          console.error("❌ Error in fetchStaff:", error);
          setError(error);
          throw error;
        } finally {
          setLoading(false);
        }
      })()
    );
  };

  const fetchStaffSubjectClasses = (): Observable<Allocation[]> => {
    return from(
      (async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch("/api/staff_subject_class", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });

          const responseData: ResponseData = await res.json();
          console.log("✅ Staff Subject Classes response:", responseData);

          if (!res.ok) {
            throw new Error(responseData.message || "Failed to fetch staff subject classes");
          }

          const allocations: Allocation[] =
            responseData.allocations?.map((alloc) => ({
              staff_subject_class_id: alloc.staff_subject_class_id?.toString() || "",
              session_uuid:
                alloc.classSubject?.session?.session_id?.toString() ||
                alloc.session_id?.toString() ||
                "",
              semester_term_uuid:
                alloc.classSubject?.term?.term_id?.toString() ||
                alloc.semester_term_id?.toString() ||
                "",
              subject_uuid:
                alloc.classSubject?.subject?.subject_id?.toString() ||
                alloc.subject_id?.toString() ||
                "",
              classarm_uuid:
                alloc.classSubject?.classArm?.class_arm_id?.toString() ||
                alloc.classarm_id?.toString() ||
                "",
              staff_uuid:
                alloc.allocatedStaff?.userId?.toString() ||
                alloc.staff_alloacted_id?.toString() ||
                "",
              allocated_by_uuid:
                alloc.allocator?.userId?.toString() ||
                alloc.allocated_by?.toString() ||
                "",
              class_subject_description: alloc.class_subject_description || "",
              createdAt: alloc.createdAt || "",
              session_name: alloc.classSubject?.session?.name || "Unknown",
              term_name: alloc.classSubject?.term?.name || "Unknown",
              subject_name: alloc.classSubject?.subject?.name || "Unknown",
              subject_code: alloc.classSubject?.subject?.code || "Unknown",
              class_arm_name:
                `${alloc.classSubject?.classArm?.class?.name || ""} - ${
                  alloc.classSubject?.classArm?.arm?.name || ""
                }`.trim() || "Unknown",
              staff_fullname: alloc.allocatedStaff?.fullname || "Unknown",
              allocated_by_fullname: alloc.allocator?.fullname || "Unknown",
            })) || [];

          console.log("allocations: ", allocations);

          return allocations;
        } catch (err: unknown) {
          const error = err instanceof Error ? err : new Error("Unknown error");
          console.error("❌ Error in fetchStaffSubjectClasses:", error);
          setError(error);
          throw error;
        } finally {
          setLoading(false);
        }
      })()
    );
  };

  const registerStaffSubjectClass = (
    data: StaffSubjectClassData
  ): Observable<StaffSubjectClassResponse> => {
    return from(
      (async () => {
        setLoading(true);
        setError(null);
        try {
          const classSubjectUuidRes = await fetch(
            `/api/subject_class?subject_uuid=${data.subject_uuid}&classarm_uuid=${data.classarm_uuid}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            }
          );

          const classSubjectUuidData: ClassSubjectUuidResponse = await classSubjectUuidRes.json();

          if (!classSubjectUuidRes.ok) {
            throw new Error(classSubjectUuidData.message || "Failed to get class subject UUID");
          }

          const class_subject_uuid_id = classSubjectUuidData.class_subject_uuid_id;

          if (!class_subject_uuid_id) {
            throw new Error("Class subject UUID not found");
          }

          const res = await fetch("/api/staff_subject_class", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              class_subject_uuid_id,
              session_uuid_id: data.session_uuid,
              semester_term_uuid_id: data.semester_term_uuid,
              staff_uuid_id: data.staff_uuid,
              class_subject_description: data.class_subject_description,
            }),
          });

          const responseData: StaffSubjectClassResponse = await res.json();
          console.log("✅ Register response:", responseData);

          if (!res.ok) {
            throw new Error(responseData.message || "Failed to register staff subject class");
          }

          return responseData;
        } catch (err: unknown) {
          const error = err instanceof Error ? err : new Error("Unknown error");
          console.error("❌ Error in registerStaffSubjectClass:", error);
          setError(error);
          throw error;
        } finally {
          setLoading(false);
        }
      })()
    );
  };

  const updateStaffSubjectClass = (
    staff_subject_class_id: string,
    data: StaffSubjectClassData
  ): Observable<StaffSubjectClassResponse> => {
    return from(
      (async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch(`/api/staff_subject_class/${staff_subject_class_id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              session_uuid: data.session_uuid,
              semester_term_uuid: data.semester_term_uuid,
              subject_uuid: data.subject_uuid,
              classarm_uuid: data.classarm_uuid,
              staff_uuid: data.staff_uuid,
              class_subject_description: data.class_subject_description,
            }),
          });

          const responseData: StaffSubjectClassResponse = await res.json();
          console.log("✅ Update response:", responseData);

          if (!res.ok) {
            throw new Error(responseData.message || "Failed to update staff subject class");
          }

          return responseData;
        } catch (err: unknown) {
          const error = err instanceof Error ? err : new Error("Unknown error");
          console.error("❌ Error in updateStaffSubjectClass:", error);
          setError(error);
          throw error;
        } finally {
          setLoading(false);
        }
      })()
    );
  };

  const deleteStaffSubjectClass = (
    staff_subject_class_id: string
  ): Observable<DeleteResponse> => {
    return from(
      (async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch(`/api/staff_subject_class/${staff_subject_class_id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });

          const responseData: DeleteResponse = await res.json();
          console.log("✅ Delete response:", responseData);

          if (!res.ok) {
            throw new Error(responseData.message || "Failed to delete staff subject class");
          }

          return responseData;
        } catch (err: unknown) {
          const error = err instanceof Error ? err : new Error("Unknown error");
          console.error("❌ Error in deleteStaffSubjectClass:", error);
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
    fetchClasses,
    fetchArms,
    fetchClassArms,
    fetchStaff,
    fetchStaffSubjectClasses,
    registerStaffSubjectClass,
    updateStaffSubjectClass,
    deleteStaffSubjectClass,
  };
}