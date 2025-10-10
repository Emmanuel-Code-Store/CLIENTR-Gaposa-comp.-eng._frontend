export interface User {
  userId: string;
  email: string;
  fullname: string;
  role: string;
}

export type Role = "student" | "staff" | "admin" | "superadmin";
