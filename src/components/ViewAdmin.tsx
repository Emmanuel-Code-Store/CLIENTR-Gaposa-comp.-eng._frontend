'use client';

import {
  Box,
  Typography,
  Collapse,
  TextField,
  InputAdornment,
  Pagination,
  styled,
  ButtonGroup,
  Button,
} from '@mui/material';
import {
  Search,
  ChevronRight,
  Copy,
  FileText,
  FileSpreadsheet,
  FileIcon as FilePdf,
  Printer,
} from 'lucide-react';
import { useState } from 'react';
import { usePositions } from '../hooks/usePositions';
import { useUser, User as BaseUser } from '../hooks/useUser';

// ---- Extend the User type from useUser ----
interface User extends BaseUser {
  positions?: string[];
}

// ---- Styled components ----
const StyledBox = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '50px',
  background: '#eee',
  marginBottom: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  cursor: 'pointer',
  '&:hover': {
    background: '#ddd',
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2),
  background: '#f9f9f9',
  borderLeft: `4px solid ${theme.palette.primary.main}`,
  marginBottom: theme.spacing(1),
}));

const ActionButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  color: theme.palette.text.primary,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: theme.palette.grey[300],
  },
}));

// ---- Component ----
export default function ViewAdmin() {
  const { positions, loading, error } = usePositions();
  const { usersByPosition, isFetchingUsers, usersFetchError, fetchUsersByPositionName } = useUser();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [openPositionId, setOpenPositionId] = useState<string | null>(null);

  const handlePositionClick = (position_uuid: string, positionName: string) => {
    const normalizedPositionName = positionName.toLowerCase();
    if (openPositionId === position_uuid) {
      setOpenPositionId(null);
    } else {
      setOpenPositionId(position_uuid);
      if (!usersByPosition[normalizedPositionName]) {
        fetchUsersByPositionName(normalizedPositionName);
      }
    }
  };

  const filteredPositions = positions.filter((pos) =>
    pos.position_name.toLowerCase().includes(search.toLowerCase())
  );

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <Box component="main" sx={{ flexGrow: 1, bgcolor: '#F9FAFB', p: 3 }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 500 }}>
          Admin List
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
          <span>Session 2019/2020</span>
          <ChevronRight size={16} />
          <span>First</span>
          <ChevronRight size={16} />
          <span>SSS2</span>
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
          <ActionButton startIcon={<FileSpreadsheet size={16} />}>Excel</ActionButton>
          <ActionButton startIcon={<FilePdf size={16} />}>PDF</ActionButton>
          <ActionButton startIcon={<Printer size={16} />}>Print</ActionButton>
        </ButtonGroup>

        <TextField
          size="small"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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

      {/* Positions List */}
      <Box>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : filteredPositions.length === 0 ? (
          <Typography>No positions found</Typography>
        ) : (
          filteredPositions.slice((page - 1) * 20, page * 20).map((position) => (
            <Box key={position.position_uuid}>
              <StyledBox
                onClick={() => handlePositionClick(position.position_uuid, position.position_name)}
              >
                <Typography>{position.position_name}</Typography>
              </StyledBox>

              <Collapse in={openPositionId === position.position_uuid}>
                <Box sx={{ pl: 2, pr: 2 }}>
                  {isFetchingUsers && !usersByPosition[position.position_name.toLowerCase()] ? (
                    <Typography>Loading users...</Typography>
                  ) : usersFetchError && !usersByPosition[position.position_name.toLowerCase()] ? (
                    <Typography color="error">Error: {usersFetchError}</Typography>
                  ) : !usersByPosition[position.position_name.toLowerCase()] ||
                    usersByPosition[position.position_name.toLowerCase()].length === 0 ? (
                    <Typography>No users found for this position</Typography>
                  ) : (
                    usersByPosition[position.position_name.toLowerCase()].map((user: User) => (
                      <UserBox key={user.userId}>
                        <Typography>
                          {user.fullname || user.email || 'Unknown'}{' '}
                          ({user.positions?.join(', ') || 'No positions'})
                        </Typography>
                      </UserBox>
                    ))
                  )}
                </Box>
              </Collapse>
            </Box>
          ))
        )}
      </Box>

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
          Showing {(page - 1) * 20 + 1}-{Math.min(page * 20, filteredPositions.length)} of{' '}
          {filteredPositions.length} results
        </Typography>
        <Pagination
          count={Math.ceil(filteredPositions.length / 20)}
          page={page}
          onChange={(_, value) => setPage(value)}
          shape="rounded"
          size="small"
        />
      </Box>
    </Box>
  );
}
