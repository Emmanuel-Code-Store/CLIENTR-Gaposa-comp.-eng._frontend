export interface CandidatePartyPost {
  id: number;
  title: string;
  [key: string]: unknown;
}

export interface UserPosition {
  positionId: number;
  name: string;
  [key: string]: unknown;
}

export interface UserPermission {
  id: number;
  module_path: string;
  allowed_position_ids: number[];
  [key: string]: unknown;
}

export interface CreatedSetting {
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

  permissions?: string[];
}
