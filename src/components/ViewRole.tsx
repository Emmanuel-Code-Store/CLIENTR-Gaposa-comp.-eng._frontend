"use client";

import { useState, useEffect } from "react";
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

// Local clean Staff type for frontend
interface Staff {
  userId: string;
  staffId?: string; // undefined if not present
  fullname: string;
  email: string;
  role: string;
  positionIds: number[];
}

export default function ViewRole() {
  const { fetchStaff, loading, error } = useUser();
  const [staff, setStaff] = useState<Staff[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    fetchStaff().subscribe({
      next: (staffList) => {
        console.log("ViewStaff: Fetched staff:", staffList);

        const mappedStaff: Staff[] = staffList.map((s) => ({
          userId: s.userId,
          staffId: s.staffId ?? undefined,
          fullname: s.fullname ?? "N/A",
          email: s.email ?? "N/A",
          role: s.roleName ?? "Unknown",
          positionIds: s.userPositions?.map((p) => p.positionId) ?? [],
        }));

        setStaff(mappedStaff);
      },
      error: (err) => {
        console.error("ViewStaff: Fetch staff error:", err.message);
      },
    });
  }, []);

  const filteredStaff = staff.filter(
    (s) =>
      s.staffId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.positionIds.join(", ").toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const pageCount = Math.ceil(filteredStaff.length / rowsPerPage);
  const paginatedStaff = filteredStaff.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset to first page on search
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  // Handle loading state
  if (loading) {
    return <Loading />;
  }

  // Handle error state
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 500 }}>
          Assessment List ({filteredStaff.length})
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
          <span>Session 2025/2026</span>
          <ChevronRight size={16} />
          <span>Assessment</span>
        </Box>
      </Box>

      {/* Actions */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <ButtonGroup size="small">
          <ActionButton startIcon={<Copy size={16} />}>Copy</ActionButton>
          <ActionButton startIcon={<FileText size={16} />}>CSV</ActionButton>
          <ActionButton startIcon={<FileSpreadsheet size={16} />}>
            Excel
          </ActionButton>
          <ActionButton startIcon={<FilePdf size={16} />}>PDF</ActionButton>
          <ActionButton startIcon={<Printer size={16} />}>Print</ActionButton>
        </ButtonGroup>

        <TextField
          size="small"
          placeholder="Search staff"
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
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{ border: 1, borderColor: "grey.200" }}
      >
        <Table size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell className="header">Staff ID</StyledTableCell>
              <StyledTableCell className="header">Name</StyledTableCell>
              <StyledTableCell className="header">Email</StyledTableCell>
              <StyledTableCell className="header">Role</StyledTableCell>
              <StyledTableCell className="header">Positions</StyledTableCell>
              <StyledTableCell className="header" align="right">
                Action
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedStaff.map((staffMember) => (
              <TableRow
                key={staffMember.userId}
                sx={{
                  "&:nth-of-type(odd)": {
                    backgroundColor: "rgba(244, 114, 182, 0.1)", // Light pink for odd rows
                  },
                }}
              >
                <StyledTableCell sx={{ color: "pink.500" }}>
                  {staffMember.staffId || "N/A"}
                </StyledTableCell>
                <StyledTableCell>{staffMember.fullname}</StyledTableCell>
                <StyledTableCell>{staffMember.email}</StyledTableCell>
                <StyledTableCell>{staffMember.role}</StyledTableCell>
                <StyledTableCell>
                  {staffMember.positionIds.length > 0
                    ? staffMember.positionIds.join(", ")
                    : "None"}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <ActionIconButton size="small">
                    <Eye size={16} />
                  </ActionIconButton>
                  <ActionIconButton size="small">
                    <Edit size={16} />
                  </ActionIconButton>
                  <ActionIconButton size="small">
                    <Trash2 size={16} />
                  </ActionIconButton>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
          color: "text.secondary",
          fontSize: "0.875rem",
        }}
      >
        <Typography variant="body2">
          Showing {(page - 1) * rowsPerPage + 1}-
          {Math.min(page * rowsPerPage, filteredStaff.length)} of{" "}
          {filteredStaff.length} results
        </Typography>
        <Pagination
          count={pageCount}
          page={page}
          onChange={handlePageChange}
          shape="rounded"
          size="small"
        />
      </Box>
    </Box>
  );
}
