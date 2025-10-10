"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ButtonGroup,
  Button,
  TextField,
  InputAdornment,
  styled,
  Pagination,
} from "@mui/material";
import {
  Search,
  ChevronRight,
  Copy,
  FileText,
  FileSpreadsheet,
  FileIcon as FilePdf,
  Printer,
} from "lucide-react";
import { useUser } from "@/hooks/useUser";
import Loading from "@/components/Loading";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import type { User } from "@/hooks/useUser";
import { from } from "rxjs";

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
  backgroundColor: theme.palette.grey[100],
  color: theme.palette.text.primary,
  textTransform: "none",
  padding: theme.spacing(0.5, 2),
  "&:hover": {
    backgroundColor: theme.palette.grey[200],
  },
}));

export default function ClearedStaff() {
  const { fetchStaffCleared } = useUser();
  const [staff, setStaff] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const rowsPerPage = 10;

  // useEffect(() => {
  //   const subscription = from(fetchStaffCleared()).subscribe({
  //     next: (staffList) => {
  //       if (Array.isArray(staffList)) {
  //         setStaff(
  //           staffList.map((s) => ({
  //             ...s,
  //             userId: String(s.userId),
  //             staffId: String(s.staffId),
  //           }))
  //         );
  //         console.log("Staff fetched: ", staffList);
  //       } else {
  //         console.error("Unexpected staff data format", staffList);
  //         toastr.error("Failed to fetch staff data");
  //       }
  //       setLoading(false);
  //     },
  //     error: (err) => {
  //       console.error("Error fetching staff:", err);
  //       toastr.error("Failed to fetch staff data");
  //       setLoading(false);
  //     },
  //   });

  //   return () => subscription.unsubscribe();
  // }, [fetchStaffCleared]);


  useEffect(() => {
    const subscription = from(fetchStaffCleared()).subscribe({
      next: (staffList) => {
        if (Array.isArray(staffList)) {
          setStaff(
            staffList.map((s) => ({
              ...s,
              userId: String(s.userId),
              staffId: String(s.staffId),
            }))
          );
          console.log("Staff fetched: ", staffList);
        } else {
          console.error("Unexpected staff data format", staffList);
          toastr.error("Failed to fetch staff data");
        }
        setLoading(false);
      },
      error: (err) => {
        console.error("Error fetching staff:", err);
        toastr.error("Failed to fetch staff data");
        setLoading(false);
      },
    });

    return () => subscription.unsubscribe();
  }, []);


  if (loading) return <Loading />;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const filteredStaff = staff.filter((s) =>
    [s.staffId, s.fullname, s.email, s.role, s.userPositions?.join(", ")]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredStaff.length / rowsPerPage);
  const paginatedStaff = filteredStaff.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <Box component="main" sx={{ flexGrow: 1, bgcolor: "#F9FAFB", p: 3 }}>
      {/* Header */}
      <Box
        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}
      >
        <Typography variant="h5" sx={{ fontWeight: 500 }}>
          Cleared Staff
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: "text.secondary",
            fontSize: "0.875rem",
          }}
        >
          <span>Session 2019/2020</span>
          <ChevronRight size={16} />
          <span>First</span>
          <ChevronRight size={16} />
          <span>SS2</span>
          <ChevronRight size={16} />
        </Box>
      </Box>

      {/* Actions */}
      <Box
        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}
      >
        <ButtonGroup size="small">
          <ActionButton startIcon={<Copy size={16} />}>Copy</ActionButton>
          <ActionButton startIcon={<FileText size={16} />}>CSV</ActionButton>
          <ActionButton startIcon={<FileSpreadsheet size={16} />}>Excel</ActionButton>
          <ActionButton startIcon={<FilePdf size={16} />}>PDF</ActionButton>
          <ActionButton startIcon={<Printer size={16} />}>Print</ActionButton>
        </ButtonGroup>

        <TextField
          size="small"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={20} color="gray" />
              </InputAdornment>
            ),
          }}
          sx={{
            width: 200,
            "& .MuiOutlinedInput-root": {
              backgroundColor: "white",
            },
          }}
        />
      </Box>

      {/* Table */}
      <TableContainer component={Paper} elevation={0} sx={{ border: 1, borderColor: "grey.200" }}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell className="header">Staff ID</StyledTableCell>
              <StyledTableCell className="header">Full Name</StyledTableCell>
              <StyledTableCell className="header">Email</StyledTableCell>
              <StyledTableCell className="header">Role</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedStaff.map((s) => (
              <TableRow
                key={s.userId}
                sx={{
                  "&:nth-of-type(odd)": {
                    backgroundColor: "rgba(244, 114, 182, 0.1)",
                  },
                }}
              >
                <StyledTableCell>{s.staffId || "-"}</StyledTableCell>
                <StyledTableCell>{s.fullname || "-"}</StyledTableCell>
                <StyledTableCell>{s.email}</StyledTableCell>
                <StyledTableCell>{s.roleName}</StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      {pageCount > 1 && (
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Pagination count={pageCount} page={page} onChange={(_e, val) => setPage(val)} />
        </Box>
      )}
    </Box>
  );
}
