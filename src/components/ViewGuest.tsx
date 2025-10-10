'use client';

import { useState, useEffect } from 'react';
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
} from '@mui/material';
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
} from 'lucide-react';
import { useUser } from '@/hooks/useUser';
import Loading from "@/components/Loading";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(1.5),
  borderColor: theme.palette.grey[200],
  '&.header': {
    backgroundColor: theme.palette.background.paper,
    fontWeight: 500,
    color: theme.palette.text.primary,
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  color: theme.palette.text.primary,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: theme.palette.grey[300],
  },
}));

const ActionIconButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(0.5),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  '& + &': {
    marginLeft: theme.spacing(1),
  },
}));

interface Staff {
  userId: string;
  staffId?: string | null;
  fullname: string | null;
  email: string | null;
  role: string;
}

export default function ViewGuest() {
  const { fetchStaff, loading, error } = useUser();
  const [staff, setStaff] = useState<Staff[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  // useEffect(() => {
  //   fetchStaff().subscribe({
  //     next: (staffList) => {
  //       console.log('ViewStaff: Fetched staff:', staffList);

  //       const normalized: Staff[] = staffList.map((s) => ({
  //         userId: s.userId,
  //         staffId: s.staffId ?? null,
  //         fullname: s.fullname,
  //         email: s.email ?? null,
  //         role: s.roleName ?? s.role?.role_name ?? 'Unknown',
  //       }));

  //       setStaff(normalized);
  //     },
  //     error: (err) => {
  //       console.error('ViewStaff: Fetch staff error:', err.message);
  //     },
  //   });
  // }, [fetchStaff]);

   useEffect(() => {
    fetchStaff().subscribe({
      next: (staffList) => {
        console.log('ViewStaff: Fetched staff:', staffList);

        const normalized: Staff[] = staffList.map((s) => ({
          userId: s.userId,
          staffId: s.staffId ?? null,
          fullname: s.fullname,
          email: s.email ?? null,
          role: s.roleName ?? s.role?.role_name ?? 'Unknown',
        }));

        setStaff(normalized);
      },
      error: (err) => {
        console.error('ViewStaff: Fetch staff error:', err.message);
      },
    });
  }, []);

  const filteredStaff = staff.filter(
    (s) =>
      s.staffId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredStaff.length / rowsPerPage);
  const paginatedStaff = filteredStaff.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1); 
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">Error: {error.message}</Typography>
      </Box>
    );
  }

  return (
    <Box component="main" sx={{ flexGrow: 1, bgcolor: '#F9FAFB', p: 3 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 500 }}>
          Guest List ({filteredStaff.length})
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            color: 'text.secondary',
            fontSize: '0.875rem',
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
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
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
        sx={{ border: 1, borderColor: 'grey.200' }}
      >
        <Table size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell className="header">Staff ID</StyledTableCell>
              <StyledTableCell className="header">Name</StyledTableCell>
              <StyledTableCell className="header">Email</StyledTableCell>
              <StyledTableCell className="header">Role</StyledTableCell>
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
                  '&:nth-of-type(odd)': {
                    backgroundColor: 'rgba(244, 114, 182, 0.1)', // Light pink for odd rows
                  },
                }}
              >
                <StyledTableCell sx={{ color: 'pink.500' }}>
                  {staffMember.staffId || 'N/A'}
                </StyledTableCell>
                <StyledTableCell>{staffMember.fullname || 'N/A'}</StyledTableCell>
                <StyledTableCell>{staffMember.email || 'N/A'}</StyledTableCell>
                <StyledTableCell>{staffMember.role}</StyledTableCell>
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
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 2,
          color: 'text.secondary',
          fontSize: '0.875rem',
        }}
      >
        <Typography variant="body2">
          Showing {(page - 1) * rowsPerPage + 1}-
          {Math.min(page * rowsPerPage, filteredStaff.length)} of{' '}
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
