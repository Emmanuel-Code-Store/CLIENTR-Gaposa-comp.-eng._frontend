import { useEffect, useState } from "react";

// Fallback permissions map
const FALLBACK_PERMISSIONS = {
  CREATE_ASSESSMENT: 1,
  MANAGE_ASSESSMENT: 2,
  VIEW_ASSESSMENT: 3,
  DELETE_ASSESSMENT: 4,
  CREATE_ASSESSMENT_SUBMISSION: 5,
  MANAGE_ASSESSMENT_SUBMISSION: 6,
  VIEW_ASSESSMENT_SUBMISSION: 7,
  DELETE_ASSESSMENT_SUBMISSION: 8,
  CREATE_ASSESSMENT_TYPE: 9,
  MANAGE_ASSESSMENT_TYPE: 10,
  VIEW_ASSESSMENT_TYPE: 11,
  DELETE_ASSESSMENT_TYPE: 12,
  VIEW_REPORTS: 13,
  MANAGE_LESSON_NOTES: 14,
  WILDCARD: 15,
  CREATE_USER: 16,
  VIEW_USER: 17,
  MANAGE_USER: 18,
  DELETE_USER: 19,
  CREATE_ROLE: 20,
  VIEW_ROLE: 21,
  MANAGE_ROLE: 22,
  DELETE_ROLE: 23,
  CREATE_SESSION: 24,
  VIEW_SESSION: 25,
  MANAGE_SESSION: 26,
  DELETE_SESSION: 27,
  CREATE_TERM: 28,
  VIEW_TERM: 29,
  MANAGE_TERM: 30,
  DELETE_TERM: 31,
  CREATE_CLASS_ARM: 32,
  VIEW_CLASS_ARM: 33,
  MANAGE_CLASS_ARM: 34,
  DELETE_CLASS_ARM: 35,
  CREATE_SUBJECT: 36,
  VIEW_SUBJECT: 37,
  MANAGE_SUBJECT: 38,
  DELETE_SUBJECT: 39,
  CREATE_LESSON_NOTE: 40,
  VIEW_LESSON_NOTE: 41,
  MANAGE_LESSON_NOTE: 42,
  DELETE_LESSON_NOTE: 43,
  CREATE_ATTENDANCE: 44,
  VIEW_ATTENDANCE: 45,
  MANAGE_ATTENDANCE: 46,
  DELETE_ATTENDANCE: 47,
  CREATE_REPORT: 48,
  VIEW_REPORT: 49,
  MANAGE_REPORT: 50,
  DELETE_REPORT: 51,
  CREATE_PERMISSION: 52,
  VIEW_PERMISSION: 53,
  MANAGE_PERMISSION: 54,
  DELETE_PERMISSION: 55,
  CREATE_QUESTION: 56,
  VIEW_QUESTION: 57,
  MANAGE_QUESTION: 58,
  DELETE_QUESTION: 59,
  CREATE_SETTINGS: 60,
  VIEW_SETTINGS: 61,
  MANAGE_SETTINGS: 62,
  DELETE_SETTINGS: 63,
  CREATE_DEPARTMENT: 64,
  VIEW_DEPARTMENT: 65,
  MANAGE_DEPARTMENT: 66,
  DELETE_DEPARTMENT: 67,
  CREATE_CLASS_SUBJECT: 68,
  VIEW_CLASS_SUBJECT: 69,
  MANAGE_CLASS_SUBJECT: 70,
  DELETE_CLASS_SUBJECT: 71,
  CREATE_CLASS_ATTENDANCE: 72,
  VIEW_CLASS_ATTENDANCE: 73,
  MANAGE_CLASS_ATTENDANCE: 74,
  CREATE_STAFF_ATTENDANCE: 75,
  VIEW_STAFF_ATTENDANCE: 76,
  MANAGE_STAFF_ATTENDANCE: 77,
  CREATE_PAYMENT: 78,
  VIEW_PAYMENT: 79,
  CREATE_MODULES: 80,
  VIEW_MODULES: 81,
  MANAGE_MODULES: 82,
  DELETE_MODULES: 83,
  CREATE_STAFF_SUBJECT_CLASS: 84,
  VIEW_STAFF_SUBJECT_CLASS: 85,
  MANAGE_STAFF_SUBJECT_CLASS: 86,
  DELETE_STAFF_SUBJECT_CLASS: 87,
  CREATE_NEWS_BLOG: 88,
  VIEW_NEWS_BLOG: 89,
  MANAGE_NEWS_BLOG: 90,
  DELETE_NEWS_BLOG: 91,
  CREATE_ARM: 92,
  VIEW_ARM: 93,
  MANAGE_ARM: 94,
  DELETE_ARM: 95,
  CREATE_CLASS: 96,
  VIEW_CLASS: 97,
  MANAGE_CLASS: 98,
  DELETE_CLASS: 99,
  CREATE_ENOTE: 100,
  VIEW_ENOTE: 101,
  MANAGE_ENOTE: 102,
  DELETE_ENOTE: 103,
  CREATE_FOREIGN_AFFAIRS: 104,
  VIEW_FOREIGN_AFFAIRS: 105,
  MANAGE_FOREIGN_AFFAIRS: 106,
  DELETE_FOREIGN_AFFAIRS: 107,
  CREATE_RESULTS: 108,
  VIEW_RESULTS: 109,
  MANAGE_RESULTS: 110,
  DELETE_RESULTS: 111,
  CREATE_JOBS: 112,
  VIEW_JOBS: 113,
  MANAGE_JOBS: 114,
  DELETE_JOBS: 115,
  CREATE_JOB_STATUS: 116,
  VIEW_JOB_STATUS: 117,
  MANAGE_JOB_STATUS: 118,
  DELETE_JOB_STATUS: 119,
  CREATE_QUESTION_OPTIONS: 120,
  VIEW_QUESTION_OPTIONS: 121,
  MANAGE_QUESTION_OPTIONS: 122,
  DELETE_QUESTION_OPTIONS: 123,
  CREATE_CHATS: 124,
  VIEW_CHATS: 125,
  MANAGE_CHATS: 126,
  VIEW_PERSONAL_PROFILE: 127,
  CREATE_VOTE: 128,
  MANAGE_VOTE: 129,
  VIEW_VOTE: 130,
  DELETE_VOTE: 131,

  // ELECTION permissions
  CREATE_ELECTION: 132,
  MANAGE_ELECTION: 133,
  VIEW_ELECTION: 134,
  DELETE_ELECTION: 135,

  // PARTY permissions
  CREATE_PARTY: 136,
  MANAGE_PARTY: 137,
  VIEW_PARTY: 138,
  DELETE_PARTY: 139,

  // ELECTION_POST permissions
  CREATE_ELECTION_POST: 140,
  MANAGE_ELECTION_POST: 141,
  VIEW_ELECTION_POST: 142,
  DELETE_ELECTION_POST: 143,

  // PARTY_CANDIDATE permissions
  CREATE_PARTY_CANDIDATE: 144,
  MANAGE_PARTY_CANDIDATE: 145,
  VIEW_PARTY_CANDIDATE: 146,
  DELETE_PARTY_CANDIDATE: 147,
} as const;

interface PermissionData {
  id: number;
  name: string;
  permission_id: string;
  description: string;
  created_by: number;
  createdAt: string;
  updatedAt: string;
}

export function usePermissions() {
  const [permissions, setPermissions] =
    useState<Record<string, number>>(FALLBACK_PERMISSIONS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPermissions() {
      try {
        setLoading(true);
        const response = await fetch("/api/permission", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch permissions: ${response.status}`);
        }

        const { permissions }: { permissions: PermissionData[] } =
          await response.json();

        const dynamicPermissions = permissions.reduce((acc, perm) => {
          const key = perm.name
            .replace(/-/g, "_")
            .replace(/&/g, "_")
            .toUpperCase();
          acc[key] = perm.id;
          return acc;
        }, {} as Record<string, number>);

        console.log("[usePermissions] Loaded:", dynamicPermissions);

        setPermissions(dynamicPermissions);
      } catch (err) {
        console.error("Error fetching permissions:", err);
        setError("Failed to load permissions, using fallback");
        setPermissions(FALLBACK_PERMISSIONS);
      } finally {
        setLoading(false);
      }
    }

    fetchPermissions();
  }, []);

  return { permissions, loading, error };
}

export type Permission = number;