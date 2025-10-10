'use client';

import { useState, useEffect, useCallback } from 'react';
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
import { useClass, Class } from '@/hooks/useClass';
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

export default function ViewClass() {
  const { fetchClass, updateClass, deleteClass, error } = useClass();
  const [classes, setClasses] = useState<Class[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const [editOpen, setEditOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [formData, setFormData] = useState<Partial<Class>>({});
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // const refetch = useCallback(() => {
  //   const subscription = fetchClass().subscribe({
  //     next: (list) => {
  //       if (Array.isArray(list)) {
  //         setClasses(list);
  //       } else {
  //         toastr.error('Invalid data received.');
  //         console.error('Expected array but got:', list);
  //         setClasses([]);
  //       }
  //     },
  //     error: (err) => {
  //       toastr.error('Failed to fetch classes.');
  //       console.error('Fetch error:', err.message);
  //     },
  //   });

  //   return subscription;
  // }, [fetchClass]);


    const refetch = useCallback(() => {
    const subscription = fetchClass().subscribe({
      next: (list) => {
        if (Array.isArray(list)) {
          setClasses(list);
        } else {
          toastr.error('Invalid data received.');
          console.error('Expected array but got:', list);
          setClasses([]);
        }
      },
      error: (err) => {
        toastr.error('Failed to fetch classes.');
        console.error('Fetch error:', err.message);
      },
    });

    return subscription;
  }, []);

  // useEffect(() => {
  //   const subscription = refetch();
  //   return () => subscription.unsubscribe();
  // }, [refetch]);

    useEffect(() => {
    const subscription = refetch();
    return () => subscription.unsubscribe();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const filtered = classes.filter((cls) =>
    `${cls.name || ''} ${cls.class_id || ''}`.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const pageCount = Math.ceil(filtered.length / rowsPerPage);
  const paginated = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const openEdit = (cls: Class) => {
    setSelectedClass(cls);
    setFormData({
      name: cls.name || '',
      class_description: cls.class_description || '',
    });
    setEditOpen(true);
  };

  const closeEdit = () => {
    setEditOpen(false);
    setSelectedClass(null);
    setFormData({});
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = async () => {
    if (!selectedClass) return;

    const { class_id } = selectedClass;
    if (!class_id) {
      toastr.error('Class ID is missing.');
      return;
    }

    setUpdatingId(class_id);

    if (!formData.name) {
      toastr.error('Class name is required.');
      setUpdatingId(null);
      return;
    }

    try {
      const updated = await updateClass(class_id, formData).toPromise();
      setClasses((prev) =>
        prev.map((c) => (c.class_id === class_id ? (updated as Class) : c))
      );

      toastr.success('Class updated successfully.');
      closeEdit();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update class.';
      toastr.error(errorMessage);
    } finally {
      setUpdatingId(null);
    }
  };

  const confirmDelete = async (id: string) => {
    await Swal.fire({
      title: 'Delete Class?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true,
      preConfirm: async () => {
        Swal.showLoading();
        try {
          await deleteClass(id).toPromise();
          setClasses((prev) => prev.filter((c) => c.class_id !== id));
          toastr.success('Class deleted.');
          refetch();
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
        <Typography variant="h5">Class List ({filtered.length})</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary', fontSize: 14 }}>
          <span>Session 2025/2026</span>
          <ChevronRight size={16} />
          <span>Classes</span>
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
          placeholder="Search class"
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
              <StyledTableCell className="header">Class Name</StyledTableCell>
              <StyledTableCell className="header">Class ID</StyledTableCell>
              <StyledTableCell className="header">Description</StyledTableCell>
              <StyledTableCell className="header" align="right">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginated.map((cls, idx) => (
              <TableRow key={cls.class_id}>
                <StyledTableCell>{(page - 1) * rowsPerPage + idx + 1}</StyledTableCell>
                <StyledTableCell>{cls.name || 'N/A'}</StyledTableCell>
                <StyledTableCell>{cls.class_id}</StyledTableCell>
                <StyledTableCell>{cls.class_description || '—'}</StyledTableCell>
                <StyledTableCell align="right">
                  <Link href={`/class/${cls.class_id}`}>
                    <ActionIconButton size="small"><Eye size={16} /></ActionIconButton>
                  </Link>
                  <ActionIconButton size="small" onClick={() => openEdit(cls)}>
                    <Edit size={16} />
                  </ActionIconButton>
                  <ActionIconButton
                    size="small"
                    onClick={() => cls.class_id && confirmDelete(cls.class_id)}
                    disabled={!cls.class_id}
                  >
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
        <DialogTitle>Edit Class</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Class Name"
            name="name"
            value={formData.name || ''}
            onChange={onInputChange}
            disabled={updatingId === selectedClass?.class_id}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Description"
            name="class_description"
            value={formData.class_description || ''}
            onChange={onInputChange}
            disabled={updatingId === selectedClass?.class_id}
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEdit} disabled={updatingId === selectedClass?.class_id}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={saveEdit}
            disabled={updatingId === selectedClass?.class_id}
          >
            {updatingId === selectedClass?.class_id ? 'Updating...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}