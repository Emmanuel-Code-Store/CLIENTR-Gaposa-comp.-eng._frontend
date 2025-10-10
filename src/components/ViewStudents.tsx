"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ButtonGroup,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  Pagination,
  styled,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Search,
  ChevronRight,
  Copy,
  FileText,
  FileSpreadsheet,
  FileIcon as FilePdf,
  Printer,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import { useUser } from "@/hooks/useUser";
import Loading from "@/components/Loading";
import toastr from "toastr";
import Swal from "sweetalert2";
import "toastr/build/toastr.min.css";

// Toastr config
toastr.options = {
  closeButton: true,
  progressBar: true,
  positionClass: "toast-top-right",
  timeOut: 5000,
};

// Styled components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(1.5),
  borderColor: theme.palette.grey[200],
  "&.header": {
    backgroundColor: theme.palette.background.paper,
    fontWeight: 500,
    color: theme.palette.text.primary,
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  color: theme.palette.text.primary,
  textTransform: "none",
  "&:hover": {
    backgroundColor: theme.palette.grey[300],
  },
}));

const ActionIconButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(0.5),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
  "& + &": {
    marginLeft: theme.spacing(1),
  },
}));

// --- Types ---
interface Student {
  userId: string;
  studentId?: string | null;
  fullname: string | null;
  email: string | null; // allow null from backend
  role: { role_name: string };
}

export default function ViewStudents() {
  const { fetchStudent, updateUser, deleteUser } = useUser();
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState<Partial<Student>>({});
  const rowsPerPage = 10;

  // useEffect(() => {
  //   const sub = fetchStudent().subscribe({
  //     next: (userList) => {
  //       // cast to Student[]
  //       const studentList = userList as unknown as Student[];

  //       const normalized = studentList.map((s) => ({
  //         ...s,
  //         userId: String(s.userId),
  //         studentId: s.studentId ?? null,
  //         email: s.email ?? "N/A",
  //         role: typeof s.role === "string" ? { role_name: s.role } : s.role,
  //       }));

  //       setStudents(normalized);
  //       setLoading(false);
  //     },
  //     error: (err: Error) => {
  //       console.error("Fetch students error:", err.message);
  //       toastr.error("Failed to fetch student data");
  //       setLoading(false);
  //     },
  //   });

  //   return () => sub.unsubscribe();
  // }, [fetchStudent]);

    useEffect(() => {
    const sub = fetchStudent().subscribe({
      next: (userList) => {
        // cast to Student[]
        const studentList = userList as unknown as Student[];

        const normalized = studentList.map((s) => ({
          ...s,
          userId: String(s.userId),
          studentId: s.studentId ?? null,
          email: s.email ?? "N/A",
          role: typeof s.role === "string" ? { role_name: s.role } : s.role,
        }));

        setStudents(normalized);
        setLoading(false);
      },
      error: (err: Error) => {
        console.error("Fetch students error:", err.message);
        toastr.error("Failed to fetch student data");
        setLoading(false);
      },
    });

    return () => sub.unsubscribe();
  }, []);

  // Search + pagination
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // Edit handlers
  const handleEditClick = (student: Student) => {
    setSelectedStudent(student);
    setFormData({ ...student });
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setSelectedStudent(null);
    setFormData({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = async () => {
    if (!selectedStudent) return;
    try {
      await updateUser(selectedStudent.userId, formData);
      setStudents((prev) =>
        prev.map((s) =>
          s.userId === selectedStudent.userId ? { ...s, ...formData } : s
        )
      );
      toastr.success("Student updated successfully");
      handleEditClose();
    } catch (err: unknown) {
      console.error("Update failed:", err);
      toastr.error(err instanceof Error ? err.message : "Failed to update student");
    }
  };

  // Delete handler
  const handleDelete = async (userId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this student?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        await deleteUser(userId);
        setStudents((prev) => prev.filter((s) => s.userId !== userId));
        toastr.success("Student deleted successfully");
      } catch (err: unknown) {
        console.error("Delete failed:", err);
        toastr.error(err instanceof Error ? err.message : "Failed to delete student");
      }
    }
  };

  // Filtering + pagination
  const filteredStudents = students.filter((s) =>
    [s.fullname, s.email].join(" ").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredStudents.length / rowsPerPage);
  const paginatedStudents = filteredStudents.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  if (loading) return <Loading />;

  return (
    <Box component="main" sx={{ flexGrow: 1, bgcolor: "#F9FAFB", p: 3 }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 500 }}>
          Students List ({filteredStudents.length})
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "text.secondary", fontSize: "0.875rem" }}>
          <span>Session 2025/2026</span>
          <ChevronRight size={16} />
          <span>Students</span>
        </Box>
      </Box>

      {/* Actions */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <ButtonGroup size="small">
          <ActionButton startIcon={<Copy size={16} />}>Copy</ActionButton>
          <ActionButton startIcon={<FileText size={16} />}>CSV</ActionButton>
          <ActionButton startIcon={<FileSpreadsheet size={16} />}>Excel</ActionButton>
          <ActionButton startIcon={<FilePdf size={16} />}>PDF</ActionButton>
          <ActionButton startIcon={<Printer size={16} />}>Print</ActionButton>
        </ButtonGroup>

        <TextField
          size="small"
          placeholder="Search students"
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

      {/* Table */}
      <TableContainer component={Paper} elevation={0} sx={{ border: 1, borderColor: "grey.200" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell className="header">Student ID</StyledTableCell>
              <StyledTableCell className="header">Name</StyledTableCell>
              <StyledTableCell className="header">Email</StyledTableCell>
              <StyledTableCell className="header">Role</StyledTableCell>
              <StyledTableCell className="header" align="right">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedStudents.map((student) => (
              <TableRow key={student.userId}>
                <StyledTableCell>{student.studentId || "N/A"}</StyledTableCell>
                <StyledTableCell>{student.fullname || "N/A"}</StyledTableCell>
                <StyledTableCell>{student.email || "N/A"}</StyledTableCell>
                <StyledTableCell>{student.role.role_name}</StyledTableCell>
                <StyledTableCell align="right">
                  <Link href={`/userprofile/${student.userId}`}>
                    <ActionIconButton size="small">
                      <Eye size={16} />
                    </ActionIconButton>
                  </Link>
                  <ActionIconButton size="small" onClick={() => handleEditClick(student)}>
                    <Edit size={16} />
                  </ActionIconButton>
                  <ActionIconButton size="small" onClick={() => handleDelete(student.userId)}>
                    <Trash2 size={16} />
                  </ActionIconButton>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
        <Pagination count={pageCount} page={page} onChange={handlePageChange} color="primary" />
      </Box>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onClose={handleEditClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit Student</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Full Name"
            name="fullname"
            value={formData.fullname || ""}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Email"
            name="email"
            value={formData.email || ""}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Role"
            name="role"
            value={typeof formData.role === "string" ? formData.role : formData.role?.role_name || ""}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
