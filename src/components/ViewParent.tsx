'use client';

import Link from 'next/link';
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
import { useUser, User } from '@/hooks/useUser';
import Loading from "@/components/Loading";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

// Toastr global config
toastr.options = {
  closeButton: true,
  progressBar: true,
  positionClass: 'toast-top-right',
  timeOut: 5000,
};

// Styled Components
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

export default function ViewParent() {
  const { fetchParent, updateUser, deleteUser } = useUser();
  const [parents, setParents] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedParent, setSelectedParent] = useState<User | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<User>>({});
  const rowsPerPage = 10;

  // useEffect(() => {
  //   fetchParent().subscribe({
  //     next: (parentList) => {
  //       setParents(parentList.map((p) => ({ ...p, userId: String(p.userId) })));
  //       setLoading(false);
  //     },
  //     error: (err) => {
  //       console.error('Fetch parent error:', err.message);
  //       toastr.error('Failed to fetch parent data');
  //       setLoading(false);
  //     },
  //   });
  // }, [fetchParent]);

  useEffect(() => {
    fetchParent().subscribe({
      next: (parentList) => {
        setParents(parentList.map((p) => ({ ...p, userId: String(p.userId) })));
        setLoading(false);
      },
      error: (err) => {
        console.error('Fetch parent error:', err.message);
        toastr.error('Failed to fetch parent data');
        setLoading(false);
      },
    });
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // Edit handlers
  const handleEditClick = (parentMember: User) => {
    setSelectedParent(parentMember);
    setFormData({
      ...parentMember,
      role: parentMember.role ? { role_name: parentMember.role.role_name } : undefined,
    });
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setSelectedParent(null);
    setFormData({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'positionIds' ? value.split(',').map(Number) : name === 'role' ? { role_name: value } : value,
    }));
  };

  const handleEditSave = async () => {
    if (!selectedParent) return;
    try {
      await updateUser(selectedParent.userId, formData);
      setParents((prev) =>
        prev.map((p) =>
          p.userId === selectedParent.userId ? { ...p, ...formData } : p
        )
      );
      toastr.success('Parent updated successfully');
      handleEditClose();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update parent';
      console.error('Update failed:', errorMessage);
      toastr.error(errorMessage);
    }
  };

  // Delete handler
  const handleDelete = async (userId: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this parent?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        await deleteUser(userId);
        setParents((prev) => prev.filter((p) => p.userId !== userId));
        toastr.success('Parent deleted successfully');
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to delete parent';
        console.error('Delete failed:', errorMessage);
        toastr.error(errorMessage);
      }
    }
  };

  // Filtering & pagination
  const filteredParents = parents.filter((p) =>
    [p.parentId, p.fullname, p.email, p.userPositions?.join(', ')]
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredParents.length / rowsPerPage);
  const paginatedParents = filteredParents.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  if (loading) return <Loading />;

  return (
    <Box component="main" sx={{ flexGrow: 1, bgcolor: '#F9FAFB', p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 500 }}>
          Parents List ({filteredParents.length})
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: '0.875rem' }}>
          <span>Session 2025/2026</span>
          <ChevronRight size={16} />
          <span>Parents</span>
        </Box>
      </Box>

      {/* Actions */}
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
          placeholder="Search parents"
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
      <TableContainer component={Paper} elevation={0} sx={{ border: 1, borderColor: 'grey.200' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell className="header">Parent ID</StyledTableCell>
              <StyledTableCell className="header">Name</StyledTableCell>
              <StyledTableCell className="header">Email</StyledTableCell>
              <StyledTableCell className="header">Role</StyledTableCell>
              <StyledTableCell className="header">Positions</StyledTableCell>
              <StyledTableCell className="header" align="right">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedParents.map((parent) => (
              <TableRow key={parent.userId}>
                <StyledTableCell>{parent.parentId || 'N/A'}</StyledTableCell>
                <StyledTableCell>{parent.fullname || 'N/A'}</StyledTableCell>
                <StyledTableCell>{parent.email}</StyledTableCell>
                <StyledTableCell>{parent.role?.role_name || 'N/A'}</StyledTableCell>
                <StyledTableCell>{parent.userPositions?.join(', ') || 'None'}</StyledTableCell>
                <StyledTableCell align="right">
                  <Link href={`/userprofile/${parent.userId}`}>
                    <ActionIconButton size="small"><Eye size={16} /></ActionIconButton>
                  </Link>
                  <ActionIconButton size="small" onClick={() => handleEditClick(parent)}>
                    <Edit size={16} />
                  </ActionIconButton>
                  <ActionIconButton size="small" onClick={() => handleDelete(parent.userId)}>
                    <Trash2 size={16} />
                  </ActionIconButton>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Pagination count={pageCount} page={page} onChange={handlePageChange} color="primary" />
      </Box>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onClose={handleEditClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit Parent</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Full Name"
            name="fullname"
            value={formData.fullname || ''}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Email"
            name="email"
            value={formData.email || ''}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Role"
            name="role"
            value={formData.role?.role_name || ''}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Position IDs (comma-separated)"
            name="positionIds"
            value={formData.userPositions?.join(',') || ''}
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
