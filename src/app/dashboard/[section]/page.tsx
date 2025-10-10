import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import { requireAuth, fetchUserData, fetchModulePermissions, hasSectionAccess } from '../../../utils/auth.utils';
import { initializeSectionConfig, getSectionByPath } from '../../../hooks/useRoleConfig';
import AdminSectionClient from '../../../components/AdminSectionClient';

export const metadata: Metadata = {
  title: 'Admin Section',
  description: 'Admin section page',
};

export default async function AdminSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const accessToken = (await requireAuth()) as string;


  const userData = await fetchUserData(accessToken);
  const modulePermissions = await fetchModulePermissions(accessToken);

  if (!userData) {
    console.warn('[AdminSectionPage] No user data, redirecting to login');
    redirect('/auth/user-login');
  }

  const sectionConfig = await initializeSectionConfig(accessToken);
  const { section } = await params;
  const sectionPath = `/dashboard/${section}`;

  // ✅ derive positionIds from userPositions
  const userPositionIds = userData.user.userPositions?.map((p) => p.positionId) ?? [];

  console.log('[AdminSectionPage] Access check:', {
    section,
    sectionPath,
    userPositionIds,
    modulePermissions,
    sectionConfig,
  });

  const sectionData = getSectionByPath(sectionPath, sectionConfig);
  console.log('[AdminSectionPage] sectionData:', sectionData);

  if (!sectionData) {
    console.warn('[AdminSectionPage] Section not found:', sectionPath);
    redirect('/not-found');
  }

  if (!hasSectionAccess(userPositionIds, sectionData.positions)) {
    console.warn('[AdminSectionPage] Access denied:', {
      userPositionIds,
      allowedPositionIds: sectionData.positions,
    });
    redirect('/access-denied');
  }

  return <AdminSectionClient section={section} user={userData.user} />;
}
