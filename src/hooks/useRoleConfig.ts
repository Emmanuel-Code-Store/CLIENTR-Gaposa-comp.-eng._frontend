export interface SectionConfig {
  path: string;
  positions: number[];
}

export interface ModulePermission {
  id: number;
  module_path: string;
  allowed_position_ids: number[];
  createdAt: string;
  updatedAt: string;
}

export const baseSectionConfig: Omit<SectionConfig, 'positions'>[] = [
  { path: '/dashboard/vote' },
  { path: '/dashboard/registerbiometric' },
  { path: '/dashboard/view-student' },
  { path: '/dashboard/view-staff' },
  { path: '/dashboard/view-parent' },
  { path: '/dashboard/view-admin' },
  { path: '/dashboard/view-guest' },
  { path: '/dashboard/promotestudents' },
  { path: '/dashboard/clearstudents' },
  { path: '/dashboard/clearstaff' },
  { path: '/dashboard/clearparents' },
  { path: '/dashboard/clearedstudents' },
  { path: '/dashboard/clearedstaff' },
  { path: '/dashboard/clearedparents' },
  { path: '/dashboard/groupbroadsheet' },
  { path: '/dashboard/attendance' },
  { path: '/dashboard/staffattendance' },
  { path: '/dashboard/viewdepartment' },
  { path: '/dashboard/viewarms' },
  { path: '/dashboard/viewclass' },
  { path: '/dashboard/viewclassarm' },
  { path: '/dashboard/seo' },
  { path: '/dashboard/apikeys' },
  { path: '/dashboard/pagesettings' },
  { path: '/dashboard/registerassessment' },
  { path: '/dashboard/takeassessment' },
  { path: '/dashboard/startassessment' },
  { path: '/dashboard/viewassessment' },
  { path: '/dashboard/assessmentresult' },
  { path: '/dashboard/registerquestion' },
  { path: '/dashboard/questionpreview' },
  { path: '/dashboard/viewassessmenttype' },
  { path: '/dashboard/viewassessmentoptions' },
  { path: '/dashboard/recordassessment' },
  { path: '/dashboard/chat' },
  { path: '/dashboard/questionpreview' },
  { path: '/dashboard/enote' },
  { path: '/dashboard/viewenote' },
  { path: '/dashboard/stafflessonnote' },
  { path: '/dashboard/createpersonalnote' },
  { path: '/dashboard/electionresults' },
  { path: '/dashboard/userprofile' },
  { path: '/dashboard/productcategory' },
  { path: '/dashboard/viewproduct' },
  { path: '/dashboard/viewposition' },
  { path: '/dashboard/allocateposition' },
  { path: '/dashboard/viewpermission' },
  { path: '/dashboard/allocateuserpermission' },
  { path: '/dashboard/viewforeignaffairs' },
  { path: '/dashboard/module' },
  { path: '/dashboard/role' },
  { path: '/dashboard/session' },
  { path: '/dashboard/term' },
  { path: '/dashboard/subscription' },
  { path: '/dashboard/subscription' },
  { path: '/dashboard/viewsubject' },
  { path: '/dashboard/score' },
  { path: '/dashboard/scoresheet' },
  { path: '/dashboard/viewbroadsheet' },
  { path: '/dashboard/editbroadsheet' },
  { path: '/dashboard/groupbroadsheet' },
  { path: '/dashboard/viewreportsheet' },
  { path: '/dashboard/editreportsheet' },
  { path: '/dashboard/certificate' },
  { path: '/dashboard/createcertificate' },
  { path: '/dashboard/newsblog' },
  { path: '/dashboard/viewforeignaffairs' },
  { path: '/dashboard/viewelection' },
  { path: '/dashboard/viewparty' },
  { path: '/dashboard/viewpost' },
  { path: '/dashboard/viewposition' },
  { path: '/dashboard/allocateposition' },
  { path: '/dashboard/viewpayment' },
  { path: '/dashboard/viewpermission' },
  { path: '/dashboard/allocateuserpermission' },
  { path: '/dashboard/payroll' },
  { path: '/dashboard/viewincome' },
  { path: '/dashboard/financebroadsheet' },
  { path: '/dashboard/viewreceipts' },
  { path: '/dashboard/viewexpenses' },
  { path: '/dashboard/noticeboard' },
  { path: '/dashboard/library' },
  { path: '/dashboard/calendar' },
  { path: '/dashboard/classsubjectallocation' },
  { path: '/dashboard/viewpartycandidate' },
  { path: '/dashboard/studentreportview' },
  { path: '/dashboard/staffsubjectallocation' },
  { path: '/dashboard/departmentclassallocation' },
];

export async function initializeSectionConfig(accessToken: string): Promise<SectionConfig[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || ''}/api/module-access`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'Cookie': `access_token=${accessToken}`,
      },
      credentials: 'include',
    });

    const data = await response.json();
    console.log('[roleConfig] /api/module-access response:', {
      status: response.status,
      data,
    });

    if (!response.ok || !Array.isArray(data)) {
      console.warn('[roleConfig] Failed to fetch module permissions:', data.message);
      return baseSectionConfig.map((section) => ({ ...section, positions: [] }));
    }

    const modulePermissions = data as ModulePermission[];
    console.log('[roleConfig] Module permissions:', modulePermissions);

    return baseSectionConfig.map((baseSection) => {
      const modulePath = baseSection.path.replace('/dashboard/', '');
      const permission = modulePermissions.find((mp) => mp.module_path === modulePath);
      let positions: number[] = [];

      if (permission && permission.allowed_position_ids) {
        if (typeof permission.allowed_position_ids === 'string') {
          try {
            positions = JSON.parse(permission.allowed_position_ids);
            if (!Array.isArray(positions)) {
              positions = [];
            }
          } catch (e) {
            console.warn(`${e}  ,[roleConfig] Failed to parse positions:`, permission.allowed_position_ids);
            positions = [];
          }
        } else {
          positions = permission.allowed_position_ids;
        }
      }

      console.log('[roleConfig] Section config:', {
        path: baseSection.path,
        modulePath,
        positions,
      });

      return {
        ...baseSection,
        positions,
      };
    });
  } catch (error) {
    console.error('[roleConfig] Error initializing section config:', error);
    return baseSectionConfig.map((section) => ({ ...section, positions: [] }));
  }
}

export function getAllowedSections(positionIds: number[] | undefined, sectionConfig: SectionConfig[]): SectionConfig[] {
  if (!positionIds || positionIds.length === 0) {
    console.warn('[roleConfig] No position IDs provided');
    return [];
  }
  return sectionConfig.filter((section) =>
    section.positions.some((posId) => positionIds.includes(posId))
  );
}

export function getSectionByPath(path: string, sectionConfig: SectionConfig[]): SectionConfig | undefined {
  console.log('[roleConfig] getSectionByPath:', { path, sectionConfig });
  const section = sectionConfig.find((s) => s.path.toLowerCase() === path.toLowerCase());
  console.log('[roleConfig] getSectionByPath result:', section);
  return section;
}