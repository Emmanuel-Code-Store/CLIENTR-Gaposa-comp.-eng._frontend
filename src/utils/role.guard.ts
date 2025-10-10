/**
 * Accepts any number of boolean role flags and returns true if ANY of them is true.
 */
export function frontendRoleGuard(...roles: boolean[]): boolean {
  return roles.some(Boolean);
}
