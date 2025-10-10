'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  ButtonGroup,
  Button,
  IconButton,
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
import { useDepartment, Department } from '@/hooks/useDepartment';
import toastr from 'toastr';
import Swal from 'sweetalert2';
import 'toastr/build/toastr.min.css';

// Toast config
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

export default function ViewDepartment() {
  const { fetchDepartment, updateDepartment, deleteDepartment, error } = useDepartment();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const [editOpen, setEditOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);
  const [formData, setFormData] = useState<Partial<Department>>({});
  const [updatingDeptUuid, setUpdatingDeptUuid] = useState<string | null>(null);

  // useEffect(() => {
  //   fetchDepartment().subscribe({
  //     next: (deptList) => {
  //       if (Array.isArray(deptList)) {
  //         setDepartments(deptList);
  //       } else {
  //         console.error('Expected array but got:', deptList);
  //         toastr.error('Invalid department data received.');
  //         setDepartments([]);
  //       }
  //     },
  //     error: () => {
  //       toastr.error('Failed fetching departments');
  //     },
  //   });
  // }, [fetchDepartment]);

    useEffect(() => {
    fetchDepartment().subscribe({
      next: (deptList) => {
        if (Array.isArray(deptList)) {
          setDepartments(deptList);
        } else {
          console.error('Expected array but got:', deptList);
          toastr.error('Invalid department data received.');
          setDepartments([]);
        }
      },
      error: () => {
        toastr.error('Failed fetching departments');
      },
    });
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => setPage(value);

  const filtered = departments.filter((d) =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const pageCount = Math.ceil(filtered.length / rowsPerPage);
  const paginated = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const openEdit = (dept: Department) => {
    setSelectedDept(dept);
    setFormData({ name: dept.name, department_description: dept.department_description });
    setEditOpen(true);
  };

  const closeEdit = () => {
    setEditOpen(false);
    setSelectedDept(null);
    setFormData({});
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = async () => {
    if (!selectedDept) return;

    const deptId = selectedDept.department_uuid;
    setUpdatingDeptUuid(deptId);

    if (!formData.name) {
      toastr.error('Please provide a department name.');
      setUpdatingDeptUuid(null);
      return;
    }

    try {
      await updateDepartment(deptId, formData).toPromise();

      setDepartments((prev) =>
        prev.map((d) =>
          d.department_uuid === deptId ? { ...d, ...formData } : d
        )
      );

      toastr.success('Department updated successfully!');
      closeEdit();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update department.';
      console.error('Update failed:', errorMessage);
      toastr.error(errorMessage);
    } finally {
      setUpdatingDeptUuid(null);
    }
  };

  // Delete confirmation
  const confirmDelete = async (deptUuid: string) => {
    await Swal.fire({
      title: 'Delete Department?',
      text: 'This will be permanent.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true,
      preConfirm: async () => {
        Swal.showLoading();
        try {
          await deleteDepartment(deptUuid).toPromise();
          setDepartments((prev) => prev.filter((d) => d.department_uuid !== deptUuid));
          toastr.success('Department deleted');
        } catch (err: unknown) {
          Swal.hideLoading();
          const errorMessage = err instanceof Error ? err.message : 'Delete failed';
          toastr.error(errorMessage);
          throw err;
        }
      },
    });
  };

  if (error) {
    return (
      <Box p={3}>
        <Typography color="error">{error.message}</Typography>
      </Box>
    );
  }

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: '#F9FAFB' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">Department List ({filtered.length})</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary', fontSize: 14 }}>
          <span>Session 2025/2026</span>
          <ChevronRight size={16} />
          <span>Departments</span>
        </Box>
      </Box>

      {/* Actions */}
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
          placeholder="Search departments"
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start"><Search size={20} color="gray" /></InputAdornment>
            ),
          }}
          sx={{ width: 200 }}
        />
      </Box>

      {/* Table */}
      <TableContainer component={Paper} sx={{ border: 1, borderColor: 'grey.200' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell className="header">#</StyledTableCell>
              <StyledTableCell className="header">Name</StyledTableCell>
              <StyledTableCell className="header">Department Id</StyledTableCell>
              <StyledTableCell className="header" align="right">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginated.map((dept, idx) => (
              <TableRow key={dept.department_uuid}>
                <StyledTableCell>{(page - 1) * rowsPerPage + idx + 1}</StyledTableCell>
                <StyledTableCell>
                  <Link href={`/department/${dept.department_uuid}`}>
                    <p>{dept.name}</p>
                  </Link>
                </StyledTableCell>
                <StyledTableCell>{dept.department_uuid}</StyledTableCell>
                <StyledTableCell align="right">
                  <Link href={`/department/${dept.department_uuid}`}>
                    <ActionIconButton size="small"><Eye size={16} /></ActionIconButton>
                  </Link>
                  <ActionIconButton size="small" onClick={() => openEdit(dept)}>
                    <Edit size={16} />
                  </ActionIconButton>
                  <ActionIconButton size="small" onClick={() => confirmDelete(dept.department_uuid)}>
                    <Trash2 size={16} />
                  </ActionIconButton>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box sx={{ mt: 2 }}>
        <Pagination
          count={pageCount}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onClose={closeEdit} fullWidth maxWidth="sm">
        <DialogTitle>Edit Department</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            fullWidth
            label="Name"
            name="name"
            disabled={updatingDeptUuid === selectedDept?.department_uuid}
            value={formData.name || ''}
            onChange={onInputChange}
          />
          <TextField
            margin="dense"
            fullWidth
            label="Description"
            name="department_description"
            disabled={updatingDeptUuid === selectedDept?.department_uuid}
            value={formData.department_description || ''}
            onChange={onInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEdit} disabled={updatingDeptUuid === selectedDept?.department_uuid}>
            Cancel
          </Button>
          <Button
            onClick={saveEdit}
            variant="contained"
            color="primary"
            disabled={updatingDeptUuid === selectedDept?.department_uuid}
          >
            {updatingDeptUuid === selectedDept?.department_uuid ? 'Updating...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
