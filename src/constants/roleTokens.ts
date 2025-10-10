export const ROLE_TOKENS = {
  guest: process.env.NEXT_PUBLIC_GUEST_ROLE_TOKEN || "",
  student: process.env.NEXT_PUBLIC_STUDENT_ROLE_TOKEN || "",
  alumni: process.env.NEXT_PUBLIC_ALUMNI_ROLE_TOKEN || "",
  staff: process.env.NEXT_PUBLIC_STAFF_ROLE_TOKEN || "",
  parent: process.env.NEXT_PUBLIC_PARENT_ROLE_TOKEN || "",
  superadmin: process.env.NEXT_PUBLIC_SUPERADMIN_ROLE_TOKEN || "",

  assign_student: process.env.NEXT_PUBLIC_STUDENT_ASSIGN_TOKEN || "",
  assign_staff: process.env.NEXT_PUBLIC_STAFF_ASSIGN_TOKEN || "",
  assign_parent: process.env.NEXT_PUBLIC_PARENT_ASSIGN_TOKEN || "",

  guest_role_id: process.env.NEXT_PUBLIC_GUEST_DB_ROLE_ID || "",
  student_role_id: process.env.NEXT_PUBLIC_STUDENT_DB_ROLE_ID || "",
  alumni_role_id: process.env.NEXT_PUBLIC_ALUMNI_DB_ROLE_ID || "",
  staff_role_id: process.env.NEXT_PUBLIC_STAFF_DB_ROLE_ID || "",
  parent_role_id: process.env.NEXT_PUBLIC_PARENT_DB_ROLE_ID || "",
  superadmin_role_id: process.env.NEXT_PUBLIC_SUPERADMIN_DB_ROLE_ID || "",
} as const;

export type RoleTokenValue = typeof ROLE_TOKENS[keyof typeof ROLE_TOKENS];

export type RoleTokenKey = keyof typeof ROLE_TOKENS;