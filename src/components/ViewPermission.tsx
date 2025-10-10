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
import { usePermission, Permission } from "@/hooks/usePermission";
import Loading from "@/components/Loading";

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

export default function ViewPermission() {
  const { fetchPermissions, loading, error } = usePermission();
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  // useEffect(() => {
  //   const sub = fetchPermissions().subscribe({
  //     next: (permList) => {
  //       console.log("Fetched permissions:", permList);
  //       setPermissions(permList);
  //     },
  //     error: (err) => {
  //       console.error("Fetch permissions error:", err.message);
  //     },
  //   });
  //   return () => sub.unsubscribe();
  // }, [fetchPermissions]);

    useEffect(() => {
    const sub = fetchPermissions().subscribe({
      next: (permList) => {
        console.log("Fetched permissions:", permList);
        setPermissions(permList);
      },
      error: (err) => {
        console.error("Fetch permissions error:", err.message);
      },
    });
    return () => sub.unsubscribe();
  }, []);

  const filtered = permissions.filter(
    (p) =>
      p.permissionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.permissionName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filtered.length / rowsPerPage);
  const paginated = filtered.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  if (loading) return <Loading />;
  if (error)
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">Error: {error.message}</Typography>
      </Box>
    );

  return (
    <Box component="main" sx={{ flexGrow: 1, bgcolor: "#F9FAFB", p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 500 }}>
          Permission List ({filtered.length})
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
          <span>Permissions</span>
        </Box>
      </Box>

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
          placeholder="Search permissions"
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

      <TableContainer
        component={Paper}
        elevation={0}
        sx={{ border: 1, borderColor: "grey.200" }}
      >
        <Table size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell className="header">Permission ID</StyledTableCell>
              <StyledTableCell className="header">Permission Name</StyledTableCell>
              <StyledTableCell className="header" align="right">
                Action
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginated.map((perm) => (
              <TableRow
                key={perm.permissionId}
                sx={{
                  "&:nth-of-type(odd)": {
                    backgroundColor: "rgba(244, 114, 182, 0.1)",
                  },
                }}
              >
                <StyledTableCell sx={{ color: "pink.500" }}>
                  {perm.permissionId}
                </StyledTableCell>
                <StyledTableCell>{perm.permissionName}</StyledTableCell>
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
          {Math.min(page * rowsPerPage, filtered.length)} of {filtered.length} results
        </Typography>
        <Pagination
          count={pageCount}
          page={page}
          onChange={(_, value) => setPage(value)}
          shape="rounded"
          size="small"
        />
      </Box>
    </Box>
  );
}
