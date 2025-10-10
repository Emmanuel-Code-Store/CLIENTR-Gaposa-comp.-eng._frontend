"use client";

import { useState, useEffect } from "react";
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
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { Observable, of } from "rxjs";

// Configure toastr
toastr.options = {
    closeButton: true,
    progressBar: true,
    positionClass: "toast-top-right",
    timeOut: 5000,
};

// ----------------- Interfaces -----------------
interface Session {
    uuid: string;
    name: string;
}

interface SemesterTerm {
    uuid: string;
    name: string;
}

interface Subject {
    uuid: string;
    name: string;
    code: string;
}

interface ClassArm {
    uuid: string;
    name: string;
}

interface Allocation {
    id: string;
    session_uuid: string;
    semester_term_uuid: string;
    subject_uuid: string;
    classarm_uuid: string;
    class_subject_description?: string;
    createdAt: string;
    session_name?: string;
    term_name?: string;
    subject_name?: string;
    subject_code?: string;
    class_arm_name?: string;
}

interface ClassSubjectResponse {
    class_subject_id: string;
}

interface SubjectClassHook {
    fetchSessions: () => Observable<Session[]>;
    fetchSemesterTerms: () => Observable<SemesterTerm[]>;
    fetchSubjects: () => Observable<Subject[]>;
    fetchClassArms: () => Observable<ClassArm[]>;
    fetchClassSubjects: () => Observable<Allocation[]>;
    registerClassSubject: (data: {
        session_uuid: string;
        semester_term_uuid: string;
        subject_uuid: string;
        classarm_uuid: string;
        class_subject_description?: string;
    }) => Observable<ClassSubjectResponse>;
    updateClassSubject: (
        id: string,
        data: {
            session_uuid: string;
            semester_term_uuid: string;
            subject_uuid: string;
            classarm_uuid: string;
            class_subject_description?: string;
        }
    ) => Observable<void>;
    deleteClassSubject: (id: string) => Observable<void>;
    loading: boolean;
}

function useSubjectClass(): SubjectClassHook {
    const [loading] = useState(false);

    const fetchSessions = () => of([{ uuid: "s1", name: "2025/2026" }]);
    const fetchSemesterTerms = () => of([{ uuid: "t1", name: "First Term" }]);
    const fetchSubjects = () => of([{ uuid: "sub1", name: "Mathematics", code: "MTH101" }]);
    const fetchClassArms = () => of([{ uuid: "c1", name: "Arm A" }]);
    const fetchClassSubjects = () => of([]);
    const registerClassSubject = () =>
        of({
            class_subject_id: Math.random().toString(36).substring(2, 9),
        });
    const updateClassSubject = () => of(void 0);
    const deleteClassSubject = () => of(void 0);

    return {
        fetchSessions,
        fetchSemesterTerms,
        fetchSubjects,
        fetchClassArms,
        fetchClassSubjects,
        registerClassSubject,
        updateClassSubject,
        deleteClassSubject,
        loading,
    };
}

// ----------------- Component -----------------
export default function ClassSubjectAllocation() {
    const {
        fetchSessions,
        fetchSemesterTerms,
        fetchSubjects,
        fetchClassArms,
        fetchClassSubjects,
        registerClassSubject,
        updateClassSubject,
        deleteClassSubject,
        loading,
    } = useSubjectClass();


    const [sessions, setSessions] = useState<Session[]>([]);
    const [semesterTerms, setSemesterTerms] = useState<SemesterTerm[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [classArms, setClassArms] = useState<ClassArm[]>([]);
    const [allocations, setAllocations] = useState<Allocation[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingAllocation, setEditingAllocation] = useState<Allocation | null>(null);
    const [formData, setFormData] = useState({
        session_uuid: "",
        semester_term_uuid: "",
        subject_uuid: "",
        classarm_uuid: "",
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
    });

    useEffect(() => {
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

        fetchSubjects().subscribe({
            next: (data: Subject[]) => {
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

        fetchClassArms().subscribe({
            next: (data: ClassArm[]) => {
                setClassArms(data);
                if (data.length > 0) {
                    setFormData((prev) => ({ ...prev, classarm_uuid: data[0].uuid }));
                } else {
                    toastr.warning("No class arms available, please add class arms first");
                }
            },
            error: (err) => {
                console.error("Error fetching class arms:", err);
                toastr.error("Failed to fetch class arms");
            },
        });

        fetchClassSubjects().subscribe({
            next: (data) => {
                setAllocations(data);
            },
            error: (err) => {
                console.error("Error fetching class subjects:", err);
                toastr.error("Failed to fetch class subjects");
                setAllocations([]);
            },
        });
    }, [fetchSessions, fetchSemesterTerms, fetchSubjects, fetchClassArms, fetchClassSubjects]);

    useEffect(() => {
        setStats({
            totalAllocations: allocations.length,
            totalSessions: sessions.length,
            totalSemesterTerms: semesterTerms.length,
            totalSubjects: subjects.length,
            totalClassArms: classArms.length,
        });
    }, [allocations, sessions, semesterTerms, subjects, classArms]);

    const getSessionName = (session_uuid: string) => sessions.find((s) => s.uuid === session_uuid)?.name || "Unknown";
    const getSemesterTermName = (semester_term_uuid: string) =>
        semesterTerms.find((s) => s.uuid === semester_term_uuid)?.name || "Unknown";
    const getSubjectName = (subject_uuid: string) => subjects.find((s) => s.uuid === subject_uuid)?.name || "Unknown";
    const getSubjectCode = (subject_uuid: string) => subjects.find((s) => s.uuid === subject_uuid)?.code || "Unknown";
    const getClassArmName = (classarm_uuid: string) =>
        classArms.find((c) => c.uuid === classarm_uuid)?.name || "Unknown";

    const filteredAllocations = allocations.filter((allocation) => {
        const sessionName = getSessionName(allocation.session_uuid).toLowerCase();
        const semesterTermName = getSemesterTermName(allocation.semester_term_uuid).toLowerCase();
        const subjectName = getSubjectName(allocation.subject_uuid).toLowerCase();
        const classArmName = getClassArmName(allocation.classarm_uuid).toLowerCase();
        const searchLower = searchTerm.toLowerCase();

        return (
            sessionName.includes(searchLower) ||
            semesterTermName.includes(searchLower) ||
            subjectName.includes(searchLower) ||
            classArmName.includes(searchLower)
        );
    });

    const handleSubmit = () => {
        if (
            !formData.session_uuid ||
            !formData.semester_term_uuid ||
            !formData.subject_uuid ||
            !formData.classarm_uuid
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
                (!editingAllocation || a.id !== editingAllocation.id),
        );

        if (duplicate) {
            setSnackbar({ open: true, message: "This allocation already exists", severity: "error" });
            return;
        }

        if (editingAllocation) {
            updateClassSubject(editingAllocation.id, formData).subscribe({
                next: () => {
                    setAllocations((prev) =>
                        prev.map((a) => (a.id === editingAllocation.id ? { ...a, ...formData } : a)),
                    );
                    setSnackbar({ open: true, message: "Allocation updated successfully", severity: "success" });
                    handleCloseDialog();
                },
                error: (err) => {
                    console.error("Error updating class subject:", err);
                    setSnackbar({ open: true, message: err.message || "Failed to update allocation", severity: "error" });
                },
            });
        } else {
            registerClassSubject(formData).subscribe({
                next: (res) => {
                    setAllocations((prev) => [
                        ...prev,
                        {
                            id: res.class_subject_id.toString(),
                            ...formData,
                            createdAt: new Date().toISOString().split("T")[0],
                        },
                    ]);
                    setSnackbar({ open: true, message: "Allocation created successfully", severity: "success" });
                    handleCloseDialog();
                },
                error: (err) => {
                    console.error("Error creating class subject:", err);
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
            class_subject_description: allocation.class_subject_description || "",
        });
        setOpenDialog(true);
    };

    const handleDelete = (id: string) => {
        deleteClassSubject(id).subscribe({
            next: () => {
                setAllocations((prev) => prev.filter((a) => a.id !== id));
                setSnackbar({ open: true, message: "Allocation deleted successfully", severity: "success" });
            },
            error: (err) => {
                console.error("Error deleting class subject:", err);
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

    return (
        <Box component="main" sx={{ flexGrow: 1, bgcolor: "#F9FAFB", p: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 500 }} component="h1" gutterBottom>
                        Class Subject Allocation Management
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Manage subject assignments to class arms for the academic year
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "text.secondary", fontSize: "0.875rem" }}>
                    <span>Session 2025/2026</span>
                    <ChevronRight size={16} />
                    <span>Subjects</span>
                </Box>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <ButtonGroup size="small">
                    <ActionButton startIcon={<Copy size={16} />}>Copy</ActionButton>
                    <ActionButton startIcon={<FileText size={16} />}>CSV</ActionButton>
                    <ActionButton startIcon={<FileSpreadsheet size={16} />}>Excel</ActionButton>
                    <ActionButton startIcon={<Tooltip title="Export as PDF">
                        <IconButton>
                            <FileText size={16} />
                        </IconButton>
                    </Tooltip>}>PDF</ActionButton>
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
                <Grid item xs={12} sm={6} md={3}>
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
                <Grid item xs={12} sm={6} md={3}>
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
                <Grid item xs={12} sm={6} md={3}>
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
                <Grid item xs={12} sm={6} md={3}>
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
                                <TableCell>Description</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
                                        <CircularProgress />
                                    </TableCell>
                                </TableRow>
                            ) : filteredAllocations.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
                                        <Typography variant="body2" color="text.secondary">
                                            No allocations found. Create a new allocation to get started.
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredAllocations
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((allocation) => (
                                        <TableRow key={allocation.id} hover>
                                            <TableCell>
                                                <Typography variant="body2" fontWeight="medium">
                                                    {getSessionName(allocation.session_uuid)}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2" fontWeight="medium">
                                                    {getSemesterTermName(allocation.semester_term_uuid)}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Box>
                                                    <Typography variant="body2" fontWeight="medium">
                                                        {getSubjectName(allocation.subject_uuid)}
                                                    </Typography>
                                                    <Chip
                                                        label={getSubjectCode(allocation.subject_uuid)}
                                                        size="small"
                                                        variant="outlined"
                                                    />
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2" fontWeight="medium">
                                                    {getClassArmName(allocation.classarm_uuid)}
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
                                                        onClick={() => handleDelete(allocation.id)}
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
                    onPageChange={(_, newPage) => setPage(newPage)}
                    onRowsPerPageChange={(e) => {
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
                        disabled={
                            loading ||
                            sessions.length === 0 ||
                            semesterTerms.length === 0 ||
                            subjects.length === 0 ||
                            classArms.length === 0
                        }
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
                disabled={sessions.length === 0 || semesterTerms.length === 0 || subjects.length === 0 || classArms.length === 0}
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