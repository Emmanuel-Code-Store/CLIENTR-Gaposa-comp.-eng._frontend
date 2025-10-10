// "use client";

// import { useState, useEffect } from "react";
// import {
//   Box,
//   Paper,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   ButtonGroup,
//   Button,
//   IconButton,
//   TextField,
//   InputAdornment,
//   Pagination,
//   styled,
// } from "@mui/material";
// import {
//   Search,
//   ChevronRight,
//   Copy,
//   FileText,
//   FileSpreadsheet,
//   FileIcon as FilePdf,
//   Printer,
//   Eye,
//   Edit,
//   Trash2,
// } from "lucide-react";
// import { useUser } from "@/hooks/useUser";
// import Loading from "@/components/Loading";

// // Styled components
// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   padding: theme.spacing(1.5),
//   borderColor: theme.palette.grey[200],
//   "&.header": {
//     backgroundColor: theme.palette.background.paper,
//     fontWeight: 500,
//     color: theme.palette.text.primary,
//   },
// }));

// const ActionButton = styled(Button)(({ theme }) => ({
//   backgroundColor: theme.palette.grey[200],
//   color: theme.palette.text.primary,
//   textTransform: "none",
//   "&:hover": {
//     backgroundColor: theme.palette.grey[300],
//   },
// }));

// const ActionIconButton = styled(IconButton)(({ theme }) => ({
//   padding: theme.spacing(0.5),
//   backgroundColor: theme.palette.primary.main,
//   color: theme.palette.common.white,
//   "&:hover": {
//     backgroundColor: theme.palette.primary.dark,
//   },
//   "& + &": {
//     marginLeft: theme.spacing(1),
//   },
// }));

// interface Staff {
//   userId: string;
//   fullname: string | null;
//   email: string;
//   role: { role_name: string };
//   positionIds?: number[];
//   staffId?: string | null;
// }

// export default function ViewNews() {
//   const { fetchStaff, loading, error } = useUser();
//   const [staff, setStaff] = useState<Staff[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(1);
//   const rowsPerPage = 10;

//   useEffect(() => {
//   fetchStaff().subscribe({
//     next: (staffList) => {
//       const normalizedStaff: Staff[] = staffList.map((s) => ({
//         ...s,
//         staffId: s.staffId ?? undefined,
//       }));
//       setStaff(normalizedStaff);
//     },
//     error: (err) => {
//       console.error('ViewStaff: Fetch staff error:', err.message);
//     },
//   });
// }, []);


//   // Filter staff based on search term
//   const filteredStaff = staff.filter(
//     (s) =>
//       s.staffId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       s.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       s.positionIds?.join(", ").toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Pagination
//   const pageCount = Math.ceil(filteredStaff.length / rowsPerPage);
//   const paginatedStaff = filteredStaff.slice(
//     (page - 1) * rowsPerPage,
//     page * rowsPerPage
//   );

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(e.target.value);
//     setPage(1); 
//   };

//   const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
//     setPage(value);
//   };

//   // Handle loading state
//   if (loading) {
//     return <Loading />;
//   }

//   // Handle error state
//   if (error) {
//     return (
//       <Box sx={{ p: 3 }}>
//         <Typography color="error">Error: {error.message}</Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box component="main" sx={{ flexGrow: 1, bgcolor: "#F9FAFB", p: 3 }}>
//       {/* Header */}
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           mb: 3,
//         }}
//       >
//         <Typography variant="h5" sx={{ fontWeight: 500 }}>
//           News List ({filteredStaff.length})
//         </Typography>
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             gap: 1,
//             color: "text.secondary",
//             fontSize: "0.875rem",
//           }}
//         >
//           <span>Session 2025/2026</span>
//           <ChevronRight size={16} />
//           <span>Staff</span>
//         </Box>
//       </Box>

//       {/* Actions */}
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           mb: 2,
//         }}
//       >
//         <ButtonGroup size="small">
//           <ActionButton startIcon={<Copy size={16} />}>Copy</ActionButton>
//           <ActionButton startIcon={<FileText size={16} />}>CSV</ActionButton>
//           <ActionButton startIcon={<FileSpreadsheet size={16} />}>Excel</ActionButton>
//           <ActionButton startIcon={<FilePdf size={16} />}>PDF</ActionButton>
//           <ActionButton startIcon={<Printer size={16} />}>Print</ActionButton>
//         </ButtonGroup>

//         <TextField
//           size="small"
//           placeholder="Search staff"
//           value={searchTerm}
//           onChange={handleSearchChange}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <Search size={20} color="gray" />
//               </InputAdornment>
//             ),
//           }}
//           sx={{ width: 200 }}
//         />
//       </Box>

//       {/* Table */}
//       <TableContainer component={Paper} elevation={0} sx={{ border: 1, borderColor: "grey.200" }}>
//         <Table size="small">
//           <TableHead>
//             <TableRow>
//               <StyledTableCell className="header">Staff ID</StyledTableCell>
//               <StyledTableCell className="header">Name</StyledTableCell>
//               <StyledTableCell className="header">Email</StyledTableCell>
//               <StyledTableCell className="header">Role</StyledTableCell>
//               <StyledTableCell className="header">Positions</StyledTableCell>
//               <StyledTableCell className="header" align="right">
//                 Action
//               </StyledTableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {paginatedStaff.map((staffMember) => (
//               <TableRow
//                 key={staffMember.userId}
//                 sx={{
//                   "&:nth-of-type(odd)": {
//                     backgroundColor: "rgba(244, 114, 182, 0.1)", // Light pink for odd rows
//                   },
//                 }}
//               >
//                 <StyledTableCell sx={{ color: "pink.500" }}>
//                   {staffMember.staffId || "N/A"}
//                 </StyledTableCell>
//                 <StyledTableCell>{staffMember.fullname || "N/A"}</StyledTableCell>
//                 <StyledTableCell>{staffMember.email}</StyledTableCell>
//                 <StyledTableCell>{staffMember.role.role_name}</StyledTableCell>
//                 <StyledTableCell>
//                   {staffMember.positionIds?.join(", ") || "None"}
//                 </StyledTableCell>
//                 <StyledTableCell align="right">
//                   <ActionIconButton size="small">
//                     <Eye size={16} />
//                   </ActionIconButton>
//                   <ActionIconButton size="small">
//                     <Edit size={16} />
//                   </ActionIconButton>
//                   <ActionIconButton size="small">
//                     <Trash2 size={16} />
//                   </ActionIconButton>
//                 </StyledTableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Pagination */}
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           mt: 2,
//           color: "text.secondary",
//           fontSize: "0.875rem",
//         }}
//       >
//         <Typography variant="body2">
//           Showing {(page - 1) * rowsPerPage + 1}-
//           {Math.min(page * rowsPerPage, filteredStaff.length)} of {filteredStaff.length} results
//         </Typography>
//         <Pagination
//           count={pageCount}
//           page={page}
//           onChange={handlePageChange}
//           shape="rounded"
//           size="small"
//         />
//       </Box>
//     </Box>
//   );
// }






















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
import { lastValueFrom } from "rxjs";
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

// Staff type aligned with API (email may be null)
interface Staff {
  userId: string;
  fullname: string | null;
  email: string | null;
  role: { role_name: string };
  positionIds?: number[];
  staffId?: string | null;
}

export default function ViewNews() {
  const { fetchStaff, loading, error } = useUser();
  const [staff, setStaff] = useState<Staff[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  // Fetch staff on mount
  useEffect(() => {
    const loadStaff = async () => {
      try {
        const staffList = await lastValueFrom(fetchStaff());

        // Normalize data (fallback values)
        const normalizedStaff: Staff[] = staffList.map((s) => ({
          ...s,
          staffId: s.staffId ?? undefined,
          email: s.email ?? null,
          fullname: s.fullname ?? null,
        }));

        setStaff(normalizedStaff);
      } catch (err) {
        console.error("ViewNews: Fetch staff error:", (err as Error).message);
      }
    };

    loadStaff();
  }, [fetchStaff]);

  // Filter staff based on search term (safe null checks)
  const filteredStaff = staff.filter((s) =>
    [
      s.staffId ?? "",
      s.fullname ?? "",
      s.email ?? "",
      s.positionIds?.join(", ") ?? "",
    ]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Pagination
  const pageCount = Math.ceil(filteredStaff.length / rowsPerPage);
  const paginatedStaff = filteredStaff.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // Handle loading state
  if (loading) return <Loading />;

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
          News List ({filteredStaff.length})
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
          <span>Staff</span>
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
                <StyledTableCell>{staffMember.fullname || "N/A"}</StyledTableCell>
                <StyledTableCell>{staffMember.email || "N/A"}</StyledTableCell>
                <StyledTableCell>{staffMember.role.role_name}</StyledTableCell>
                <StyledTableCell>
                  {staffMember.positionIds?.join(", ") || "None"}
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
