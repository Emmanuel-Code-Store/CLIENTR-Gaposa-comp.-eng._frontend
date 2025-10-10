"use client";

import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
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
  CircularProgress,
} from '@mui/material';
import {
  Search,
  ChevronRight,
  Copy,
  FileText,
  FileSpreadsheet,
  FileIcon as FilePdf,
  Printer,
  Trash2,
} from 'lucide-react';
import { useSubscription, Subscription } from '../hooks/useSubscription';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

toastr.options = {
  closeButton: true,
  progressBar: true,
  positionClass: 'toast-top-right',
  timeOut: 5000,
};

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

export default function ViewSubscriptions() {
  const {
    fetchSubscriptions,
    deleteSubscription,
    loading,
    error,
  } = useSubscription();
  const [subs, setSubs] = useState<Subscription[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  // useEffect(() => {
  //   fetchSubscriptions().subscribe({
  //     next: (data) => setSubs(data),
  //     error: (err) => {
  //       console.error('Fetch subscriptions error:', err.message);
  //       toastr.error('Failed to fetch subscriptions');
  //     },
  //   });
  // }, [fetchSubscriptions]);

    useEffect(() => {
    fetchSubscriptions().subscribe({
      next: (data) => setSubs(data),
      error: (err) => {
        console.error('Fetch subscriptions error:', err.message);
        toastr.error('Failed to fetch subscriptions');
      },
    });
  }, []);

  const filteredSubs = subs.filter((sub) =>
    sub.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredSubs.length / rowsPerPage);
  const paginatedSubs = filteredSubs.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handlePageChange = (_e: unknown, value: number) => {
    setPage(value);
  };

  const handleDelete = (uuid: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This subscription will be deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSubscription(uuid).subscribe({
          next: () => {
            setSubs((prev) => prev.filter((s) => s.subscription_uuid !== uuid));
            toastr.success('Subscription deleted successfully');
          },
          error: (err) => {
            console.error('Delete failed:', err.message);
            toastr.error(err.message || 'Failed to delete subscription');
          },
        });
      }
    });
  };

  if (loading) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Box>
    );
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 500 }}>
          Subscriptions ({filteredSubs.length})
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: '0.875rem' }}>
          <span>Dashboard</span>
          <ChevronRight size={16} />
          <span>Subscriptions</span>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <ButtonGroup size="small">
          <ActionButton startIcon={<Copy size={16} />}>Copy</ActionButton>
          <ActionButton startIcon={<FileText size={16} />}>CSV</ActionButton>
          <ActionButton startIcon={<FileSpreadsheet size={16} />}>Excel</ActionButton>
          <ActionButton startIcon={<FilePdf size={16} />}>PDF</ActionButton>
          <ActionButton startIcon={<Printer size={16} />}>Print</ActionButton>
        </ButtonGroup>
        <TextField
          size="small"
          placeholder="Search by email"
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

      <TableContainer component={Paper} elevation={0} sx={{ border: 1, borderColor: 'grey.200' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell className="header">Email</StyledTableCell>
              <StyledTableCell className="header">Subscribed At</StyledTableCell>
              <StyledTableCell className="header" align="right">
                Action
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedSubs.map((sub) => (
              <TableRow key={sub.subscription_uuid}>
                <StyledTableCell>{sub.email}</StyledTableCell>
                <StyledTableCell>
                  {sub.createdAt ? new Date(sub.createdAt).toLocaleString() : '—'}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <ActionIconButton size="small" onClick={() => handleDelete(sub.subscription_uuid)}>
                    <Trash2 size={16} />
                  </ActionIconButton>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Pagination count={pageCount} page={page} onChange={handlePageChange} color="primary" size="small" />
      </Box>
    </Box>
  );
}