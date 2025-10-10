'use client';

import React from 'react';
import { Box } from '@mui/material';
import Sidebar from '@/components/Sidebar';
import Vote from '@/components/Vote';
import ViewStudents from '@/components/ViewStudents';
import ViewStaff from '@/components/ViewStaff';
import ViewDepartment from '@/components/ViewDepartment';
import ViewAdmin from '@/components/ViewAdmin';
import ViewGuest from '@/components/ViewGuest';
import PromoteStudents from '@/components/PromoteStudents';
import ClearedStudents from '@/components/ClearedStudents';
import ClearedStaff from '@/components/ClearedStaff';
import ClearedParents from '@/components/ClearedParents';
import ViewElection from '@/components/ViewElection';
import ClearStudents from '@/components/ClearStudents';
import ClearStaff from '@/components/ClearStaff';
import ViewParent from '@/components/ViewParent';
import ClearParent from '@/components/ClearParent';
import Attendance from '@/components/Attendance';
import StaffAttendance from '@/components/StaffAttendance';
import ViewArms from '@/components/ViewArms';
import ViewClass from '@/components/ViewClass';
import ViewClassArm from '@/components/ViewClassArm';
import SEO from '@/components/SEO';
import PageSettings from '@/components/PageSettings';
import TakeAssessment from '@/components/TakeAssessment';
import StartAssessment from '@/components/StartAssessment';
import ViewAssessment from '@/components/ViewAssessment';
import RegisterAssessment from '@/components/RegisterAssessment';
import ViewAssessmentType from '@/components/ViewAssessmentType';
import AssessmentResult from '@/components/AssessmentResult';
import ViewAssessmentOptions from '@/components/ViewAssessmentOptions';
import RecordAssessment from '@/components/RecordAssessment';
import Chats from '@/components/Chats';
import RegisterBiometric from '@/components/RegisterBiometric';
import QuestionPreview from '@/components/QuestionPreview';
import ENote from '@/components/ENote';
import AllocatePosition from '@/components/AllocatePosition';
import ViewPosition from '@/components/ViewPosition';
import AllocateUserPermission from '@/components/AllocateUserPermission';
import ViewForeignAffairs from '@/components/ViewForeignAffairs';
import ViewPermission from '@/components/ViewPermission';
import ViewENote from '@/components/ViewENote';
import ViewSubject from '@/components/ViewSubject';
import Score from '@/components/Score';
import ScoreSheet from '@/components/ScoreSheet';
import ApiKeys from '@/components/ApiKeys';
import EditBroadSheet from '@/components/EditBroadSheet';
import ViewBroadSheet from '@/components/ViewBroadSheet';
import EditReportSheet from '@/components/EditReportSheet';
import ViewReportsheet from '@/components/ViewReportsheet';
import Certificate from '@/components/Certificate';
import CreateCertificate from '@/components/CreateCertificate';
import StaffLessonNote from '@/components/StaffLessonNote';
import NewsBlog from '@/components/NewsBlog';
import Calendar from '@/components/Calendar';
import Library from '@/components/Library';
import NoticeBoard from '@/components/NoticeBoard';
import ViewParty from '@/components/ViewParty';
import ViewPost from '@/components/ViewPost';
import ViewPayment from '@/components/ViewPayment';
import Payroll from '@/components/Payroll';
import FinanceBroadsheet from '@/components/FinanceBroadsheet';
import ViewReceipts from '@/components/ViewReceipts';
import ViewIncome from '@/components/ViewIncome';
import CreatePersonalEtext from '@/components/CreatePersonalEtext';
import ViewExpenses from '@/components/ViewExpenses';
import ViewPartyCandidate from '@/components/ViewPartyCandidate';
import StudentReportView from '@/components/StudentReportView';
import StaffSubjectAllocation from '@/components/StaffSubjectAllocation';
import ClassSubjectAllocation from '@/components/ClassSubjectAllocation';
import DepartmentClassAllocation from '@/components/DepartmentClassAllocation';
import ElectionResults from '@/components/ElectionResults';
import ModuleManager from '@/components/ModuleManager';
import Role from '@/components/ViewRole';
import Session from '@/components/ViewSession';
import Term from '@/components/ViewTerm';
import Subscription from '@/components/ViewSubscription';
import { User } from '../types/user';

// Map section paths to components
const sectionComponents: Record<string, React.ComponentType> = {
  'vote': Vote,
  'registerbiometric': RegisterBiometric,
  'view-student': ViewStudents,
  'view-staff': ViewStaff,
  'viewdepartment': ViewDepartment,
  'view-admin': ViewAdmin,
  'view-guest': ViewGuest,
  'promotestudents': PromoteStudents,
  'clearstudents': ClearStudents,
  'clearstaff': ClearStaff,
  'view-parent': ViewParent,
  'clearparents': ClearParent,
  'clearedstudents': ClearedStudents,
  'clearedstaff': ClearedStaff,
  'clearedparents': ClearedParents,
  'editbroadsheet': EditBroadSheet,
  'viewbroadsheet': ViewBroadSheet,
  'attendance': Attendance,
  'staffattendance': StaffAttendance,
  'viewclass': ViewClass,
  'viewclassarm': ViewClassArm,
  'viewarms': ViewArms,
  'viewpermission': ViewPermission,
  'allocateuserpermission': AllocateUserPermission,
  'seo': SEO,
  'electionresults': ElectionResults,
  'createpersonalnote': CreatePersonalEtext,
  'module': ModuleManager,
  'role': Role,
  'session': Session,
  'term': Term,
  'subscription': Subscription,
  'apikeys': ApiKeys,
  'pagesettings': PageSettings,
  'registerquestion': RegisterAssessment,
  'questionpreview': QuestionPreview,
  'takeassessment': TakeAssessment,
  'startassessment': StartAssessment,
  'viewassessment': ViewAssessment,
  'assessmentresult': AssessmentResult,
  'viewassessmenttype': ViewAssessmentType,
  'viewassessmentoptions': ViewAssessmentOptions,
  'recordassessment': RecordAssessment,
  'chat': Chats,
  'enote': ENote,
  'payroll': Payroll,
  'financebroadsheet': FinanceBroadsheet,
  'viewreceipts': ViewReceipts,
  'viewincome': ViewIncome,
  'viewexpenses': ViewExpenses,
  'viewpayment': ViewPayment,
  'viewenote': ViewENote,
  'viewsubject': ViewSubject,
  'score': Score,
  'viewforeignaffairs': ViewForeignAffairs,
  'scoresheet': ScoreSheet,
  'viewreportsheet': ViewReportsheet,
  'editreportsheet': EditReportSheet,
  'certificate': Certificate,
  'createcertificate': CreateCertificate,
  'library': Library,
  'calendar': Calendar,
  'noticeboard': NoticeBoard,
  'allocateposition': AllocatePosition,
  'viewposition': ViewPosition,
  'newsblog': NewsBlog,
  'viewelection': ViewElection,
  'viewparty': ViewParty,
  'viewpost': ViewPost,
  'stafflessonnote': StaffLessonNote,
  'viewpartycandidate': ViewPartyCandidate,
  'studentreportview': StudentReportView,
  'staffsubjectallocation' : StaffSubjectAllocation,
  'classsubjectallocation' : ClassSubjectAllocation,
  'departmentclassallocation' : DepartmentClassAllocation,
};

interface AdminSectionClientProps {
  section: string;
  user: User;
}

export default function AdminSectionClient({ section }: AdminSectionClientProps) {
  const Component = sectionComponents[section.toLowerCase()];
  if (!Component) {
    return (
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar />
        <Box sx={{ p: 3 }}>
          <h1>Section Not Found</h1>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <Component />
    </Box>
  );
}