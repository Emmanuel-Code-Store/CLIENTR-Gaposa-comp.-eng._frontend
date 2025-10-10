'use client';

import { useState, useEffect } from "react";
import { Box, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ButtonGroup, Button, IconButton, TextField, InputAdornment, Pagination, styled } from "@mui/material";

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
import Loading from "@/components/Loading";
import { useClassArms, ClassArmData } from "@/hooks/useClassArm";
import toastr from "toastr";
import Swal from "sweetalert2";
import "toastr/build/toastr.min.css";

toastr.options = {
  closeButton: true,
  progressBar: true,
  positionClass: "toast-top-right",
  timeOut: 5000,
};

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

export default function ViewClassArm() {
  const {
    fetchClassArms,
    fetchClassArmById,
    updateClassArm,
    deleteClassArm,
    loading,
    error,
  } = useClassArms();

  const [classArmsList, setClassArmsList] = useState<ClassArmData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  // useEffect(() => {
  //   const subscription = fetchClassArms().subscribe({
  //     next: (data) => setClassArmsList(data),
  //     error: (err) => {
  //       toastr.error("Failed to fetch class arms");
  //       console.error(err);
  //     },
  //   });

  //   return () => subscription.unsubscribe();
  // }, [fetchClassArms]);

  useEffect(() => {
    const subscription = fetchClassArms().subscribe({
      next: (data) => setClassArmsList(data),
      error: (err) => {
        toastr.error("Failed to fetch class arms");
        console.error(err);
      },
    });

    return () => subscription.unsubscribe();
  }, []);

  const filteredList = classArmsList.filter((item) => {
    const term = searchTerm.toLowerCase();
    return (
      item.class_arm_description.toLowerCase().includes(term) ||
      item.class?.name?.toLowerCase().includes(term) ||
      item.arm?.name?.toLowerCase().includes(term)
    );
  });

  const pageCount = Math.ceil(filteredList.length / rowsPerPage);
  const paginatedList = filteredList.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  // Pagination & search handlers
  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => setPage(value);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  // Action handlers
  const handleView = (id: string) => {
    fetchClassArmById(id).subscribe({
      next: (data) => {
        Swal.fire({
          title: "Class Arm Details",
          html: `
            <p><strong>Class UUID:</strong> ${data.class_id}</p>
            <p><strong>Arm UUID:</strong> ${data.arms_id}</p>
            <p><strong>Description:</strong> ${data.class_arm_description}</p>
          `,
        });
      },
      error: () => toastr.error("Failed to fetch class arm details"),
    });
  };

  const handleEdit = (id: string) => {
    const currentDesc = classArmsList.find((arm) => arm.class_arm_id === id)?.class_arm_description || "";

    Swal.fire({
      title: "Edit Class Arm Description",
      input: "textarea",
      inputLabel: "Description",
      inputValue: currentDesc,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        updateClassArm(id, { class_arm_description: result.value }).subscribe({
          next: () => {
            toastr.success("Class arm updated");
            setClassArmsList((prev) =>
              prev.map((item) =>
                item.class_arm_id === id ? { ...item, class_arm_description: result.value || "" } : item
              )
            );
          },
          error: () => toastr.error("Failed to update class arm"),
        });
      }
    });
  };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Delete Class Arm?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteClassArm(id).subscribe({
          next: () => {
            toastr.success("Class arm deleted");
            setClassArmsList((prev) => prev.filter((item) => item.class_arm_id !== id));
          },
          error: () => toastr.error("Failed to delete class arm"),
        });
      }
    });
  };

  if (loading) return <Loading />;

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">Error: {error.message}</Typography>
      </Box>
    );
  }

  return (
    <Box component="main" sx={{ flexGrow: 1, bgcolor: "#F9FAFB", p: 3 }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 500 }}>
          Class Arms List ({filteredList.length})
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "text.secondary", fontSize: 14 }}>
          <span>Session 2025/2026</span>
          <ChevronRight size={16} />
          <span>Class Arms</span>
        </Box>
      </Box>

      {/* Actions & Search */}
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
          placeholder="Search class arms"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={20} color="gray" />
              </InputAdornment>
            ),
          }}
          sx={{ width: 220 }}
        />
      </Box>

      {/* Table */}
      <TableContainer component={Paper} sx={{ border: 1, borderColor: "grey.200" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell className="header">Class Name</StyledTableCell>
              <StyledTableCell className="header">Arm Name</StyledTableCell>
              <StyledTableCell className="header">Description</StyledTableCell>
              <StyledTableCell className="header" align="right">
                Action
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedList.map(({ class_arm_id, class: classData, arm, class_arm_description }) => (
              <TableRow
                key={class_arm_id}
                sx={{
                  "&:nth-of-type(odd)": {
                    backgroundColor: "rgba(244, 114, 182, 0.1)",
                  },
                }}
              >
                <StyledTableCell>{classData?.name || "N/A"}</StyledTableCell>
                <StyledTableCell>{arm?.name || "N/A"}</StyledTableCell>
                <StyledTableCell>{class_arm_description || "N/A"}</StyledTableCell>
                <StyledTableCell align="right">
                  <ActionIconButton size="small" onClick={() => handleView(class_arm_id)}>
                    <Eye size={16} />
                  </ActionIconButton>
                  <ActionIconButton size="small" onClick={() => handleEdit(class_arm_id)}>
                    <Edit size={16} />
                  </ActionIconButton>
                  <ActionIconButton size="small" onClick={() => handleDelete(class_arm_id)}>
                    <Trash2 size={16} />
                  </ActionIconButton>
                </StyledTableCell>
              </TableRow>
            ))}
            {paginatedList.length === 0 && (
              <TableRow>
                <StyledTableCell colSpan={4} align="center" sx={{ py: 4, color: "text.secondary" }}>
                  No class arms found.
                </StyledTableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box
        sx={{
          mt: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "text.secondary",
          fontSize: 14,
        }}
      >
        <Typography>
          Showing {(page - 1) * rowsPerPage + 1}-
          {Math.min(page * rowsPerPage, filteredList.length)} of {filteredList.length} results
        </Typography>
        <Pagination
          count={pageCount}
          page={page}
          onChange={handlePageChange}
          color="primary"
          shape="rounded"
          size="small"
          disabled={pageCount === 0}
        />
      </Box>
    </Box>
  );
}