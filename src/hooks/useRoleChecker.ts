import { useAuth } from "@/hooks/useAuth";
import { ROLE_TOKENS } from "@/constants/roleTokens";

export function useRoleChecker() {
  const { user } = useAuth();

  const checkRole = (roleToken: string): boolean => {
    return !!user && "userRoleType" in user && user.userRoleType === roleToken;
  };

  return {
    isGuest: checkRole(ROLE_TOKENS.guest),
    isStaff: checkRole(ROLE_TOKENS.staff),
    isParent: checkRole(ROLE_TOKENS.parent),
    isSuperAdmin: checkRole(ROLE_TOKENS.superadmin),
    isAlumni: checkRole(ROLE_TOKENS.alumni),
    isStudent: checkRole(ROLE_TOKENS.student),
  };
}