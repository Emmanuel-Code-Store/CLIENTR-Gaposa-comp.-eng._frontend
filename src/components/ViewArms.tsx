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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
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
import { useArms, Arms } from '@/hooks/useArms';
import toastr from 'toastr';
import Swal from 'sweetalert2';
import 'toastr/build/toastr.min.css';
import Link from 'next/link';

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

export default function ViewArms() {
  const { fetchArms, updateArms, deleteArms, error } = useArms();
  const [arms, setArms] = useState<Arms[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const [editOpen, setEditOpen] = useState(false);
  const [selectedArm, setSelectedArm] = useState<Arms | null>(null);
  const [formData, setFormData] = useState<Partial<Arms>>({});
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  // useEffect(() => {
  //   fetchArms().subscribe({
  //     next: (list) => {
  //       if (Array.isArray(list)) {
  //         setArms(list);
  //       } else {
  //         console.error('Expected array but got:', list);
  //         toastr.error('Invalid arms data received.');
  //         setArms([]);
  //       }
  //     },
  //     error: (err) => {
  //       toastr.error('Failed to fetch arms.');
  //       console.error('Fetch arms error:', err.message);
  //     },
  //   });
  // }, [fetchArms]);

    useEffect(() => {
    fetchArms().subscribe({
      next: (list) => {
        if (Array.isArray(list)) {
          setArms(list);
        } else {
          console.error('Expected array but got:', list);
          toastr.error('Invalid arms data received.');
          setArms([]);
        }
      },
      error: (err) => {
        toastr.error('Failed to fetch arms.');
        console.error('Fetch arms error:', err.message);
      },
    });
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const filtered = arms.filter((arm) =>
    `${arm.name || ''} ${arm.arms_id || ''}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
  const pageCount = Math.ceil(filtered.length / rowsPerPage);
  const paginated = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const openEdit = (arm: Arms) => {
    setSelectedArm(arm);
    setFormData({
      name: arm.name || '',
      arms_description: arm.arms_description || '',
    });
    setEditOpen(true);
  };

  const closeEdit = () => {
    setEditOpen(false);
    setSelectedArm(null);
    setFormData({});
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = async () => {
    if (!selectedArm) return;

    const { arms_id } = selectedArm;
    setUpdatingId(selectedArm.id);

    if (!formData.name) {
      toastr.error('Arm name is required.');
      setUpdatingId(null);
      return;
    }

    try {
      const updated = await updateArms(arms_id, formData).toPromise();
      setArms((prev) =>
        prev.map((a) => (a.arms_id === arms_id ? (updated as Arms) : a))
      );

      toastr.success('Arm updated successfully.');
      closeEdit();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update arm.';
      toastr.error(errorMessage);
    } finally {
      setUpdatingId(null);
    }
  };

  const confirmDelete = async (id: string) => {
    await Swal.fire({
      title: 'Delete Arm?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true,
      preConfirm: async () => {
        Swal.showLoading();
        try {
          await deleteArms(id).toPromise();
          setArms((prev) => prev.filter((a) => a.arms_id !== id));
          toastr.success('Arm deleted.');
        } catch (err: unknown) {
          Swal.hideLoading();
          const errorMessage = err instanceof Error ? err.message : 'Delete failed.';
          toastr.error(errorMessage);
          throw err;
        }
      },
    });
  };

  if (error) return <Box p={3}><Typography color="error">{error.message}</Typography></Box>;

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: '#F9FAFB' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">Arms List ({filtered.length})</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary', fontSize: 14 }}>
          <span>Session 2025/2026</span>
          <ChevronRight size={16} />
          <span>Arms</span>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <ButtonGroup size="small">
          <ActionButton startIcon={<Copy size={16} />}>Copy</ActionButton>
          <ActionButton startIcon={<FileText size={16} />}>CSV</ActionButton>
          <ActionButton startIcon={<FileSpreadsheet size={16} />}>Excel</ActionButton>
          <ActionButton startIcon={<FilePdf size={16} />}>PDF</ActionButton>
          <ActionButton startIcon={<Printer size={16} />}>Print</ActionButton>
        </ButtonGroup>

        <TextField
          size="small"
          placeholder="Search arms"
          value={searchTerm}
          onChange={handleSearch}
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

      <TableContainer component={Paper} sx={{ border: 1, borderColor: 'grey.200' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell className="header">#</StyledTableCell>
              <StyledTableCell className="header">Arm Name</StyledTableCell>
              <StyledTableCell className="header">Arm ID</StyledTableCell>
              <StyledTableCell className="header">Description</StyledTableCell>
              <StyledTableCell className="header" align="right">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginated.map((arm, idx) => (
              <TableRow key={arm.arms_id}>
                <StyledTableCell>{(page - 1) * rowsPerPage + idx + 1}</StyledTableCell>
                <StyledTableCell>{arm.name || 'N/A'}</StyledTableCell>
                <StyledTableCell>{arm.arms_id}</StyledTableCell>
                <StyledTableCell>{arm.arms_description || '—'}</StyledTableCell>
                <StyledTableCell align="right">
                  <Link href={`/arms/${arm.arms_id}`}>
                    <ActionIconButton size="small"><Eye size={16} /></ActionIconButton>
                  </Link>
                  <ActionIconButton size="small" onClick={() => openEdit(arm)}>
                    <Edit size={16} />
                  </ActionIconButton>
                  <ActionIconButton size="small" onClick={() => confirmDelete(arm.arms_id)}>
                    <Trash2 size={16} />
                  </ActionIconButton>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 2 }}>
        <Pagination
          count={pageCount}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
        />
      </Box>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onClose={closeEdit} fullWidth maxWidth="sm">
        <DialogTitle>Edit Arm</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Arm Name"
            name="name"
            value={formData.name || ''}
            onChange={onInputChange}
            disabled={updatingId === selectedArm?.id}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Description"
            name="arms_description"
            value={formData.arms_description || ''}
            onChange={onInputChange}
            disabled={updatingId === selectedArm?.id}
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEdit} disabled={updatingId === selectedArm?.id}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={saveEdit}
            disabled={updatingId === selectedArm?.id}
          >
            {updatingId === selectedArm?.id ? 'Updating...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}