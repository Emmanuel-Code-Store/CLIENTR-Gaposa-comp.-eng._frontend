"use client";

import { useEffect, useState } from "react";
import { from, Observable } from "rxjs";
import { ROLE_TOKENS } from "@/constants/roleTokens";

interface CandidatePartyPost {
  id: number;
  title: string;
  [key: string]: unknown; 
}

export interface UserPosition {
  positionId: number;
  name: string;
  [key: string]: unknown; 
}

interface UserPermission {
  id: number;
  module_path: string;
  allowed_position_ids: number[];
  [key: string]: unknown; 
}

interface CreatedSetting {
  id: number;
  key: string;
  value: string;
  [key: string]: unknown; 
}

export interface User {
  userId: string;
  email: string | null;
  fullname: string | null;
  roleId: number;
  roleName: string;
  avatar: string | null;
  phone: string | null;
  address: string | null;
  isActive: boolean;
  registered: boolean;
  studentId: string | null;
  staffId: string | null;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
  role: { role_name: string };
  candidatePartyPosts: CandidatePartyPost[];
  userPositions: UserPosition[];
  userPermissions: UserPermission[];
  createdSettings: CreatedSetting[];
}

interface SignupData {
  role_id: string;
  [key: string]: string | number | File | undefined;
}

interface UseUsers {
  user: User | null;
  loading: boolean;
  error: Error | null;
  usersByPosition: { [positionName: string]: User[] };
  isFetchingUsers: boolean;
  usersFetchError: string | null;
  fetchUsersByPositionName: (positionName: string) => void;
  assignUserIds: (
    type:
      | typeof ROLE_TOKENS.assign_staff
      | typeof ROLE_TOKENS.assign_student
      | typeof ROLE_TOKENS.assign_parent,
    userIds: string[]
  ) => Promise<{ message: string; success: boolean }>;
  signup: (data: SignupData) => Observable<{ message: string; user?: User }>;
  fetchUsersByRole_IdType: (
    roleToken: string,
    userTypeQuery: string,
    userType: string
  ) => Promise<User[]>;
  fetchStaffCleared: () => Promise<User[]>;
  fetchStudentCleared: () => Promise<User[]>;
  fetchParentCleared: () => Promise<User[]>;
  fetchAlumniCleared: () => Promise<User[]>;
  fetchStaffClear: () => Promise<User[]>;
  fetchStudentClear: () => Promise<User[]>;
  fetchParentClear: () => Promise<User[]>;
  fetchAlumniClear: () => Promise<User[]>;
  fetchStaff: () => Observable<User[]>;
  fetchStudent: () => Observable<User[]>;
  fetchParent: () => Observable<User[]>;
  fetchAlumni: () => Observable<User[]>;
  fetchAllUsers: () => Promise<User[]>;
  fetchUserById: (userId: string) => Observable<User>;
  updateUser: (userId: string, payload: Partial<User>) => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
  otpSent: boolean;
  sendOtp: (voterId: string) => Promise<boolean>;
  verified: boolean;
  verifyPin: (userId: string, inputPin: string) => Promise<void>;
  createAssessmentOption: (payload: {
    [key: string]: string | number | boolean;
  }) => Promise<{ id: number; message: string }>;
  getUserPermissions: () => Promise<number[]>;
}

export function useUser(userId?: string): UseUsers {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [usersByPosition, setUsersByPosition] = useState<{
    [positionName: string]: User[];
  }>({});
  const [isFetchingUsers, setIsFetchingUsers] = useState(false);
  const [usersFetchError, setUsersFetchError] = useState<string | null>(null);
  const [otpSent, setOtpSent] = useState(false);

  // useEffect(() => {
  //   if (userId) {
  //     fetchUserById(userId).subscribe({
  //       next: setUser,
  //       error: (err) => setError(err),
  //     });
  //   }
  // }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchUserById(userId).subscribe({
        next: setUser,
        error: (err) => setError(err),
      });
    }
  }, []);

  const fetchUserById = (userId: string): Observable<User> => {
    return from(
      (async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch(`/api/user/${userId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });

          const responseData = await res.json();

          if (!res.ok || typeof responseData.user !== "object") {
            throw new Error(responseData.message || "Failed to fetch user");
          }

          return responseData.user as User;
        } catch (err: unknown) {
          const error = err instanceof Error ? err : new Error("Unknown error");
          setError(error);
          throw error;
        } finally {
          setLoading(false);
        }
      })()
    );
  };

  const signup = (
    data: SignupData
  ): Observable<{ message: string; user?: User }> => {
    return from(
      (async () => {
        setLoading(true);
        setError(null);
        try {
          const formData = new FormData();
          for (const key in data) {
            if (data[key] !== undefined) {
              formData.append(key, String(data[key]));
            }
          }

          const res = await fetch("/api/auth/signup", {
            method: "POST",
            body: formData,
            credentials: "include",
          });

          const responseData = await res.json();

          if (!res.ok) {
            throw new Error(responseData.message || "Signup failed");
          }

          return responseData;
        } catch (err: unknown) {
          const error = err instanceof Error ? err : new Error("Unknown error");
          setError(error);
          throw error;
        } finally {
          setLoading(false);
        }
      })()
    );
  };

  const fetchUsersByRole_IdType = async (
    roleToken: string,
    userTypeQuery: string,
    userType: string
  ): Promise<User[]> => {
    setIsFetchingUsers(true);
    setUsersFetchError(null);

    try {
      const res = await fetch(
        `/api/user/search?role_token=${encodeURIComponent(
          roleToken
        )}&${encodeURIComponent(userTypeQuery)}=${encodeURIComponent(
          userType
        )}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      const data = await res.json();

      if (res.status !== 200 || !Array.isArray(data.users)) {
        throw new Error(data.message || "Failed to fetch users");
      }

      return data.users.map((user: User) => ({
        userId: user.userId,
        email: user.email,
        fullname: user.fullname,
        roleName: user.roleName,
        avatar: user.avatar,
        phone: user.phone,
        address: user.address,
        isActive: user.isActive,
        registered: user.registered,
        studentId: user.studentId,
        staffId: user.staffId,
        parentId: user.parentId,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        role: user.role,
        candidatePartyPosts: user.candidatePartyPosts,
        userPositions: user.userPositions,
        userPermissions: user.userPermissions,
        createdSettings: user.createdSettings,
      }));
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unknown error occurred";
      setUsersFetchError(message);
      return [];
    } finally {
      setIsFetchingUsers(false);
    }
  };

  const fetchUsersByPositionName = (positionName: string) => {
    const normalized = positionName.toLowerCase();
    setIsFetchingUsers(true);
    setUsersFetchError(null);

    fetch(`/api/user/search?query=${encodeURIComponent(normalized)}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => res.json().then((data) => ({ status: res.status, data })))
      .then(({ status, data }) => {
        if (status !== 200 || !Array.isArray(data.users)) {
          throw new Error(data.message || "Failed to fetch users");
        }

        setUsersByPosition((prev) => ({
          ...prev,
          [normalized]: data.users,
        }));
      })
      .catch((err) => {
        const message =
          err instanceof Error ? err.message : "Unknown error occurred";
        setUsersFetchError(message);
      })
      .finally(() => {
        setIsFetchingUsers(false);
      });
  };

  const assignUserIds = async (
    type:
      | typeof ROLE_TOKENS.assign_staff
      | typeof ROLE_TOKENS.assign_student
      | typeof ROLE_TOKENS.assign_parent,
    userIds: string[]
  ): Promise<{ message: string; success: boolean }> => {
    setLoading(true);
    setError(null);
    try {
      const cleanIds = Array.isArray(userIds)
        ? userIds.map((i) => String(i).trim()).filter(Boolean)
        : [];
      if (cleanIds.length === 0) {
        throw new Error("No valid userIds provided");
      }

      const res = await fetch(`/api/user/assign-ids`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ type, userIds: cleanIds }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to assign IDs");
      }

      return data;
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const fetchByRoleId = (roleIdStr: string): Observable<User[]> => {
    return from(
      (async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch(`/api/user?roleId=${roleIdStr}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          });

          const responseData = await res.json();

          if (!res.ok || !Array.isArray(responseData.users)) {
            throw new Error(responseData.message || "Failed to fetch users");
          }

          return responseData.users;
        } catch (err: unknown) {
          const error = err instanceof Error ? err : new Error("Unknown error");
          setError(error);
          throw error;
        } finally {
          setLoading(false);
        }
      })()
    );
  };

  const updateUser = async (
    userId: string,
    payload: Partial<User>
  ): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/user/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to update user");
      }
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/user/${userId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to delete user");
      }
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const fetchAllUsers = async (): Promise<User[]> => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/user/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const responseData = await res.json();

      if (!res.ok || !Array.isArray(responseData.users)) {
        throw new Error(responseData.message || "Failed to fetch users");
      }

      console.log("users: ", responseData);
      return responseData.users;
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const sendOtp = async (voterId: string): Promise<boolean> => {
    setLoading(true);
    try {
      const res = await fetch(`/api/user/send-pin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: voterId }),
      });

      console.log(voterId);

      if (!res.ok) {
        throw new Error("Error sending OTP. Please try again.");
      }

      setOtpSent(true);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
      return false;
    } finally {
      setLoading(false);
    }
  };

  const verifyPin = async (userId: string, inputPin: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/user/verify-pin/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputPin }),
      });

      if (!response.ok) {
        throw new Error("Failed to verify PIN");
      }

      const data = await response.json();
      setVerified(data.verified);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred")
      );
    } finally {
      setLoading(false);
    }
  };

  const createAssessmentOption = async (payload: {
    [key: string]: string | number | boolean;
  }): Promise<{ id: number; message: string }> => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/assessment/option", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create assessment option");
      }

      return data;
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getUserPermissions = async (): Promise<number[]> => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/user/userPermission", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await res.json();
      console.log("Fetched permissions (raw):", data);

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch user permissions");
      }

      const normalized = Array.isArray(data.permissions)
        ? data.permissions
        : [];
      console.log("Normalized permissions:", normalized);

      return normalized;
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const fetchUsersIdTypes = async (
    roleToken: string,
    userTypeQuery: string,
    type: string
  ) => fetchUsersByRole_IdType(roleToken, userTypeQuery, type);

  const fetchStaffCleared = () =>
    fetchUsersIdTypes(ROLE_TOKENS.staff, "userIdType", "staff");
  const fetchStudentCleared = () =>
    fetchUsersIdTypes(ROLE_TOKENS.student, "userIdType", "student");
  const fetchParentCleared = () =>
    fetchUsersIdTypes(ROLE_TOKENS.parent, "userIdType", "parent");
  const fetchAlumniCleared = () =>
    fetchUsersIdTypes(ROLE_TOKENS.alumni, "userIdType", "alumni");

  const fetchStaffClear = () =>
    fetchUsersIdTypes(ROLE_TOKENS.staff, "noUserIdType", "staff");
  const fetchStudentClear = () =>
    fetchUsersIdTypes(ROLE_TOKENS.student, "noUserIdType", "student");
  const fetchParentClear = () =>
    fetchUsersIdTypes(ROLE_TOKENS.parent, "noUserIdType", "parent");
  const fetchAlumniClear = () =>
    fetchUsersIdTypes(ROLE_TOKENS.alumni, "noUserIdType", "alumni");

  return {
    user,
    loading,
    error,
    usersByPosition,
    isFetchingUsers,
    usersFetchError,
    fetchUsersByPositionName,
    assignUserIds,
    signup,
    fetchAllUsers,
    fetchUsersByRole_IdType,
    fetchStaff: () => fetchByRoleId(ROLE_TOKENS.staff),
    fetchStudent: () => fetchByRoleId(ROLE_TOKENS.student),
    fetchParent: () => fetchByRoleId(ROLE_TOKENS.parent),
    fetchAlumni: () => fetchByRoleId(ROLE_TOKENS.alumni),
    fetchStaffCleared,
    fetchStudentCleared,
    fetchParentCleared,
    fetchAlumniCleared,
    fetchStaffClear,
    fetchStudentClear,
    fetchParentClear,
    fetchAlumniClear,
    fetchUserById,
    updateUser,
    deleteUser,
    otpSent,
    sendOtp,
    verified,
    verifyPin,
    createAssessmentOption,
    getUserPermissions,
  };
}