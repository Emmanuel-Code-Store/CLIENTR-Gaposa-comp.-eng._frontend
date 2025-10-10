"use client";

import { useState, useEffect } from "react";
import { combineLatest, from } from "rxjs";
import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Grid,
  Card,
  CardContent,
  Fab,
  Tooltip,
  Alert,
  Snackbar,
  TablePagination,
  InputAdornment,
  ButtonGroup,
  styled,
  CircularProgress,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  School as SchoolIcon,
  Class as ClassIcon,
} from "@mui/icons-material";
import { Search, ChevronRight, Copy, FileText, FileSpreadsheet, Printer } from "lucide-react";
import { useStaffSubjectClass } from "@/hooks/useStaffSubjectClass";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

toastr.options = {
  closeButton: true,
  progressBar: true,
  positionClass: "toast-top-right",
  timeOut: 5000,
};

interface Session {
  uuid: string;
  id: number;
  name: string;
}

interface SemesterTerm {
  uuid: string;
  id: number;
  name: string;
}

interface Subject {
  uuid: string;
  id: number;
  name: string;
  code: string;
}

interface Class {
  id: number;
  name: string;
}

interface Arm {
  id: number;
  name: string;
}

interface ClassArm {
  uuid: string;
  id: number;
  class_id?: number;
  arms_id?: number;
  name: string;
}

interface Staff {
  uuid: string;
  id: number;
  fullname: string;
  staff_id: string;
}

interface Allocation {
  staff_subject_class_id: string;
  session_uuid: string;
  semester_term_uuid: string;
  subject_uuid: string;
  classarm_uuid: string;
  staff_uuid: string;
  allocated_by_uuid: string;
  class_subject_description?: string;
  createdAt: string;
  session_name?: string;
  term_name?: string;
  subject_name?: string;
  subject_code?: string;
  class_arm_name?: string;
  staff_fullname?: string;
  allocated_by_fullname?: string;
}

interface RawClassArm {
  uuid?: string;
  id: number;
  class_id?: number | string;
  arms_id?: number | string;
  name?: string;
}

export default function StaffSubjectAllocation() {
  const { fetchSessions, fetchSemesterTerms, fetchSubjects, fetchClasses, fetchArms, fetchClassArms, fetchStaff, fetchStaffSubjectClasses, registerStaffSubjectClass, updateStaffSubjectClass, deleteStaffSubjectClass, loading } =
    useStaffSubjectClass();

  const [sessions, setSessions] = useState<Session[]>([]);
  const [semesterTerms, setSemesterTerms] = useState<SemesterTerm[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [classArms, setClassArms] = useState<ClassArm[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [allocations, setAllocations] = useState<Allocation[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingAllocation, setEditingAllocation] = useState<Allocation | null>(null);
  const [formData, setFormData] = useState({
    session_uuid: "",
    semester_term_uuid: "",
    subject_uuid: "",
    classarm_uuid: "",
    staff_uuid: "",
    class_subject_description: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" });

  const [stats, setStats] = useState({
    totalAllocations: 0,
    totalSessions: 0,
    totalSemesterTerms: 0,
    totalSubjects: 0,
    totalClassArms: 0,
    totalStaff: 0,
  });

  // useEffect(() => {
  //   // Fetch sessions
  //   fetchSessions().subscribe({
  //     next: (data) => {
  //       setSessions(data);
  //       if (data.length > 0) {
  //         setFormData((prev) => ({ ...prev, session_uuid: data[0].uuid }));
  //       } else {
  //         toastr.warning("No sessions available, please add sessions first");
  //       }
  //     },
  //     error: (err) => {
  //       console.error("Error fetching sessions:", err);
  //       toastr.error("Failed to fetch sessions");
  //     },
  //   });

  //   // Fetch semester terms
  //   fetchSemesterTerms().subscribe({
  //     next: (data) => {
  //       setSemesterTerms(data);
  //       if (data.length > 0) {
  //         setFormData((prev) => ({ ...prev, semester_term_uuid: data[0].uuid }));
  //       } else {
  //         toastr.warning("No semester terms available, please add terms first");
  //       }
  //     },
  //     error: (err) => {
  //       console.error("Error fetching semester terms:", err);
  //       toastr.error("Failed to fetch semester terms");
  //     },
  //   });

  //   // Fetch subjects
  //   fetchSubjects().subscribe({
  //     next: (data) => {
  //       setSubjects(data);
  //       if (data.length > 0) {
  //         setFormData((prev) => ({ ...prev, subject_uuid: data[0].uuid }));
  //       } else {
  //         toastr.warning("No subjects available, please add subjects first");
  //       }
  //     },
  //     error: (err) => {
  //       console.error("Error fetching subjects:", err);
  //       toastr.error("Failed to fetch subjects");
  //     },
  //   });

  //   // Fetch staff
  //   fetchStaff().subscribe({
  //     next: (data) => {
  //       setStaff(data);
  //       if (data.length > 0) {
  //         setFormData((prev) => ({ ...prev, staff_uuid: data[0].uuid }));
  //       } else {
  //         toastr.warning("No staff available, please add staff first");
  //       }
  //     },
  //     error: (err) => {
  //       console.error("Error fetching staff:", err);
  //       toastr.error("Failed to fetch staff");
  //     },
  //   });

  //   // Fetch staff subject classes
  //   fetchStaffSubjectClasses().subscribe({
  //     next: (data) => {
  //       setAllocations(data);
  //     },
  //     error: (err) => {
  //       console.error("Error fetching staff subject classes:", err);
  //       toastr.error("Failed to fetch staff subject classes");
  //       setAllocations([]);
  //     },
  //   });
  // }, [fetchSessions, fetchSemesterTerms, fetchSubjects, fetchStaff, fetchStaffSubjectClasses]);

    useEffect(() => {
    // Fetch sessions
    fetchSessions().subscribe({
      next: (data) => {
        setSessions(data);
        if (data.length > 0) {
          setFormData((prev) => ({ ...prev, session_uuid: data[0].uuid }));
        } else {
          toastr.warning("No sessions available, please add sessions first");
        }
      },
      error: (err) => {
        console.error("Error fetching sessions:", err);
        toastr.error("Failed to fetch sessions");
      },
    });

    // Fetch semester terms
    fetchSemesterTerms().subscribe({
      next: (data) => {
        setSemesterTerms(data);
        if (data.length > 0) {
          setFormData((prev) => ({ ...prev, semester_term_uuid: data[0].uuid }));
        } else {
          toastr.warning("No semester terms available, please add terms first");
        }
      },
      error: (err) => {
        console.error("Error fetching semester terms:", err);
        toastr.error("Failed to fetch semester terms");
      },
    });

    // Fetch subjects
    fetchSubjects().subscribe({
      next: (data) => {
        setSubjects(data);
        if (data.length > 0) {
          setFormData((prev) => ({ ...prev, subject_uuid: data[0].uuid }));
        } else {
          toastr.warning("No subjects available, please add subjects first");
        }
      },
      error: (err) => {
        console.error("Error fetching subjects:", err);
        toastr.error("Failed to fetch subjects");
      },
    });

    // Fetch staff
    fetchStaff().subscribe({
      next: (data) => {
        setStaff(data);
        if (data.length > 0) {
          setFormData((prev) => ({ ...prev, staff_uuid: data[0].uuid }));
        } else {
          toastr.warning("No staff available, please add staff first");
        }
      },
      error: (err) => {
        console.error("Error fetching staff:", err);
        toastr.error("Failed to fetch staff");
      },
    });

    // Fetch staff subject classes
    fetchStaffSubjectClasses().subscribe({
      next: (data) => {
        setAllocations(data);
      },
      error: (err) => {
        console.error("Error fetching staff subject classes:", err);
        toastr.error("Failed to fetch staff subject classes");
        setAllocations([]);
      },
    });
  }, []);

  // useEffect(() => {
  //   const subscription = combineLatest([
  //     from(fetchClassArms()),
  //     from(fetchClasses()),
  //     from(fetchArms()),
  //   ]).subscribe({
  //     next: ([classArmsRaw, classes, arms]) => {
  //       const enrichedClassArms: ClassArm[] = classArmsRaw.map((arm: RawClassArm) => {
  //         const classId = arm.class_id ? Number(arm.class_id) : undefined;
  //         const armId = arm.arms_id ? Number(arm.arms_id) : undefined;
  //         const className = classId
  //           ? classes.find((c: Class) => c.id === classId)?.name || "Unknown Class"
  //           : "Unknown Class";
  //         const armName = armId
  //           ? arms.find((a: Arm) => a.id === armId)?.name || "Unknown Arm"
  //           : "Unknown Arm";

  //         if (className === "Unknown Class" && classId !== undefined) {
  //           console.warn(`No class found for class_id: ${classId}`);
  //         }
  //         if (armName === "Unknown Arm" && armId !== undefined) {
  //           console.warn(`No arm found for arms_id: ${armId}`);
  //         }

  //         const displayName = arm.name && arm.name.trim() !== "" ? arm.name : `${className} - ${armName}`;

  //         return {
  //           uuid: arm.uuid || arm.id.toString(),
  //           id: arm.id,
  //           name: displayName,
  //         };
  //       });

  //       console.log("enrichedClassArms:", enrichedClassArms);
  //       setClassArms(enrichedClassArms);

  //       if (enrichedClassArms.length > 0) {
  //         setFormData((prev) => ({
  //           ...prev,
  //           classarm_uuid: enrichedClassArms[0].uuid,
  //         }));
  //       } else {
  //         toastr.warning("No class arms available, please add class arms first");
  //       }

  //       if (arms.length === 0) {
  //         console.warn("Arms array is empty; cannot map arm names.");
  //         toastr.warning("No arms available, please add arms first");
  //       }
  //     },
  //     error: (err) => {
  //       console.error("Error enriching class arms:", err);
  //       toastr.error("Failed to fetch class arms");
  //     },
  //     complete: () => {
  //       console.log("Class arms fetching completed");
  //     },
  //   });

  //   return () => subscription.unsubscribe();
  // }, [fetchClassArms, fetchClasses, fetchArms]);

useEffect(() => {
    const subscription = combineLatest([
      from(fetchClassArms()),
      from(fetchClasses()),
      from(fetchArms()),
    ]).subscribe({
      next: ([classArmsRaw, classes, arms]) => {
        const enrichedClassArms: ClassArm[] = classArmsRaw.map((arm: RawClassArm) => {
          const classId = arm.class_id ? Number(arm.class_id) : undefined;
          const armId = arm.arms_id ? Number(arm.arms_id) : undefined;
          const className = classId
            ? classes.find((c: Class) => c.id === classId)?.name || "Unknown Class"
            : "Unknown Class";
          const armName = armId
            ? arms.find((a: Arm) => a.id === armId)?.name || "Unknown Arm"
            : "Unknown Arm";

          if (className === "Unknown Class" && classId !== undefined) {
            console.warn(`No class found for class_id: ${classId}`);
          }
          if (armName === "Unknown Arm" && armId !== undefined) {
            console.warn(`No arm found for arms_id: ${armId}`);
          }

          const displayName = arm.name && arm.name.trim() !== "" ? arm.name : `${className} - ${armName}`;

          return {
            uuid: arm.uuid || arm.id.toString(),
            id: arm.id,
            name: displayName,
          };
        });

        console.log("enrichedClassArms:", enrichedClassArms);
        setClassArms(enrichedClassArms);

        if (enrichedClassArms.length > 0) {
          setFormData((prev) => ({
            ...prev,
            classarm_uuid: enrichedClassArms[0].uuid,
          }));
        } else {
          toastr.warning("No class arms available, please add class arms first");
        }

        if (arms.length === 0) {
          console.warn("Arms array is empty; cannot map arm names.");
          toastr.warning("No arms available, please add arms first");
        }
      },
      error: (err) => {
        console.error("Error enriching class arms:", err);
        toastr.error("Failed to fetch class arms");
      },
      complete: () => {
        console.log("Class arms fetching completed");
      },
    });

    return () => subscription.unsubscribe();
  }, []);

  // useEffect(() => {
  //   setStats({
  //     totalAllocations: allocations.length,
  //     totalSessions: sessions.length,
  //     totalSemesterTerms: semesterTerms.length,
  //     totalSubjects: subjects.length,
  //     totalClassArms: classArms.length,
  //     totalStaff: staff.length,
  //   });
  // }, [allocations, sessions, semesterTerms, subjects, classArms, staff]);

useEffect(() => {
    setStats({
      totalAllocations: allocations.length,
      totalSessions: sessions.length,
      totalSemesterTerms: semesterTerms.length,
      totalSubjects: subjects.length,
      totalClassArms: classArms.length,
      totalStaff: staff.length,
    });
  }, []);

  const getSessionName = (session_uuid: string) => sessions.find((s) => s.uuid === session_uuid)?.name || "Unknown";
  const getSemesterTermName = (semester_term_uuid: string) =>
    semesterTerms.find((s) => s.uuid === semester_term_uuid)?.name || "Unknown";
  const getSubjectName = (subject_uuid: string) => subjects.find((s) => s.uuid === subject_uuid)?.name || "Unknown";
  const getSubjectCode = (subject_uuid: string) => subjects.find((s) => s.uuid === subject_uuid)?.code || "Unknown";
  const getClassArmName = (classarm_uuid: string) =>
    classArms.find((c) => c.uuid === classarm_uuid)?.name || "Unknown";
  const getStaffName = (staff_uuid: string) => staff.find((s) => s.uuid === staff_uuid)?.fullname || "Unknown";

  const filteredAllocations = allocations.filter((allocation) => {
    const sessionName = allocation.session_name?.toLowerCase() || getSessionName(allocation.session_uuid).toLowerCase();
    const semesterTermName = allocation.term_name?.toLowerCase() || getSemesterTermName(allocation.semester_term_uuid).toLowerCase();
    const subjectName = allocation.subject_name?.toLowerCase() || getSubjectName(allocation.subject_uuid).toLowerCase();
    const classArmName = allocation.class_arm_name?.toLowerCase() || getClassArmName(allocation.classarm_uuid).toLowerCase();
    const staffName = allocation.staff_fullname?.toLowerCase() || getStaffName(allocation.staff_uuid).toLowerCase();
    const searchLower = searchTerm.toLowerCase();

    return (
      sessionName.includes(searchLower) ||
      semesterTermName.includes(searchLower) ||
      subjectName.includes(searchLower) ||
      classArmName.includes(searchLower) ||
      staffName.includes(searchLower)
    );
  });

  const handleSubmit = () => {
    if (
      !formData.session_uuid ||
      !formData.semester_term_uuid ||
      !formData.subject_uuid ||
      !formData.classarm_uuid ||
      !formData.staff_uuid
    ) {
      setSnackbar({ open: true, message: "Please fill all required fields", severity: "error" });
      return;
    }

    const duplicate = allocations.find(
      (a) =>
        a.session_uuid === formData.session_uuid &&
        a.semester_term_uuid === formData.semester_term_uuid &&
        a.subject_uuid === formData.subject_uuid &&
        a.classarm_uuid === formData.classarm_uuid &&
        a.staff_uuid === formData.staff_uuid &&
        (!editingAllocation || a.staff_subject_class_id !== editingAllocation.staff_subject_class_id),
    );

    if (duplicate) {
      setSnackbar({ open: true, message: "This allocation already exists", severity: "error" });
      return;
    }

    const newAllocation = {
      ...formData,
      staff_subject_class_id: editingAllocation ? editingAllocation.staff_subject_class_id : "",
      createdAt: editingAllocation ? editingAllocation.createdAt : new Date().toISOString().split("T")[0],
      session_name: getSessionName(formData.session_uuid),
      term_name: getSemesterTermName(formData.semester_term_uuid),
      subject_name: getSubjectName(formData.subject_uuid),
      subject_code: getSubjectCode(formData.subject_uuid),
      class_arm_name: getClassArmName(formData.classarm_uuid),
      staff_fullname: getStaffName(formData.staff_uuid),
      allocated_by_fullname: getStaffName(formData.staff_uuid),
    };

    if (editingAllocation) {
      updateStaffSubjectClass(editingAllocation.staff_subject_class_id, formData).subscribe({
        next: () => {
          setAllocations((prev) =>
            prev.map((a) => (a.staff_subject_class_id === editingAllocation.staff_subject_class_id ? { ...a, ...newAllocation } : a)),
          );
          setSnackbar({ open: true, message: "Allocation updated successfully", severity: "success" });
          handleCloseDialog();
        },
        error: (err) => {
          console.error("Error updating staff subject class:", err);
          setSnackbar({ open: true, message: err.message || "Failed to update allocation", severity: "error" });
        },
      });
    } else {
      registerStaffSubjectClass(formData).subscribe({
        next: (res) => {
          setAllocations((prev) => [
            ...prev,
            {
              ...newAllocation,
              staff_subject_class_id: res.staffSubjectClass?.staff_subject_class_id?.toString()
                ?? res.id?.toString()
                ?? "",
              allocated_by_uuid: res.allocatedBy?.id
                ?? res.staffSubjectClass?.staff_uuid
                ?? formData.staff_uuid,
              allocated_by_fullname: res.allocatedBy?.fullname
                ?? getStaffName(formData.staff_uuid),
              session_name: res.staffSubjectClass?.Session?.name
                ?? getSessionName(formData.session_uuid),
              term_name: res.staffSubjectClass?.Term?.name
                ?? getSemesterTermName(formData.semester_term_uuid),
              subject_name: res.staffSubjectClass?.Subject?.name
                ?? getSubjectName(formData.subject_uuid),
              subject_code: res.staffSubjectClass?.Subject?.code
                ?? getSubjectCode(formData.subject_uuid),
              class_arm_name: res.staffSubjectClass?.ClassArm?.name
                ?? getClassArmName(formData.classarm_uuid),
              class_subject_description: res.staffSubjectClass?.class_subject_description
                ?? formData.class_subject_description,
              createdAt: res.createdAt
                ?? new Date().toISOString().split("T")[0],
            }

          ]);
          setSnackbar({ open: true, message: "Allocation created successfully", severity: "success" });
          handleCloseDialog();
        },
        error: (err) => {
          console.error("Error creating staff subject class:", err);
          setSnackbar({ open: true, message: err.message || "Failed to create allocation", severity: "error" });
        },
      });
    }
  };

  const handleEdit = (allocation: Allocation) => {
    setEditingAllocation(allocation);
    setFormData({
      session_uuid: allocation.session_uuid,
      semester_term_uuid: allocation.semester_term_uuid,
      subject_uuid: allocation.subject_uuid,
      classarm_uuid: allocation.classarm_uuid,
      staff_uuid: allocation.staff_uuid,
      class_subject_description: allocation.class_subject_description || "",
    });
    setOpenDialog(true);
  };

  const handleDelete = (staff_subject_class_id: string) => {
    deleteStaffSubjectClass(staff_subject_class_id).subscribe({
      next: () => {
        setAllocations((prev) => prev.filter((a) => a.staff_subject_class_id !== staff_subject_class_id));
        setSnackbar({ open: true, message: "Allocation deleted successfully", severity: "success" });
      },
      error: (err) => {
        console.error("Error deleting staff subject class:", err);
        setSnackbar({ open: true, message: err.message || "Failed to delete allocation", severity: "error" });
      },
    });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingAllocation(null);
    setFormData({
      session_uuid: sessions[0]?.uuid || "",
      semester_term_uuid: semesterTerms[0]?.uuid || "",
      subject_uuid: subjects[0]?.uuid || "",
      classarm_uuid: classArms[0]?.uuid || "",
      staff_uuid: staff[0]?.uuid || "",
      class_subject_description: "",
    });
  };

  const ActionButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.text.primary,
    textTransform: "none",
    "&:hover": {
      backgroundColor: theme.palette.grey[300],
    },
  }));

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(0);
  };

  const isFabDisabled = sessions.length === 0 || semesterTerms.length === 0 || subjects.length === 0 || classArms.length === 0 || staff.length === 0;

  return (
    <Box component="main" sx={{ flexGrow: 1, bgcolor: "#F9FAFB", p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 500 }} component="h1" gutterBottom>
            Staff Subject Allocation Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage staff assignments to class subjects for the academic year
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "text.secondary", fontSize: "0.875rem" }}>
          <span>Session 2025/2026</span>
          <ChevronRight size={16} />
          <span>Staff Subjects</span>
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <ButtonGroup size="small">
          <ActionButton startIcon={<Copy size={16} />}>Copy</ActionButton>
          <ActionButton startIcon={<FileText size={16} />}>CSV</ActionButton>
          <ActionButton startIcon={<FileSpreadsheet size={16} />}>Excel</ActionButton>
          <ActionButton startIcon={<FileText size={16} />}>PDF</ActionButton>
          <ActionButton startIcon={<Printer size={16} />}>Print</ActionButton>
        </ButtonGroup>

        <TextField
          size="small"
          placeholder="Search allocations"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={20} color="gray" />
              </InputAdornment>
            ),
          }}
          sx={{ width: 200 }}
        />
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <SchoolIcon color="primary" sx={{ fontSize: 40 }} />
                <Box>
                  <Typography variant="h4" component="div">
                    {stats.totalSessions}
                  </Typography>
                  <Typography color="text.secondary">Total Sessions</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <SchoolIcon color="secondary" sx={{ fontSize: 40 }} />
                <Box>
                  <Typography variant="h4" component="div">
                    {stats.totalSemesterTerms}
                  </Typography>
                  <Typography color="text.secondary">Total Semester Terms</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <SchoolIcon color="success" sx={{ fontSize: 40 }} />
                <Box>
                  <Typography variant="h4" component="div">
                    {stats.totalSubjects}
                  </Typography>
                  <Typography color="text.secondary">Total Subjects</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <ClassIcon color="warning" sx={{ fontSize: 40 }} />
                <Box>
                  <Typography variant="h4" component="div">
                    {stats.totalClassArms}
                  </Typography>
                  <Typography color="text.secondary">Total Class Arms</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <SchoolIcon color="info" sx={{ fontSize: 40 }} />
                <Box>
                  <Typography variant="h4" component="div">
                    {stats.totalStaff}
                  </Typography>
                  <Typography color="text.secondary">Total Staff</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Session</TableCell>
                <TableCell>Semester Term</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Class Arm</TableCell>
                <TableCell>Staff</TableCell>
                <TableCell>Allocated By</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : filteredAllocations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    <Typography variant="body2" color="text.secondary">
                      No allocations found. Create a new allocation to get started.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredAllocations
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((allocation) => (
                    <TableRow key={allocation.staff_subject_class_id} hover>
                      <TableCell>
                        <Typography variant="body2" fontWeight="medium">
                          {allocation.session_name || getSessionName(allocation.session_uuid)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight="medium">
                          {allocation.term_name || getSemesterTermName(allocation.semester_term_uuid)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Typography variant="body2" fontWeight="medium">
                            {allocation.subject_name || getSubjectName(allocation.subject_uuid)}
                          </Typography>
                          <Chip
                            label={allocation.subject_code || getSubjectCode(allocation.subject_uuid)}
                            size="small"
                            variant="outlined"
                          />
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight="medium">
                          {allocation.class_arm_name || getClassArmName(allocation.classarm_uuid)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight="medium">
                          {allocation.staff_fullname || getStaffName(allocation.staff_uuid)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight="medium">
                          {allocation.allocated_by_fullname || getStaffName(allocation.allocated_by_uuid)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {allocation.class_subject_description || "-"}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title="Edit Allocation">
                          <IconButton
                            color="primary"
                            onClick={() => handleEdit(allocation)}
                            size="small"
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Allocation">
                          <IconButton
                            color="error"
                            onClick={() => handleDelete(allocation.staff_subject_class_id)}
                            size="small"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredAllocations.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, newPage: number) => setPage(newPage)}
          onRowsPerPageChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </Paper>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>{editingAllocation ? "Edit Allocation" : "Create New Allocation"}</DialogTitle>
        <DialogContent>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Box sx={{ pt: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Session</InputLabel>
                    <Select
                      value={formData.session_uuid}
                      label="Session"
                      onChange={(e) => setFormData((prev) => ({ ...prev, session_uuid: e.target.value }))}
                    >
                      {sessions.length === 0 ? (
                        <MenuItem disabled>No sessions available</MenuItem>
                      ) : (
                        sessions.map((session) => (
                          <MenuItem key={session.uuid} value={session.uuid}>
                            <Typography variant="body2">{session.name}</Typography>
                          </MenuItem>
                        ))
                      )}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Semester Term</InputLabel>
                    <Select
                      value={formData.semester_term_uuid}
                      label="Semester Term"
                      onChange={(e) => setFormData((prev) => ({ ...prev, semester_term_uuid: e.target.value }))}
                    >
                      {semesterTerms.length === 0 ? (
                        <MenuItem disabled>No semester terms available</MenuItem>
                      ) : (
                        semesterTerms.map((term) => (
                          <MenuItem key={term.uuid} value={term.uuid}>
                            <Typography variant="body2">{term.name}</Typography>
                          </MenuItem>
                        ))
                      )}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Subject</InputLabel>
                    <Select
                      value={formData.subject_uuid}
                      label="Subject"
                      onChange={(e) => setFormData((prev) => ({ ...prev, subject_uuid: e.target.value }))}
                    >
                      {subjects.length === 0 ? (
                        <MenuItem disabled>No subjects available</MenuItem>
                      ) : (
                        subjects.map((subject) => (
                          <MenuItem key={subject.uuid} value={subject.uuid}>
                            <Box>
                              <Typography variant="body2">{subject.name}</Typography>
                              <Typography variant="caption" color="text.secondary">
                                {subject.code}
                              </Typography>
                            </Box>
                          </MenuItem>
                        ))
                      )}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Class Arm</InputLabel>
                    <Select
                      value={formData.classarm_uuid}
                      label="Class Arm"
                      onChange={(e) => setFormData((prev) => ({ ...prev, classarm_uuid: e.target.value }))}
                    >
                      {classArms.length === 0 ? (
                        <MenuItem disabled>No class arms available</MenuItem>
                      ) : (
                        classArms.map((classArm) => (
                          <MenuItem key={classArm.uuid} value={classArm.uuid}>
                            <Typography variant="body2">{classArm.name}</Typography>
                          </MenuItem>
                        ))
                      )}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Staff</InputLabel>
                    <Select
                      value={formData.staff_uuid}
                      label="Staff"
                      onChange={(e) => setFormData((prev) => ({ ...prev, staff_uuid: e.target.value }))}
                    >
                      {staff.length === 0 ? (
                        <MenuItem disabled>No staff available</MenuItem>
                      ) : (
                        staff.map((s) => (
                          <MenuItem key={s.uuid} value={s.uuid}>
                            <Box>
                              <Typography variant="body2">{s.fullname}</Typography>
                              <Typography variant="caption" color="text.secondary">
                                {s.staff_id}
                              </Typography>
                            </Box>
                          </MenuItem>
                        ))
                      )}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    value={formData.class_subject_description}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, class_subject_description: e.target.value }))
                    }
                  />
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={loading || !formData.session_uuid || !formData.semester_term_uuid || !formData.subject_uuid || !formData.classarm_uuid || !formData.staff_uuid}
          >
            {loading ? <CircularProgress size={20} /> : editingAllocation ? "Update" : "Create"} Allocation
          </Button>
        </DialogActions>
      </Dialog>

      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        onClick={() => setOpenDialog(true)}
        disabled={isFabDisabled}
      >
        <AddIcon />
      </Fab>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}