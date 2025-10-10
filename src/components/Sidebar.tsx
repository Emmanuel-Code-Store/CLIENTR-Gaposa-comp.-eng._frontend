"use client";

import React, { useEffect, useState, FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { useRoleChecker } from "@/hooks/useRoleChecker";
import { frontendRoleGuard } from "@/utils/role.guard";
import { usePermissions } from "@/constants/permission-map";
import { has } from "@/utils/permissions";
import {
  Box,
  Typography,
  List,
  ListItemIcon,
  ListItemText,
  Drawer,
  ListItem,
  IconButton,
  Collapse,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  useTheme,
  Tooltip,
} from "@mui/material";
import {
  Home,
  BookOpen,
  Users,
  ChevronDown,
  ChevronRight,
  Search,
  Eye,
  Settings,
  Pencil,
  Network,
  ClipboardCheck,
  ClipboardPenLine,
  Star,
  Building,
  Tag,
  BookOpen as Chalkboard,
  NotebookText,
  ClipboardEdit,
  MessageCircleCode,
  CalendarCheck,
  UserCheck,
  KeyRound,
  TrendingUpDown,
  Vote,
  Fingerprint,
  FileText,
  BookOpenText,
  FileSpreadsheet,
  FileBarChart,
  ClipboardList,
  Wallet,
  Award,
  Newspaper as NewspaperIcon,
  StickyNote,
  Calendar,
  UserCog,
  ShieldCheck,
  Globe,
  CreditCard,
  CalendarRange,
  TimerReset,
  Boxes,
} from "lucide-react";
import { styled } from "@mui/material/styles";
import AdminRegistrationDialog from "@/components/AdminRegistrationDialog";
import StudentRegistrationDialog from "@/components/StudentRegistrationDialog";
import StaffRegistrationDialog from "@/components/StaffRegistrationDialog";
import ParentRegistrationDialog from "@/components/ParentRegistrationDialog";
import NewsRegistrationDialog from "@/components/NewsRegistrationDialog";
import PermissionRegistrationDialog from "@/components/PermissionRegistrationDialog";
import DepartmentRegistrationDialog from "@/components/DepartmentRegistrationDialog";
import ArmsRegistrationDialog from "@/components/ArmsRegistrationDialog";
import ClassRegistrationDialog from "@/components/ClassRegistrationDialog";
import ClassArmRegistrationDialog from "@/components/ClassArmRegistrationDialog";
import AssessmentTypeRegistrationDialog from "@/components/AssessmentTypeRegistrationDialog";
import AssessmentOptionsRegistrationDialog from "@/components/AssessmentOptionsRegistrationDialog";
import AssessmentRegistrationDialog from "@/components/AssessmentRegistrationDialog";
import PartyRegistrationDialog from "@/components/PartyRegistrationDialog";
import ForeignAffairsRegistrationDialog from "@/components/ForeignAffairsRegistrationDialog";
import PartyCandidateRegistrationDialog from "@/components/PartyCandidateRegistrationDialog";
import SubjectRegistrationDialog from "@/components/SubjectRegistrationDialog";
import ElectionRegistrationDialog from "@/components/ElectionRegistrationDialog";
import PositionRegistrationDialog from "@/components/PositionRegistrationDialog";
import ModuleRegistrationDialog from "@/components/ModuleRegistrationDialog";
import RoleRegistrationDialog from "@/components/RoleRegistrationDialog";
import SessionRegistrationDialog from "@/components/SessionRegistrationDialog";
import TermRegistrationDialog from "@/components/TermRegistrationDialog";
import SubscriptionRegistrationDialog from "@/components/SubscriptionRegistrationDialog";
import PostRegistrationDialog from "@/components/PostRegistrationDialog";
import MedicalRegistrationDialog from "@/components/MedicalRegistrationDialog";
import LibraryRegistrationDialog from "@/components/LibraryRegistrationDialog";
import CalendarRegistrationDialog from "@/components/CalendarRegistrationDialog";
import StatusRegistrationDialog from "@/components/StatusRegistrationDialog";
import LiveStreamRegistrationDialog from "@/components/LiveStreamRegistrationDialog";
import SocialMediaRegistrationDialog from "@/components/SocialMediaRegistrationDialog";

interface GenericDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
}

const GenericDialog: FC<GenericDialogProps> = ({ open, onClose, title }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <Typography>Placeholder dialog for {title}. Implement the form here.</Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button onClick={onClose} variant="contained">Submit</Button>
    </DialogActions>
  </Dialog>
);

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: 240,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: 240,
    backgroundColor: "#0D0F29",
    color: "white",
    overflow: "hidden",
    height: "100vh",
    [theme.breakpoints.down(900)]: {
      width: 60,
    },
  },
  [theme.breakpoints.down(900)]: {
    width: 60,
  },
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  borderRadius: 8,
  margin: "4px 8px",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    transform: "scale(1.02)",
  },
  "&.active": {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderLeft: `4px solid ${theme.palette.primary.main}`,
    "& .MuiListItemIcon-root": {
      color: theme.palette.primary.main,
    },
    "& .MuiListItemText-root": {
      color: theme.palette.primary.main,
    },
  },
  [theme.breakpoints.down(900)]: {
    justifyContent: "center",
    "& .MuiListItemText-root": {
      display: "none",
    },
    "& .MuiListItemIcon-root": {
      minWidth: 0,
    },
  },
}));

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  "& .MuiTypography-root": {
    fontSize: "16px",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    [theme.breakpoints.down(900)]: {
      display: "none",
    },
  },
  "&.submenu": {
    "& .MuiTypography-root": {
      fontSize: "14px",
      fontWeight: 400,
      textTransform: "none",
    },
  },
}));

type SectionKey =
  | "admin"
  | "staff"
  | "student"
  | "parent"
  | "class"
  | "classarm"
  | "department"
  | "arms"
  | "settings"
  | "assessment"
  | "chat"
  | "election"
  | "attendance"
  | "certificate"
  | "enote"
  | "subject"
  | "newsblog"
  | "result"
  | "position"
  | "permission"
  | "foreignaffairs"
  | "payment"
  | "module"
  | "role"
  | "session"
  | "term"
  | "subscription"
  | "medical"
  | "library"
  | "calendar"
  | "status"
  | "live_stream"
  | "social_media"
  | "product";

interface OpenSections {
  admin: boolean;
  staff: boolean;
  student: boolean;
  parent: boolean;
  department: boolean;
  arms: boolean;
  class: boolean;
  classarm: boolean;
  settings: boolean;
  assessment: boolean;
  permission: boolean;
  position: boolean;
  foreignaffairs: boolean;
  certificate: boolean;
  attendance: boolean;
  newsblog: boolean;
  chat: boolean;
  election: boolean;
  enote: boolean;
  subject: boolean;
  result: boolean;
  payment: boolean;
  module: boolean;
  role: boolean;
  session: boolean;
  term: boolean;
  subscription: boolean;
  medical: boolean;
  library: boolean;
  calendar: boolean;
  status: boolean;
  live_stream: boolean;
  social_media: boolean;
  product: boolean;
}

interface OpenDialogs {
  addAdmin: boolean;
  addStaff: boolean;
  addStudent: boolean;
  addParent: boolean;
  createPost: boolean;
  addArms: boolean;
  addPermission: boolean;
  addPosition: boolean;
  addForeignAffairs: boolean;
  addClass: boolean;
  addClassArm: boolean;
  addAssessmentType: boolean;
  addAssessmentOptions: boolean;
  addAssessment: boolean;
  addNews: boolean;
  addDepartment: boolean;
  createElection: boolean;
  createParty: boolean;
  createPosition: boolean;
  createPartyCandidate: boolean;
  addENote: boolean;
  addSubject: boolean;
  addModule: boolean;
  addRole: boolean;
  addSession: boolean;
  addTerm: boolean;
  addSubscription: boolean;
  addProduct: boolean;
  addMedical: boolean;
  addLibrary: boolean;
  addCalendar: boolean;
  addStatus: boolean;
  addLiveStream: boolean;
  addSocialMedia: boolean;
}

const Sidebar = () => {
  const pathname = usePathname();
  const theme = useTheme();
  const [openSections, setOpenSections] = useState<OpenSections>({
    admin: false,
    staff: false,
    student: false,
    parent: false,
    arms: false,
    class: false,
    permission: false,
    foreignaffairs: false,
    classarm: false,
    department: false,
    settings: false,
    position: false,
    assessment: false,
    newsblog: false,
    certificate: false,
    attendance: false,
    chat: false,
    election: false,
    enote: false,
    subject: false,
    result: false,
    payment: false,
    module: false,
    role: false,
    session: false,
    term: false,
    subscription: false,
    product: false,
    medical: false,
    library: false,
    calendar: false,
    status: false,
    live_stream: false,
    social_media: false,
  });
  const [openDialogs, setOpenDialogs] = useState<OpenDialogs>({
    addAdmin: false,
    addStaff: false,
    addStudent: false,
    addParent: false,
    addArms: false,
    addForeignAffairs: false,
    addClass: false,
    addPermission: false,
    addPosition: false,
    createPost: false,
    addClassArm: false,
    addAssessmentType: false,
    addAssessmentOptions: false,
    addNews: false,
    addAssessment: false,
    addDepartment: false,
    createElection: false,
    createParty: false,
    createPosition: false,
    createPartyCandidate: false,
    addENote: false,
    addSubject: false,
    addModule: false,
    addRole: false,
    addSession: false,
    addTerm: false,
    addSubscription: false,
    addProduct: false,
    addMedical: false,
    addLibrary: false,
    addCalendar: false,
    addStatus: false,
    addLiveStream: false,
    addSocialMedia: false,
  });

  const toggleSection = (section: SectionKey) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleDialog = (dialog: keyof OpenDialogs) => {
    setOpenDialogs((prev) => ({ ...prev, [dialog]: !prev[dialog] }));
  };

  const isActive = (path: string) => pathname.startsWith(path);

  const { getUserPermissions } = useUser();
  const { permissions } = usePermissions();
  const [userPermissions, setUserPermissions] = useState<number[]>([]);
  const {
    isGuest,
    isAlumni,
    isStudent,
    isParent,
    isStaff,
    isSuperAdmin
  } = useRoleChecker();

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const perms = await getUserPermissions();
  //       setUserPermissions(perms);
  //     } catch (err) {
  //       console.error("Failed to load permissions", err);
  //     }
  //   })();
  // }, [getUserPermissions]);


  useEffect(() => {
    (async () => {
      try {
        const perms = await getUserPermissions();
        setUserPermissions(perms);

      } catch (err) {
        console.error("Failed to load permissions", err);
      }
    })();
  }, []);


  return (
    <StyledDrawer variant="permanent">
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          [theme.breakpoints.down(900)]: {
            justifyContent: "center",
            "& .MuiTypography-root": {
              display: "none",
            },
          },
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "white" }}>
          TSS
        </Typography>
        <Tooltip title="Search">
          <IconButton size="small" sx={{ color: "white" }}>
            <Search size={20} color="white" />
          </IconButton>
        </Tooltip>
      </Box>

      <List
        className="scrollable-content"
        sx={{
          overflowY: "auto",
          maxHeight: "80vh",
          padding: "8px 0",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {/* Dashboard */}
        {frontendRoleGuard(isGuest, isStaff, isParent, isSuperAdmin, isAlumni, isStudent) &&
          <Link href="/dashboard">
            <StyledListItem className={pathname === "/dashboard" ? "active" : ""}>
              <Tooltip title="Dashboard" placement="right">
                <ListItemIcon>
                  <Home size={20} color="white" />
                </ListItemIcon>
              </Tooltip>
              <StyledListItemText primary="Dashboard" />
            </StyledListItem>
          </Link>
        }

        {/* Admin */}
        {frontendRoleGuard(isStaff, isSuperAdmin) && (
          <>
            <StyledListItem
              onClick={() => toggleSection("admin")}
              sx={{ cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Tooltip title="Admin" placement="right">
                <ListItemIcon>
                  <Users size={20} color="white" />
                </ListItemIcon>
              </Tooltip>
              <StyledListItemText primary="Admin" />
              {openSections.admin ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </StyledListItem>
            <Collapse in={openSections.admin} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <StyledListItem sx={{ pl: 4 }} onClick={() => toggleDialog("addAdmin")}>
                  <Tooltip title="Register Admin" placement="right">
                    <ListItemIcon>
                      <Pencil size={20} color="white" />
                    </ListItemIcon>
                  </Tooltip>
                  <StyledListItemText primary="Register Admin" className="submenu" />
                </StyledListItem>
                <Link href="/dashboard/view-admin">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/view-admin") ? "active" : ""}>
                    <Tooltip title="View Admins" placement="right">
                      <ListItemIcon>
                        <Eye size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="View Admins" className="submenu" />
                  </StyledListItem>
                </Link>
              </List>
            </Collapse>
          </>
        )
        }

        {/* Staff */}
        {frontendRoleGuard(isStaff, isSuperAdmin) && (
          <>
            <StyledListItem
              onClick={() => toggleSection("staff")}
              sx={{ cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Tooltip title="Staff" placement="right">
                <ListItemIcon>
                  <Users size={20} color="white" />
                </ListItemIcon>
              </Tooltip>
              <StyledListItemText primary="Staff" />
              {openSections.staff ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </StyledListItem>
            <Collapse in={openSections.staff} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <StyledListItem sx={{ pl: 4 }} onClick={() => toggleDialog("addStaff")}>
                  <Tooltip title="Register Staff" placement="right">
                    <ListItemIcon>
                      <Pencil size={20} color="white" />
                    </ListItemIcon>
                  </Tooltip>
                  <StyledListItemText primary="Register Staff" className="submenu" />
                </StyledListItem>
                <Link href="/dashboard/view-staff">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/view-staff") ? "active" : ""}>
                    <Tooltip title="View Staff" placement="right">
                      <ListItemIcon>
                        <Eye size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="View Staff" className="submenu" />
                  </StyledListItem>
                </Link>
                <Link href="/dashboard/clearedstaff">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/clearedstaff") ? "active" : ""}>
                    <Tooltip title="Cleared Staff" placement="right">
                      <ListItemIcon>
                        <ClipboardCheck size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="Cleared Staff" className="submenu" />
                  </StyledListItem>
                </Link>
                <Link href="/dashboard/clearstaff">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/clearstaff") ? "active" : ""}>
                    <Tooltip title="Clear Staff" placement="right">
                      <ListItemIcon>
                        <ClipboardPenLine size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="Clear Staff" className="submenu" />
                  </StyledListItem>
                </Link>
                <Link href="/dashboard/staffsubjectallocation">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/staffsubjectallocation") ? "active" : ""}>
                    <Tooltip title="Allocate Staff Subject" placement="right">
                      <ListItemIcon>
                        <Network size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="Allocate Staff Subject" className="submenu" />
                  </StyledListItem>
                </Link>
              </List>
            </Collapse>
          </>
        )}

        {/* Student */}
        {frontendRoleGuard(isStaff, isSuperAdmin) && (
          <>
            <StyledListItem
              onClick={() => toggleSection("student")}
              sx={{ cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Tooltip title="Student" placement="right">
                <ListItemIcon>
                  <Users size={20} color="white" />
                </ListItemIcon>
              </Tooltip>
              <StyledListItemText primary="Student" />
              {openSections.student ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </StyledListItem>
            <Collapse in={openSections.student} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <StyledListItem sx={{ pl: 4 }} onClick={() => toggleDialog("addStudent")}>
                  <Tooltip title="Register Students" placement="right">
                    <ListItemIcon>
                      <Pencil size={20} color="white" />
                    </ListItemIcon>
                  </Tooltip>
                  <StyledListItemText primary="Register Students" className="submenu" />
                </StyledListItem>
                <Link href="/dashboard/view-student">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/view-student") ? "active" : ""}>
                    <Tooltip title="View Students" placement="right">
                      <ListItemIcon>
                        <Eye size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="View Students" className="submenu" />
                  </StyledListItem>
                </Link>
                <Link href="/dashboard/clearedstudents">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/clearedstudents") ? "active" : ""}>
                    <Tooltip title="Cleared Students" placement="right">
                      <ListItemIcon>
                        <ClipboardCheck size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="Cleared Students" className="submenu" />
                  </StyledListItem>
                </Link>
                <Link href="/dashboard/clearstudents">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/clearstudents") ? "active" : ""}>
                    <Tooltip title="Clear Students" placement="right">
                      <ListItemIcon>
                        <ClipboardPenLine size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="Clear Students" className="submenu" />
                  </StyledListItem>
                </Link>
                <Link href="/dashboard/promotestudents">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/promotestudents") ? "active" : ""}>
                    <Tooltip title="Promote Students" placement="right">
                      <ListItemIcon>
                        <Star size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="Promote Students" className="submenu" />
                  </StyledListItem>
                </Link>
              </List>
            </Collapse>
          </>
        )}

        {/* Parent */}
        {frontendRoleGuard(isStaff, isSuperAdmin) && (
          <>
            <StyledListItem
              onClick={() => toggleSection("parent")}
              sx={{ cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Tooltip title="Parent" placement="right">
                <ListItemIcon>
                  <Users size={20} color="white" />
                </ListItemIcon>
              </Tooltip>
              <StyledListItemText primary="Parent" />
              {openSections.parent ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </StyledListItem>
            <Collapse in={openSections.parent} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <StyledListItem sx={{ pl: 4 }} onClick={() => toggleDialog("addParent")}>
                  <Tooltip title="Register Parent" placement="right">
                    <ListItemIcon>
                      <Pencil size={20} color="white" />
                    </ListItemIcon>
                  </Tooltip>
                  <StyledListItemText primary="Register Parent" className="submenu" />
                </StyledListItem>
                <Link href="/dashboard/view-parent">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/view-parent") ? "active" : ""}>
                    <Tooltip title="View Parent" placement="right">
                      <ListItemIcon>
                        <Eye size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="View Parent" className="submenu" />
                  </StyledListItem>
                </Link>
                <Link href="/dashboard/clearparents">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/clearparents") ? "active" : ""}>
                    <Tooltip title="Clear Parent" placement="right">
                      <ListItemIcon>
                        <ClipboardPenLine size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="Clear Parent" className="submenu" />
                  </StyledListItem>
                </Link>
                <Link href="/dashboard/clearedparents">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/clearedparents") ? "active" : ""}>
                    <Tooltip title="Cleared Parents" placement="right">
                      <ListItemIcon>
                        <ClipboardCheck size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="Cleared Parents" className="submenu" />
                  </StyledListItem>
                </Link>
              </List>
            </Collapse>
          </>
        )}

        {/* Department */}
        {frontendRoleGuard(isStaff, isSuperAdmin) && (
          <>
            <StyledListItem
              onClick={() => toggleSection("department")}
              sx={{ cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Tooltip title="Department" placement="right">
                <ListItemIcon>
                  <Building size={20} color="white" />
                </ListItemIcon>
              </Tooltip>
              <StyledListItemText primary="Department" />
              {openSections.department ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </StyledListItem>
            <Collapse in={openSections.department} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <StyledListItem sx={{ pl: 4 }} onClick={() => toggleDialog("addDepartment")}>
                  <Tooltip title="Create Department" placement="right">
                    <ListItemIcon>
                      <Pencil size={20} color="white" />
                    </ListItemIcon>
                  </Tooltip>
                  <StyledListItemText primary="Create Department" className="submenu" />
                </StyledListItem>
                <Link href="/dashboard/viewdepartment">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/viewdepartment") ? "active" : ""}>
                    <Tooltip title="View Department" placement="right">
                      <ListItemIcon>
                        <Eye size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="View Department" className="submenu" />
                  </StyledListItem>
                </Link>
                <Link href="/dashboard/departmentclassallocation">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/departmentclassallocation") ? "active" : ""}>
                    <Tooltip title="Allocate Department Class" placement="right">
                      <ListItemIcon>
                        <Network size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="Allocate Department Class" className="submenu" />
                  </StyledListItem>
                </Link>
              </List>
            </Collapse>
          </>
        )}


        {/* Arms */}
        {frontendRoleGuard(isStaff, isSuperAdmin) && (
          <>
            <StyledListItem
              onClick={() => toggleSection("arms")}
              sx={{ cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Tooltip title="Arms" placement="right">
                <ListItemIcon>
                  <Tag size={20} color="white" />
                </ListItemIcon>
              </Tooltip>
              <StyledListItemText primary="Arms" />
              {openSections.arms ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </StyledListItem>
            <Collapse in={openSections.arms} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <StyledListItem sx={{ pl: 4 }} onClick={() => toggleDialog("addArms")}>
                  <Tooltip title="Register Arms" placement="right">
                    <ListItemIcon>
                      <Pencil size={20} color="white" />
                    </ListItemIcon>
                  </Tooltip>
                  <StyledListItemText primary="Register Arms" className="submenu" />
                </StyledListItem>
                <Link href="/dashboard/viewarms">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/viewarms") ? "active" : ""}>
                    <Tooltip title="View Arms" placement="right">
                      <ListItemIcon>
                        <Eye size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="View Arms" className="submenu" />
                  </StyledListItem>
                </Link>
              </List>
            </Collapse>
          </>
        )}

        {/* Class */}
        {frontendRoleGuard(isStaff, isSuperAdmin) && (
          <>
            <StyledListItem
              onClick={() => toggleSection("class")}
              sx={{ cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Tooltip title="Class" placement="right">
                <ListItemIcon>
                  <Chalkboard size={20} color="white" />
                </ListItemIcon>
              </Tooltip>
              <StyledListItemText primary="Class" />
              {openSections.class ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </StyledListItem>
            <Collapse in={openSections.class} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <StyledListItem sx={{ pl: 4 }} onClick={() => toggleDialog("addClass")}>
                  <Tooltip title="Register Class" placement="right">
                    <ListItemIcon>
                      <Pencil size={20} color="white" />
                    </ListItemIcon>
                  </Tooltip>
                  <StyledListItemText primary="Register Class" className="submenu" />
                </StyledListItem>
                <Link href="/dashboard/viewclass">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/viewclass") ? "active" : ""}>
                    <Tooltip title="View Class" placement="right">
                      <ListItemIcon>
                        <Eye size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="View Class" className="submenu" />
                  </StyledListItem>
                </Link>
              </List>
            </Collapse>
          </>
        )}

        {/* Class Arms */}
        {frontendRoleGuard(isStaff, isSuperAdmin) && (
          <>
            <StyledListItem
              onClick={() => toggleSection("classarm")}
              sx={{ cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Tooltip title="Class Arms" placement="right">
                <ListItemIcon>
                  <Tag size={20} color="white" />
                </ListItemIcon>
              </Tooltip>
              <StyledListItemText primary="Class Arms" />
              {openSections.classarm ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </StyledListItem>
            <Collapse in={openSections.classarm} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <StyledListItem sx={{ pl: 4 }} onClick={() => toggleDialog("addClassArm")}>
                  <Tooltip title="Register Class Arm" placement="right">
                    <ListItemIcon>
                      <Pencil size={20} color="white" />
                    </ListItemIcon>
                  </Tooltip>
                  <StyledListItemText primary="Register Class Arm" className="submenu" />
                </StyledListItem>
                <Link href="/dashboard/viewclassarm">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/viewclassarm") ? "active" : ""}>
                    <Tooltip title="View Class Arm" placement="right">
                      <ListItemIcon>
                        <Eye size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="View Class Arm" className="submenu" />
                  </StyledListItem>
                </Link>
              </List>
            </Collapse>
          </>
        )}

        {/* Assessment */}
        {frontendRoleGuard(isStaff, isSuperAdmin, isAlumni, isStudent) && (
          <>
            <StyledListItem
              onClick={() => toggleSection("assessment")}
              sx={{ cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Tooltip title="Assessment" placement="right">
                <ListItemIcon>
                  <NotebookText size={20} color="white" />
                </ListItemIcon>
              </Tooltip>
              <StyledListItemText primary="Assessment" />
              {openSections.assessment ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </StyledListItem>
            <Collapse in={openSections.assessment} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <StyledListItem sx={{ pl: 4 }} onClick={() => toggleDialog("addAssessment")}>
                  <Tooltip title="Register Assessment" placement="right">
                    <ListItemIcon>
                      <Pencil size={20} color="white" />
                    </ListItemIcon>
                  </Tooltip>
                  <StyledListItemText primary="Register Assessment" className="submenu" />
                </StyledListItem>
                <Link href="/dashboard/viewassessment">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/viewassessment") ? "active" : ""}>
                    <Tooltip title="View Assessment" placement="right">
                      <ListItemIcon>
                        <Eye size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="View Assessment" className="submenu" />
                  </StyledListItem>
                </Link>
                <Link href="/dashboard/takeassessment">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/takeassessment") ? "active" : ""}>
                    <Tooltip title="Take Assessment" placement="right">
                      <ListItemIcon>
                        <ClipboardEdit size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="Take Assessment" className="submenu" />
                  </StyledListItem>
                </Link>
                <StyledListItem sx={{ pl: 4 }} onClick={() => toggleDialog("addAssessmentType")}>
                  <Tooltip title="Register Assessment Type" placement="right">
                    <ListItemIcon>
                      <Pencil size={20} color="white" />
                    </ListItemIcon>
                  </Tooltip>
                  <StyledListItemText primary="Register Assessment Type" className="submenu" />
                </StyledListItem>
                <Link href="/dashboard/viewassessmenttype">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/viewassessmenttype") ? "active" : ""}>
                    <Tooltip title="View Assessment Type" placement="right">
                      <ListItemIcon>
                        <Eye size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="View Assessment Type" className="submenu" />
                  </StyledListItem>
                </Link>
                <StyledListItem sx={{ pl: 4 }} onClick={() => toggleDialog("addAssessmentOptions")}>
                  <Tooltip title="Register Assessment Options" placement="right">
                    <ListItemIcon>
                      <Pencil size={20} color="white" />
                    </ListItemIcon>
                  </Tooltip>
                  <StyledListItemText primary="Register Assessment Options" className="submenu" />
                </StyledListItem>
                <Link href="/dashboard/viewassessmentoptions">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/viewassessmentoptions") ? "active" : ""}>
                    <Tooltip title="View Assessment Options" placement="right">
                      <ListItemIcon>
                        <Eye size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="View Assessment Options" className="submenu" />
                  </StyledListItem>
                </Link>
                <Link href="/dashboard/registerquestion">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/registerquestion") ? "active" : ""}>
                    <Tooltip title="Register Question" placement="right">
                      <ListItemIcon>
                        <Pencil size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="Register Question" className="submenu" />
                  </StyledListItem>
                </Link>
                <Link href="/dashboard/questionpreview">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/questionpreview") ? "active" : ""}>
                    <Tooltip title="Question Preview" placement="right">
                      <ListItemIcon>
                        <Eye size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="Question Preview" className="submenu" />
                  </StyledListItem>
                </Link>
                <Link href="/dashboard/recordassessment">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/recordassessment") ? "active" : ""}>
                    <Tooltip title="Record Assessment" placement="right">
                      <ListItemIcon>
                        <ClipboardEdit size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="Record Assessment" className="submenu" />
                  </StyledListItem>
                </Link>
              </List>
            </Collapse>
          </>
        )}


        {/* Chat */}
        {frontendRoleGuard(isGuest, isStaff, isParent, isSuperAdmin, isAlumni, isStudent) && (
          <>
            <StyledListItem
              onClick={() => toggleSection("chat")}
              sx={{ cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Tooltip title="Chat" placement="right">
                <ListItemIcon>
                  <MessageCircleCode size={20} color="white" />
                </ListItemIcon>
              </Tooltip>
              <StyledListItemText primary="Chat" />
              {openSections.chat ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </StyledListItem>
            <Collapse in={openSections.chat} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link href="/dashboard/chat">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/chat") ? "active" : ""}>
                    <Tooltip title="Admin Meeting" placement="right">
                      <ListItemIcon>
                        <MessageCircleCode size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="Admin Meeting" className="submenu" />
                  </StyledListItem>
                </Link>
                <Link href="/dashboard/chat">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/chat") ? "active" : ""}>
                    <Tooltip title="Student Meeting" placement="right">
                      <ListItemIcon>
                        <MessageCircleCode size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="Student Meeting" className="submenu" />
                  </StyledListItem>
                </Link>
                <Link href="/dashboard/chat">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/chat") ? "active" : ""}>
                    <Tooltip title="Panel" placement="right">
                      <ListItemIcon>
                        <MessageCircleCode size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="Panel" className="submenu" />
                  </StyledListItem>
                </Link>
              </List>
            </Collapse>
          </>
        )}

        {/* Attendance */}
        {frontendRoleGuard(isGuest, isStaff, isParent, isSuperAdmin, isAlumni, isStudent) && (
          <>
            <StyledListItem
              onClick={() => toggleSection("attendance")}
              sx={{ cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Tooltip title="Attendance" placement="right">
                <ListItemIcon>
                  <CalendarCheck size={20} color="white" />
                </ListItemIcon>
              </Tooltip>
              <StyledListItemText primary="Attendance" />
              {openSections.attendance ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </StyledListItem>
            <Collapse in={openSections.attendance} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link href="/dashboard/attendance">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/attendance") ? "active" : ""}>
                    <Tooltip title="Student Attendance" placement="right">
                      <ListItemIcon>
                        <UserCheck size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="Student Attendance" className="submenu" />
                  </StyledListItem>
                </Link>
                <Link href="/dashboard/staffattendance">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/staffattendance") ? "active" : ""}>
                    <Tooltip title="Staff Attendance" placement="right">
                      <ListItemIcon>
                        <UserCheck size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="Staff Attendance" className="submenu" />
                  </StyledListItem>
                </Link>
                <Link href="/dashboard/attendance">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/attendance") ? "active" : ""}>
                    <Tooltip title="Parent Attendance Students" placement="right">
                      <ListItemIcon>
                        <UserCheck size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="Parent Attendance Students" className="submenu" />
                  </StyledListItem>
                </Link>
                <Link href="/dashboard/attendance">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/attendance") ? "active" : ""}>
                    <Tooltip title="Guest Attendance" placement="right">
                      <ListItemIcon>
                        <UserCheck size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="Guest Attendance" className="submenu" />
                  </StyledListItem>
                </Link>
              </List>
            </Collapse>
          </>
        )}

        {/* Settings */}
        {frontendRoleGuard(isGuest, isStaff, isParent, isSuperAdmin, isAlumni, isStudent) && (
          <>
            <StyledListItem
              onClick={() => toggleSection("settings")}
              sx={{ cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Tooltip title="Settings" placement="right">
                <ListItemIcon>
                  <Settings size={20} color="white" />
                </ListItemIcon>
              </Tooltip>
              <StyledListItemText primary="Settings" />
              {openSections.settings ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </StyledListItem>
            <Collapse in={openSections.settings} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link href="/dashboard/seo">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/settings/seo") ? "active" : ""}>
                    <Tooltip title="SEO" placement="right">
                      <ListItemIcon>
                        <TrendingUpDown size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="SEO" className="submenu" />
                  </StyledListItem>
                </Link>
                <Link href="/dashboard/apikeys">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/settings/page") ? "active" : ""}>
                    <Tooltip title="API Keys" placement="right">
                      <ListItemIcon>
                        <KeyRound size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="API Keys" className="submenu" />
                  </StyledListItem>
                </Link>
              </List>
            </Collapse>
          </>
        )}

        {/* Election */}
        {frontendRoleGuard(isGuest, isStaff, isParent, isSuperAdmin, isAlumni, isStudent) && (
          <>
            <StyledListItem
              onClick={() => toggleSection("election")}
              sx={{ cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Tooltip title="Election" placement="right">
                <ListItemIcon>
                  <Vote size={20} color="white" />
                </ListItemIcon>
              </Tooltip>
              <StyledListItemText primary="Election" />
              {openSections.election ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </StyledListItem>
            <Collapse in={openSections.election} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link href="/dashboard/registerbiometric">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/registerbiometric") ? "active" : ""}>
                    <Tooltip title="Register Biometric" placement="right">
                      <ListItemIcon>
                        <Fingerprint size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="Register Biometric" className="submenu" />
                  </StyledListItem>
                </Link>
                <Link href="/dashboard/vote">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/vote") ? "active" : ""}>
                    <Tooltip title="Vote" placement="right">
                      <ListItemIcon>
                        <Eye size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="Vote" className="submenu" />
                  </StyledListItem>
                </Link>
                {has(userPermissions, permissions.CREATE_ELECTION) && (
                  <StyledListItem sx={{ pl: 4 }} onClick={() => toggleDialog("createElection")}>
                    <Tooltip title="Create Election" placement="right">
                      <ListItemIcon>
                        <Pencil size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="Create Election" className="submenu" />
                  </StyledListItem>
                )}
                {has(userPermissions, permissions.CREATE_PARTY) && (
                  <StyledListItem sx={{ pl: 4 }} onClick={() => toggleDialog("createParty")}>
                    <Tooltip title="Create Party" placement="right">
                      <ListItemIcon>
                        <Pencil size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="Create Party" className="submenu" />
                  </StyledListItem>
                )}
                {has(userPermissions, permissions.CREATE_ELECTION_POST) && (
                  <StyledListItem sx={{ pl: 4 }} onClick={() => toggleDialog("createPost")}>
                    <Tooltip title="Create Post" placement="right">
                      <ListItemIcon>
                        <Pencil size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="Create Post" className="submenu" />
                  </StyledListItem>
                )}
                {has(userPermissions, permissions.CREATE_PARTY_CANDIDATE) && (
                  <StyledListItem sx={{ pl: 4 }} onClick={() => toggleDialog("createPartyCandidate")}>
                    <Tooltip title="Create Party Candidate" placement="right">
                      <ListItemIcon>
                        <Pencil size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="Create Party Candidate" className="submenu" />
                  </StyledListItem>
                )}
                {has(userPermissions, permissions.CREATE_PARTY) && (
                  <Link href="/dashboard/viewelection">
                    <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/viewelection") ? "active" : ""}>
                      <Tooltip title="View Election" placement="right">
                        <ListItemIcon>
                          <Eye size={20} color="white" />
                        </ListItemIcon>
                      </Tooltip>
                      <StyledListItemText primary="View Election" className="submenu" />
                    </StyledListItem>
                  </Link>
                )}
                {has(userPermissions, permissions.VIEW_PARTY) && (
                  <Link href="/dashboard/viewParty">
                    <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/viewParty") ? "active" : ""}>
                      <Tooltip title="View Party" placement="right">
                        <ListItemIcon>
                          <Eye size={20} color="white" />
                        </ListItemIcon>
                      </Tooltip>
                      <StyledListItemText primary="View Party" className="submenu" />
                    </StyledListItem>
                  </Link>
                )}
                {has(userPermissions, permissions.VIEW_ELECTION_POST) && (
                  <Link href="/dashboard/viewpost">
                    <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/viewpost") ? "active" : ""}>
                      <Tooltip title="View Post" placement="right">
                        <ListItemIcon>
                          <Eye size={20} color="white" />
                        </ListItemIcon>
                      </Tooltip>
                      <StyledListItemText primary="View Post" className="submenu" />
                    </StyledListItem>
                  </Link>
                )}
                {has(userPermissions, permissions.VIEW_PARTY_CANDIDATE) && (
                  <Link href="/dashboard/viewpartycandidate">
                    <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/viewpartycandidate") ? "active" : ""}>
                      <Tooltip title="View Party Candidate" placement="right">
                        <ListItemIcon>
                          <Eye size={20} color="white" />
                        </ListItemIcon>
                      </Tooltip>
                      <StyledListItemText primary="View Party Candidate" className="submenu" />
                    </StyledListItem>
                  </Link>
                )}
              </List>
            </Collapse>
          </>
        )}

        {/* E-Notes */}
        {frontendRoleGuard(isGuest, isStaff, isParent, isSuperAdmin, isAlumni, isStudent) && (
          <>
            <StyledListItem
              onClick={() => toggleSection("enote")}
              sx={{ cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Tooltip title="E-Notes" placement="right">
                <ListItemIcon>
                  <FileText size={20} color="white" />
                </ListItemIcon>
              </Tooltip>
              <StyledListItemText primary="E-Notes" />
              {openSections.enote ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </StyledListItem>
            <Collapse in={openSections.enote} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link href="/dashboard/enote">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/enote") ? "active" : ""}>
                    <Tooltip title="Register E-Note" placement="right">
                      <ListItemIcon>
                        <Pencil size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="Register E-Note" className="submenu" />
                  </StyledListItem>
                </Link>
                <Link href="/dashboard/viewenote">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/viewenote") ? "active" : ""}>
                    <Tooltip title="View E-Note" placement="right">
                      <ListItemIcon>
                        <Eye size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="View E-Note" className="submenu" />
                  </StyledListItem>
                </Link>
                <Link href="/dashboard/stafflessonnote">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/stafflessonnote") ? "active" : ""}>
                    <Tooltip title="Staff Lesson Note" placement="right">
                      <ListItemIcon>
                        <FileText size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="Staff Lesson Note" className="submenu" />
                  </StyledListItem>
                </Link>
                <Link href="/dashboard/createpersonalnote">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/createpersonalnote") ? "active" : ""}>
                    <Tooltip title="Create Personal Note" placement="right">
                      <ListItemIcon>
                        <Pencil size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="Create Personal Note" className="submenu" />
                  </StyledListItem>
                </Link>
              </List>
            </Collapse>
          </>
        )}

        {/* Subject */}
        {frontendRoleGuard(isStaff, isSuperAdmin, isAlumni, isStudent) && (
          <>
            <StyledListItem
              onClick={() => toggleSection("subject")}
              sx={{ cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Tooltip title="Subject" placement="right">
                <ListItemIcon>
                  <BookOpenText size={20} color="white" />
                </ListItemIcon>
              </Tooltip>
              <StyledListItemText primary="Subject" />
              {openSections.subject ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </StyledListItem>
            <Collapse in={openSections.subject} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <StyledListItem sx={{ pl: 4 }} onClick={() => toggleDialog("addSubject")}>
                  <Tooltip title="Add Subject" placement="right">
                    <ListItemIcon>
                      <Pencil size={20} color="white" />
                    </ListItemIcon>
                  </Tooltip>
                  <StyledListItemText primary="Add Subject" className="submenu" />
                </StyledListItem>
                <Link href="/dashboard/viewsubject">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/viewsubject") ? "active" : ""}>
                    <Tooltip title="View Subject" placement="right">
                      <ListItemIcon>
                        <Eye size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="View Subject" className="submenu" />
                  </StyledListItem>
                </Link>
                <Link href="/dashboard/classsubjectallocation">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/classsubjectallocation") ? "active" : ""}>
                    <Tooltip title="Allocate Subject Class" placement="right">
                      <ListItemIcon>
                        <Network size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="Allocate Subject Class" className="submenu" />
                  </StyledListItem>
                </Link>
              </List>
            </Collapse>
          </>
        )}

        {/* Result */}
        {frontendRoleGuard(isStaff, isParent, isSuperAdmin, isAlumni, isStudent) && (
          <>
            <StyledListItem
              onClick={() => toggleSection("result")}
              sx={{ cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Tooltip title="Result" placement="right">
                <ListItemIcon>
                  <FileSpreadsheet size={20} color="white" />
                </ListItemIcon>
              </Tooltip>
              <StyledListItemText primary="Result" />
              {openSections.result ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </StyledListItem>
            <Collapse in={openSections.result} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link href="/dashboard/scoresheet">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/scoresheet") ? "active" : ""}>
                    <Tooltip title="Edit Score Sheet" placement="right">
                      <ListItemIcon>
                        <Pencil size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="Edit Score Sheet" className="submenu" />
                  </StyledListItem>
                </Link>
                <Link href="/dashboard/score">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/score") ? "active" : ""}>
                    <Tooltip title="Score Sheet" placement="right">
                      <ListItemIcon>
                        <FileText size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="Score Sheet" className="submenu" />
                  </StyledListItem>
                </Link>
                <Link href="/dashboard/editbroadsheet">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/editbroadsheet") ? "active" : ""}>
                    <Tooltip title="Edit BroadSheet" placement="right">
                      <ListItemIcon>
                        <ClipboardList size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="Edit BroadSheet" className="submenu" />
                  </StyledListItem>
                </Link>
                <Link href="/dashboard/viewbroadsheet">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/viewbroadsheet") ? "active" : ""}>
                    <Tooltip title="View BroadSheet" placement="right">
                      <ListItemIcon>
                        <ClipboardList size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="View BroadSheet" className="submenu" />
                  </StyledListItem>
                </Link>
                <Link href="/dashboard/editreportsheet">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/editreportsheet") ? "active" : ""}>
                    <Tooltip title="Edit Report Sheet" placement="right">
                      <ListItemIcon>
                        <Pencil size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="Edit Report Sheet" className="submenu" />
                  </StyledListItem>
                </Link>
                <Link href="/dashboard/viewreportsheet">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/viewreportsheet") ? "active" : ""}>
                    <Tooltip title="View Report Sheet" placement="right">
                      <ListItemIcon>
                        <FileBarChart size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="View Report Sheet" className="submenu" />
                  </StyledListItem>
                </Link>
              </List>
            </Collapse>
          </>
        )}

        {/* Account */}
        {frontendRoleGuard(isGuest, isStaff, isParent, isSuperAdmin, isAlumni, isStudent) && (
          <>
            <StyledListItem
              onClick={() => toggleSection("payment")}
              sx={{ cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Tooltip title="Account" placement="right">
                <ListItemIcon>
                  <Wallet size={20} color="white" />
                </ListItemIcon>
              </Tooltip>
              <StyledListItemText primary="Account" />
              {openSections.payment ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </StyledListItem>
            <Collapse in={openSections.payment} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link href="/dashboard/viewpayment">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/viewpayment") ? "active" : ""}>
                    <Tooltip title="View Payment" placement="right">
                      <ListItemIcon>
                        <Eye size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="View Payment" className="submenu" />
                  </StyledListItem>
                </Link>
                <Link href="/dashboard/payroll">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/payroll") ? "active" : ""}>
                    <Tooltip title="View Payroll" placement="right">
                      <ListItemIcon>
                        <Eye size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="View Payroll" className="submenu" />
                  </StyledListItem>
                </Link>
                <Link href="/dashboard/financebroadsheet">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/financebroadsheet") ? "active" : ""}>
                    <Tooltip title="View Finance Ledger" placement="right">
                      <ListItemIcon>
                        <Eye size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="View Finance Ledger" className="submenu" />
                  </StyledListItem>
                </Link>
                <Link href="/dashboard/viewreceipts">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/viewreceipts") ? "active" : ""}>
                    <Tooltip title="View Receipts" placement="right">
                      <ListItemIcon>
                        <Eye size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="View Receipts" className="submenu" />
                  </StyledListItem>
                </Link>
                <Link href="/dashboard/viewincome">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/viewincome") ? "active" : ""}>
                    <Tooltip title="View Income" placement="right">
                      <ListItemIcon>
                        <Eye size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="View Income" className="submenu" />
                  </StyledListItem>
                </Link>
                <Link href="/dashboard/viewexpenses">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/viewexpenses") ? "active" : ""}>
                    <Tooltip title="View Expenses" placement="right">
                      <ListItemIcon>
                        <Eye size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="View Expenses" className="submenu" />
                  </StyledListItem>
                </Link>
              </List>
            </Collapse>
          </>
        )}

        {/* Position */}
        {frontendRoleGuard(isStaff, isSuperAdmin) && (
          <>
            <StyledListItem
              onClick={() => toggleSection("position")}
              sx={{ cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Tooltip title="Position" placement="right">
                <ListItemIcon>
                  <UserCog size={20} color="white" />
                </ListItemIcon>
              </Tooltip>
              <StyledListItemText primary="Position" />
              {openSections.position ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </StyledListItem>
            <Collapse in={openSections.position} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <StyledListItem sx={{ pl: 4 }} onClick={() => toggleDialog("createPosition")}>
                  <Tooltip title="Create Position" placement="right">
                    <ListItemIcon>
                      <Pencil size={20} color="white" />
                    </ListItemIcon>
                  </Tooltip>
                  <StyledListItemText primary="Create Position" className="submenu" />
                </StyledListItem>
                <Link href="/dashboard/viewposition">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/viewposition") ? "active" : ""}>
                    <Tooltip title="View Position" placement="right">
                      <ListItemIcon>
                        <Eye size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="View Position" className="submenu" />
                  </StyledListItem>
                </Link>
                <Link href="/dashboard/allocateposition">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/allocateposition") ? "active" : ""}>
                    <Tooltip title="Allocate User Position" placement="right">
                      <ListItemIcon>
                        <Network size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="Allocate User Position" className="submenu" />
                  </StyledListItem>
                </Link>
              </List>
            </Collapse>
          </>
        )}

        {/* Permission */}
        {frontendRoleGuard(isStaff, isSuperAdmin) && (
          <>
            <StyledListItem
              onClick={() => toggleSection("permission")}
              sx={{ cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Tooltip title="Permission" placement="right">
                <ListItemIcon>
                  <ShieldCheck size={20} color="white" />
                </ListItemIcon>
              </Tooltip>
              <StyledListItemText primary="Permission" />
              {openSections.permission ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </StyledListItem>
            <Collapse in={openSections.permission} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <StyledListItem sx={{ pl: 4 }} onClick={() => toggleDialog("addPermission")}>
                  <Tooltip title="Create Permission" placement="right">
                    <ListItemIcon>
                      <Pencil size={20} color="white" />
                    </ListItemIcon>
                  </Tooltip>
                  <StyledListItemText primary="Create Permission" className="submenu" />
                </StyledListItem>
                <Link href="/dashboard/viewpermission">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/viewpermission") ? "active" : ""}>
                    <Tooltip title="View Permissions" placement="right">
                      <ListItemIcon>
                        <Eye size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="View Permissions" className="submenu" />
                  </StyledListItem>
                </Link>
                <Link href="/dashboard/allocateuserpermission">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/allocateuserpermission") ? "active" : ""}>
                    <Tooltip title="Allocate User Permission" placement="right">
                      <ListItemIcon>
                        <Network size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="Allocate User Permission" className="submenu" />
                  </StyledListItem>
                </Link>
              </List>
            </Collapse>
          </>
        )}

        {/* Foreign Affairs */}
        {frontendRoleGuard(isStaff, isSuperAdmin) && (
          <>
            <StyledListItem
              onClick={() => toggleSection("foreignaffairs")}
              sx={{ cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Tooltip title="Foreign Affairs" placement="right">
                <ListItemIcon>
                  <Globe size={20} color="white" />
                </ListItemIcon>
              </Tooltip>
              <StyledListItemText primary="Foreign Affairs" />
              {openSections.foreignaffairs ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </StyledListItem>
            <Collapse in={openSections.foreignaffairs} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <StyledListItem sx={{ pl: 4 }} onClick={() => toggleDialog("addForeignAffairs")}>
                  <Tooltip title="Create Projects" placement="right">
                    <ListItemIcon>
                      <Pencil size={20} color="white" />
                    </ListItemIcon>
                  </Tooltip>
                  <StyledListItemText primary="Create Projects" className="submenu" />
                </StyledListItem>
                <Link href="/dashboard/viewforeignaffairs">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/viewforeignaffairs") ? "active" : ""}>
                    <Tooltip title="View Projects" placement="right">
                      <ListItemIcon>
                        <Eye size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="View Projects" className="submenu" />
                  </StyledListItem>
                </Link>
              </List>
            </Collapse>
          </>
        )}

        {/* Certificate */}
        {frontendRoleGuard(isStaff, isParent, isSuperAdmin, isAlumni, isStudent) && (
          <>
            <StyledListItem
              onClick={() => toggleSection("certificate")}
              sx={{ cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Tooltip title="Certificate" placement="right">
                <ListItemIcon>
                  <Award size={20} color="white" />
                </ListItemIcon>
              </Tooltip>
              <StyledListItemText primary="Certificate" />
              {openSections.certificate ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </StyledListItem>
            <Collapse in={openSections.certificate} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link href="/dashboard/createcertificate">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/createcertificate") ? "active" : ""}>
                    <Tooltip title="Create Certificate" placement="right">
                      <ListItemIcon>
                        <Pencil size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="Create Certificate" className="submenu" />
                  </StyledListItem>
                </Link>
                <Link href="/dashboard/certificate">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/certificate") ? "active" : ""}>
                    <Tooltip title="View Certificate" placement="right">
                      <ListItemIcon>
                        <Eye size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="View Certificate" className="submenu" />
                  </StyledListItem>
                </Link>
              </List>
            </Collapse>
          </>
        )}

        {/* News & Blog */}
        {frontendRoleGuard(isGuest, isStaff, isParent, isSuperAdmin, isAlumni, isStudent) && (
          <>
            <StyledListItem
              onClick={() => toggleSection("newsblog")}
              sx={{ cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Tooltip title="News & Blog" placement="right">
                <ListItemIcon>
                  <NewspaperIcon size={20} color="white" />
                </ListItemIcon>
              </Tooltip>
              <StyledListItemText primary="News & Blog" />
              {openSections.newsblog ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </StyledListItem>
            <Collapse in={openSections.newsblog} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <StyledListItem sx={{ pl: 4 }} onClick={() => toggleDialog("addNews")}>
                  <Tooltip title="Create News" placement="right">
                    <ListItemIcon>
                      <Pencil size={20} color="white" />
                    </ListItemIcon>
                  </Tooltip>
                  <StyledListItemText primary="Create News" className="submenu" />
                </StyledListItem>
                <Link href="/dashboard/newsblog">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/newsblog") ? "active" : ""}>
                    <Tooltip title="View News" placement="right">
                      <ListItemIcon>
                        <Eye size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="View News" className="submenu" />
                  </StyledListItem>
                </Link>
                <Link href="/dashboard/calendar">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/calendar") ? "active" : ""}>
                    <Tooltip title="Calendar" placement="right">
                      <ListItemIcon>
                        <Calendar size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="Calendar" className="submenu" />
                  </StyledListItem>
                </Link>
                <Link href="/dashboard/library">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/library") ? "active" : ""}>
                    <Tooltip title="Library" placement="right">
                      <ListItemIcon>
                        <BookOpen size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="Library" className="submenu" />
                  </StyledListItem>
                </Link>
                <Link href="/dashboard/noticeboard">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/noticeboard") ? "active" : ""}>
                    <Tooltip title="Notice Board" placement="right">
                      <ListItemIcon>
                        <StickyNote size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="Notice Board" className="submenu" />
                  </StyledListItem>
                </Link>
              </List>
            </Collapse>
          </>
        )}

        {/* Modules */}
        {frontendRoleGuard(isStaff, isSuperAdmin) && (
          <>
            <StyledListItem
              onClick={() => toggleSection("module")}
              sx={{ cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Tooltip title="Modules" placement="right">
                <ListItemIcon>
                  <Boxes size={20} color="white" />
                </ListItemIcon>
              </Tooltip>
              <StyledListItemText primary="Modules" />
              {openSections.module ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </StyledListItem>
            <Collapse in={openSections.module} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <StyledListItem sx={{ pl: 4 }} onClick={() => toggleDialog("addModule")}>
                  <Tooltip title="Create Module" placement="right">
                    <ListItemIcon>
                      <Pencil size={20} color="white" />
                    </ListItemIcon>
                  </Tooltip>
                  <StyledListItemText primary="Create Module" className="submenu" />
                </StyledListItem>
                <Link href="/dashboard/module">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/module") ? "active" : ""}>
                    <Tooltip title="View Module" placement="right">
                      <ListItemIcon>
                        <Eye size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="View Module" className="submenu" />
                  </StyledListItem>
                </Link>
              </List>
            </Collapse>
          </>
        )}


        {/* Role */}
        {frontendRoleGuard(isStaff, isSuperAdmin) && (
          <>
            <StyledListItem
              onClick={() => toggleSection("role")}
              sx={{ cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Tooltip title="Role" placement="right">
                <ListItemIcon>
                  <ShieldCheck size={20} color="white" />
                </ListItemIcon>
              </Tooltip>
              <StyledListItemText primary="Role" />
              {openSections.role ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </StyledListItem>
            <Collapse in={openSections.role} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <StyledListItem sx={{ pl: 4 }} onClick={() => toggleDialog("addRole")}>
                  <Tooltip title="Create Role" placement="right">
                    <ListItemIcon>
                      <Pencil size={20} color="white" />
                    </ListItemIcon>
                  </Tooltip>
                  <StyledListItemText primary="Create Role" className="submenu" />
                </StyledListItem>
                <Link href="/dashboard/role">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/role") ? "active" : ""}>
                    <Tooltip title="View Role" placement="right">
                      <ListItemIcon>
                        <Eye size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="View Role" className="submenu" />
                  </StyledListItem>
                </Link>
              </List>
            </Collapse>
          </>
        )}


        {/* Session */}
        {frontendRoleGuard(isStaff, isSuperAdmin) && (
          <>
            <StyledListItem
              onClick={() => toggleSection("session")}
              sx={{ cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Tooltip title="Session" placement="right">
                <ListItemIcon>
                  <TimerReset size={20} color="white" />
                </ListItemIcon>
              </Tooltip>
              <StyledListItemText primary="Session" />
              {openSections.session ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </StyledListItem>
            <Collapse in={openSections.session} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <StyledListItem sx={{ pl: 4 }} onClick={() => toggleDialog("addSession")}>
                  <Tooltip title="Create Session" placement="right">
                    <ListItemIcon>
                      <Pencil size={20} color="white" />
                    </ListItemIcon>
                  </Tooltip>
                  <StyledListItemText primary="Create Session" className="submenu" />
                </StyledListItem>
                <Link href="/dashboard/session">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/session") ? "active" : ""}>
                    <Tooltip title="View Session" placement="right">
                      <ListItemIcon>
                        <Eye size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="View Session" className="submenu" />
                  </StyledListItem>
                </Link>
              </List>
            </Collapse>
          </>
        )}

        {/* Term */}
        {frontendRoleGuard(isStaff, isSuperAdmin) && (
          <>
            <StyledListItem
              onClick={() => toggleSection("term")}
              sx={{ cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Tooltip title="Term" placement="right">
                <ListItemIcon>
                  <CalendarRange size={20} color="white" />
                </ListItemIcon>
              </Tooltip>
              <StyledListItemText primary="Term" />
              {openSections.term ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </StyledListItem>
            <Collapse in={openSections.term} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <StyledListItem sx={{ pl: 4 }} onClick={() => toggleDialog("addTerm")}>
                  <Tooltip title="Create Term" placement="right">
                    <ListItemIcon>
                      <Pencil size={20} color="white" />
                    </ListItemIcon>
                  </Tooltip>
                  <StyledListItemText primary="Create Term" className="submenu" />
                </StyledListItem>
                <Link href="/dashboard/term">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/term") ? "active" : ""}>
                    <Tooltip title="View Term" placement="right">
                      <ListItemIcon>
                        <Eye size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="View Term" className="submenu" />
                  </StyledListItem>
                </Link>
              </List>
            </Collapse>
          </>
        )}

        {/* Subscription */}
        {frontendRoleGuard(isStaff, isSuperAdmin) && (
          <>
            <StyledListItem
              onClick={() => toggleSection("subscription")}
              sx={{ cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Tooltip title="Subscription" placement="right">
                <ListItemIcon>
                  <CreditCard size={20} color="white" />
                </ListItemIcon>
              </Tooltip>
              <StyledListItemText primary="Subscription" />
              {openSections.subscription ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </StyledListItem>
            <Collapse in={openSections.subscription} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <StyledListItem sx={{ pl: 4 }} onClick={() => toggleDialog("addSubscription")}>
                  <Tooltip title="Create Subscription" placement="right">
                    <ListItemIcon>
                      <Pencil size={20} color="white" />
                    </ListItemIcon>
                  </Tooltip>
                  <StyledListItemText primary="Create Subscription" className="submenu" />
                </StyledListItem>
                <Link href="/dashboard/subscription">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/subscription") ? "active" : ""}>
                    <Tooltip title="View Subscription" placement="right">
                      <ListItemIcon>
                        <Eye size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="View Subscription" className="submenu" />
                  </StyledListItem>
                </Link>
              </List>
            </Collapse>
          </>
        )}

        {/* medical */}
        {frontendRoleGuard(isGuest, isStaff, isParent, isSuperAdmin, isAlumni, isStudent) && (
          <>
            <StyledListItem
              onClick={() => toggleSection("medical")}
              sx={{ cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Tooltip title="Medical" placement="right">
                <ListItemIcon>
                  <CreditCard size={20} color="white" />
                </ListItemIcon>
              </Tooltip>
              <StyledListItemText primary="Medical" />
              {openSections.medical ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </StyledListItem>
            <Collapse in={openSections.medical} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <StyledListItem sx={{ pl: 4 }} onClick={() => toggleDialog("addMedical")}>
                  <Tooltip title="Create Medical" placement="right">
                    <ListItemIcon>
                      <Pencil size={20} color="white" />
                    </ListItemIcon>
                  </Tooltip>
                  <StyledListItemText primary="Create Medical" className="submenu" />
                </StyledListItem>
                <Link href="/dashboard/medical">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/medical") ? "active" : ""}>
                    <Tooltip title="View Medical" placement="right">
                      <ListItemIcon>
                        <Eye size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="View Medical" className="submenu" />
                  </StyledListItem>
                </Link>
              </List>
            </Collapse>
          </>
        )}

        {/* library */}
        {frontendRoleGuard(isGuest, isStaff, isParent, isSuperAdmin, isAlumni, isStudent) && (
          <>
            <StyledListItem
              onClick={() => toggleSection("library")}
              sx={{ cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Tooltip title="Library" placement="right">
                <ListItemIcon>
                  <CreditCard size={20} color="white" />
                </ListItemIcon>
              </Tooltip>
              <StyledListItemText primary="Library" />
              {openSections.library ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </StyledListItem>
            <Collapse in={openSections.library} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <StyledListItem sx={{ pl: 4 }} onClick={() => toggleDialog("addLibrary")}>
                  <Tooltip title="Create Library" placement="right">
                    <ListItemIcon>
                      <Pencil size={20} color="white" />
                    </ListItemIcon>
                  </Tooltip>
                  <StyledListItemText primary="Create Library" className="submenu" />
                </StyledListItem>
                <Link href="/dashboard/library">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/library") ? "active" : ""}>
                    <Tooltip title="View Library" placement="right">
                      <ListItemIcon>
                        <Eye size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="View Library" className="submenu" />
                  </StyledListItem>
                </Link>
              </List>
            </Collapse>
          </>
        )}


        {/* calendar */}
        {frontendRoleGuard(isGuest, isStaff, isParent, isSuperAdmin, isAlumni, isStudent) && (
          <>
            <StyledListItem
              onClick={() => toggleSection("calendar")}
              sx={{ cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Tooltip title="Calendar" placement="right">
                <ListItemIcon>
                  <CreditCard size={20} color="white" />
                </ListItemIcon>
              </Tooltip>
              <StyledListItemText primary="Calendar" />
              {openSections.calendar ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </StyledListItem>
            <Collapse in={openSections.calendar} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <StyledListItem sx={{ pl: 4 }} onClick={() => toggleDialog("addCalendar")}>
                  <Tooltip title="Create Calendar" placement="right">
                    <ListItemIcon>
                      <Pencil size={20} color="white" />
                    </ListItemIcon>
                  </Tooltip>
                  <StyledListItemText primary="Create Calendar" className="submenu" />
                </StyledListItem>
                <Link href="/dashboard/calendar">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/calendar") ? "active" : ""}>
                    <Tooltip title="View Calendar" placement="right">
                      <ListItemIcon>
                        <Eye size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="View Calendar" className="submenu" />
                  </StyledListItem>
                </Link>
              </List>
            </Collapse>
          </>
        )}


        {/* status */}
        {frontendRoleGuard(isStaff, isSuperAdmin) && (
          <>
            <StyledListItem
              onClick={() => toggleSection("status")}
              sx={{ cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Tooltip title="Status" placement="right">
                <ListItemIcon>
                  <CreditCard size={20} color="white" />
                </ListItemIcon>
              </Tooltip>
              <StyledListItemText primary="Status" />
              {openSections.status ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </StyledListItem>
            <Collapse in={openSections.status} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <StyledListItem sx={{ pl: 4 }} onClick={() => toggleDialog("addStatus")}>
                  <Tooltip title="Create Status" placement="right">
                    <ListItemIcon>
                      <Pencil size={20} color="white" />
                    </ListItemIcon>
                  </Tooltip>
                  <StyledListItemText primary="Create Status" className="submenu" />
                </StyledListItem>
                <Link href="/dashboard/status">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/status") ? "active" : ""}>
                    <Tooltip title="View Status" placement="right">
                      <ListItemIcon>
                        <Eye size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="View Status" className="submenu" />
                  </StyledListItem>
                </Link>
              </List>
            </Collapse>
          </>
        )}


        {/* live_stream */}
        {frontendRoleGuard(isStaff, isSuperAdmin) && (
          <>
            <StyledListItem
              onClick={() => toggleSection("live_stream")}
              sx={{ cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Tooltip title="Social Media" placement="right">
                <ListItemIcon>
                  <CreditCard size={20} color="white" />
                </ListItemIcon>
              </Tooltip>
              <StyledListItemText primary="Social Media" />
              {openSections.live_stream ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </StyledListItem>
            <Collapse in={openSections.live_stream} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <StyledListItem sx={{ pl: 4 }} onClick={() => toggleDialog("addLiveStream")}>
                  <Tooltip title="Create Live Stream" placement="right">
                    <ListItemIcon>
                      <Pencil size={20} color="white" />
                    </ListItemIcon>
                  </Tooltip>
                  <StyledListItemText primary="Create Live Stream" className="submenu" />
                </StyledListItem>
                <Link href="/dashboard/live_stream">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/live_stream") ? "active" : ""}>
                    <Tooltip title="View Live Stream" placement="right">
                      <ListItemIcon>
                        <Eye size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="View Live Stream" className="submenu" />
                  </StyledListItem>
                </Link>
              </List>
            </Collapse>
          </>
        )}

        {/* social_media */}
        {frontendRoleGuard(isStaff, isSuperAdmin) && (
          <>
            <StyledListItem
              onClick={() => toggleSection("social_media")}
              sx={{ cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Tooltip title="Live Social Media" placement="right">
                <ListItemIcon>
                  <CreditCard size={20} color="white" />
                </ListItemIcon>
              </Tooltip>
              <StyledListItemText primary="Live Stream" />
              {openSections.social_media ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </StyledListItem>
            <Collapse in={openSections.social_media} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <StyledListItem sx={{ pl: 4 }} onClick={() => toggleDialog("addSocialMedia")}>
                  <Tooltip title="Create Social Media" placement="right">
                    <ListItemIcon>
                      <Pencil size={20} color="white" />
                    </ListItemIcon>
                  </Tooltip>
                  <StyledListItemText primary="Create Social Media" className="submenu" />
                </StyledListItem>
                <Link href="/dashboard/social_media">
                  <StyledListItem sx={{ pl: 4 }} className={isActive("/dashboard/social_media") ? "active" : ""}>
                    <Tooltip title="View Social Media" placement="right">
                      <ListItemIcon>
                        <Eye size={20} color="white" />
                      </ListItemIcon>
                    </Tooltip>
                    <StyledListItemText primary="View Social Media" className="submenu" />
                  </StyledListItem>
                </Link>
              </List>
            </Collapse>
          </>
        )}

      </List>

      {/* Dialogs */}
      <AdminRegistrationDialog
        open={openDialogs.addAdmin}
        onClose={() => toggleDialog("addAdmin")}
      />
      <NewsRegistrationDialog
        open={openDialogs.addNews}
        onClose={() => toggleDialog("addNews")}
      />
      <StaffRegistrationDialog
        open={openDialogs.addStaff}
        onClose={() => toggleDialog("addStaff")}
      />
      <StudentRegistrationDialog
        open={openDialogs.addStudent}
        onClose={() => toggleDialog("addStudent")}
      />
      <ParentRegistrationDialog
        open={openDialogs.addParent}
        onClose={() => toggleDialog("addParent")}
      />
      <DepartmentRegistrationDialog
        open={openDialogs.addDepartment}
        onClose={() => toggleDialog("addDepartment")}
      />
      <ArmsRegistrationDialog
        open={openDialogs.addArms}
        onClose={() => toggleDialog("addArms")}
      />
      <PermissionRegistrationDialog
        open={openDialogs.addPermission}
        onClose={() => toggleDialog("addPermission")}
      />
      <PositionRegistrationDialog
        open={openDialogs.addPosition}
        onClose={() => toggleDialog("addPosition")}
      />
      <ClassRegistrationDialog
        open={openDialogs.addClass}
        onClose={() => toggleDialog("addClass")}
      />
      <ClassArmRegistrationDialog
        open={openDialogs.addClassArm}
        onClose={() => toggleDialog("addClassArm")}
      />
      <AssessmentTypeRegistrationDialog
        open={openDialogs.addAssessmentType}
        onClose={() => toggleDialog("addAssessmentType")}
      />
      <AssessmentOptionsRegistrationDialog
        open={openDialogs.addAssessmentOptions}
        onClose={() => toggleDialog("addAssessmentOptions")}
      />
      <AssessmentRegistrationDialog
        open={openDialogs.addAssessment}
        onClose={() => toggleDialog("addAssessment")}
      />
      <ElectionRegistrationDialog
        open={openDialogs.createElection}
        onClose={() => toggleDialog("createElection")}
      />
      <PartyRegistrationDialog
        open={openDialogs.createParty}
        onClose={() => toggleDialog("createParty")}
      />
      <PostRegistrationDialog
        open={openDialogs.createPost}
        onClose={() => toggleDialog("createPost")}
      />
      <ForeignAffairsRegistrationDialog
        open={openDialogs.addForeignAffairs}
        onClose={() => toggleDialog("addForeignAffairs")}
      />
      <PositionRegistrationDialog
        open={openDialogs.createPosition}
        onClose={() => toggleDialog("createPosition")}
      />
      <PartyCandidateRegistrationDialog
        open={openDialogs.createPartyCandidate}
        onClose={() => toggleDialog("createPartyCandidate")}
      />
      <GenericDialog
        open={openDialogs.addENote}
        onClose={() => toggleDialog("addENote")}
        title="Add E-Note"
      />
      <SubjectRegistrationDialog
        open={openDialogs.addSubject}
        onClose={() => toggleDialog("addSubject")}
      />
      <ModuleRegistrationDialog
        open={openDialogs.addModule}
        onClose={() => toggleDialog("addModule")}
      />
      <RoleRegistrationDialog
        open={openDialogs.addRole}
        onClose={() => toggleDialog("addRole")}
      />
      <SessionRegistrationDialog
        open={openDialogs.addSession}
        onClose={() => toggleDialog("addSession")}
      />
      <TermRegistrationDialog
        open={openDialogs.addTerm}
        onClose={() => toggleDialog("addTerm")}
      />
      <SubscriptionRegistrationDialog
        open={openDialogs.addSubscription}
        onClose={() => toggleDialog("addSubscription")}
      />
      <MedicalRegistrationDialog
        open={openDialogs.addMedical}
        onClose={() => toggleDialog("addMedical")}
      />
      <LibraryRegistrationDialog
        open={openDialogs.addLibrary}
        onClose={() => toggleDialog("addLibrary")}
      />
      <CalendarRegistrationDialog
        open={openDialogs.addCalendar}
        onClose={() => toggleDialog("addCalendar")}
      />
      <StatusRegistrationDialog
        open={openDialogs.addStatus}
        onClose={() => toggleDialog("addStatus")}
      />
      <LiveStreamRegistrationDialog
        open={openDialogs.addLiveStream}
        onClose={() => toggleDialog("addLiveStream")}
      />
      <SocialMediaRegistrationDialog
        open={openDialogs.addSocialMedia}
        onClose={() => toggleDialog("addSocialMedia")}
      />
    </StyledDrawer>
  );
};

export default Sidebar;