import { Permission } from '@/constants/permission-map';

export function has(userPermissions: number[], permission: Permission): boolean {
  return userPermissions.includes(15) || userPermissions.includes(permission);
}
