"use client";

import { useEffect, useState } from "react";
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
    Checkbox,
    Button,
    styled,
    Pagination,
} from "@mui/material";
import { useUser } from "@/hooks/useUser";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import type { User } from "@/hooks/useUser";
import Loading from "@/components/Loading";

toastr.options = {
    closeButton: true,
    progressBar: true,
    positionClass: "toast-top-right",
    timeOut: 5000,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    padding: theme.spacing(1.5),
    borderColor: theme.palette.grey[200],
    "&.header": {
        backgroundColor: theme.palette.background.paper,
        fontWeight: 500,
        color: theme.palette.text.primary,
    },
}));

type AssignUserIdsResponse = {
    success: boolean;
    message: string;
    updated?: number;
    invalidIds?: string[];
    notFoundIds?: string[];
    alreadySetIds?: string[];
};

export default function ClearStaff() {
    const {
        fetchStaffClear,
        isFetchingUsers,
        usersFetchError,
        assignUserIds,
    } = useUser();

    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [selectAll, setSelectAll] = useState(false);
    const [staff, setStaff] = useState<User[]>([]);
    const [searchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const rowsPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const staffList = await fetchStaffClear();
                if (Array.isArray(staffList)) {
                    setStaff(
                        staffList.map((s) => ({
                            ...s,
                            userId: String(s.userId),
                            staffId: String(s.staffId),
                        }))
                    );
                } else {
                    toastr.error("Failed to fetch staff data");
                }
            } catch (err) {
                console.error("Error fetching staff:", err);
                toastr.error("Failed to fetch staff data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        setSelectAll(checked);
        setSelectedUsers(
            checked ? paginatedStaff.map((user) => String(user.userId)) : []
        );
    };

    const handleSelectOne = (
        event: React.ChangeEvent<HTMLInputElement>,
        userId: string
    ) => {
        const checked = event.target.checked;
        const newSelected = checked
            ? [...selectedUsers, userId]
            : selectedUsers.filter((id) => id !== userId);

        setSelectedUsers(newSelected);
        setSelectAll(newSelected.length === paginatedStaff.length);
    };

    const handleClearUsers = async () => {
        const staff_token = process.env.NEXT_PUBLIC_STAFF_ASSIGN_TOKEN;

        if (!staff_token) {
            toastr.error("Staff token is missing. Cannot assign users.");
            return;
        }

        try {
            const result: AssignUserIdsResponse = await assignUserIds(
                staff_token,
                selectedUsers
            );

            const {
                updated = 0,
                invalidIds = [],
                notFoundIds = [],
                alreadySetIds = [],
            } = result;

            if (updated > 0) {
                toastr.success(`Updated ${updated} staff user(s).`);
            } else {
                toastr.info("No staff users were updated.");
            }

            if (invalidIds.length) {
                toastr.warning(`Invalid IDs: ${invalidIds.join(", ")}`);
            }
            if (notFoundIds.length) {
                toastr.warning(`Not found IDs: ${notFoundIds.join(", ")}`);
            }
            if (alreadySetIds.length) {
                toastr.info(`Already set IDs: ${alreadySetIds.join(", ")}`);
            }

            await fetchStaffClear();
            setSelectedUsers([]);
            setSelectAll(false);
        } catch (err) {
            console.error("assignUserIds error:", err);
            toastr.error("Failed to assign user IDs. See console for details.");
        }
    };

    if (loading) return <Loading />;

    const filteredStaff = staff.filter((s) =>
        [s.staffId, s.fullname, s.email, s.role, s.userPositions?.join(", ")]
            .join(" ")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    const pageCount = Math.ceil(filteredStaff.length / rowsPerPage);
    const paginatedStaff = filteredStaff.slice(
        (page - 1) * rowsPerPage,
        page * rowsPerPage
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
                    Clear Staff
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Session 2019/2020
                </Typography>
            </Box>

            <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Users Without Staff ID
            </Typography>

            {isFetchingUsers ? (
                <Typography>Loading staff...</Typography>
            ) : usersFetchError ? (
                <Typography color="error">{usersFetchError}</Typography>
            ) : (
                <TableContainer
                    component={Paper}
                    elevation={0}
                    sx={{ border: 1, borderColor: "grey.200", mb: 3 }}
                >
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell className="header">
                                    User ID
                                </StyledTableCell>
                                <StyledTableCell className="header">
                                    Name
                                </StyledTableCell>
                                <StyledTableCell className="header">
                                    Email
                                </StyledTableCell>
                                <StyledTableCell
                                    className="header"
                                    align="right"
                                    padding="checkbox"
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "flex-end",
                                        }}
                                    >
                                        <Typography
                                            variant="body2"
                                            sx={{ mr: 1 }}
                                        >
                                            Select All
                                        </Typography>
                                        <Checkbox
                                            checked={selectAll}
                                            onChange={handleSelectAll}
                                            color="primary"
                                        />
                                    </Box>
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedStaff.map((s) => (
                                <TableRow key={s.userId}>
                                    <StyledTableCell>
                                        {s.userId}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {s.fullname || "—"}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {s.email || "—"}
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="right"
                                        padding="checkbox"
                                    >
                                        <Checkbox
                                            checked={selectedUsers.includes(
                                                String(s.userId)
                                            )}
                                            onChange={(e) =>
                                                handleSelectOne(
                                                    e,
                                                    String(s.userId)
                                                )
                                            }
                                            color="primary"
                                        />
                                    </StyledTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Pagination */}
            {pageCount > 1 && (
                <Box mt={2} display="flex" justifyContent="flex-end">
                    <Pagination
                        count={pageCount}
                        page={page}
                        onChange={(_e, val) => setPage(val)}
                    />
                </Box>
            )}

            <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                <Button
                    variant="contained"
                    onClick={handleClearUsers}
                    disabled={selectedUsers.length === 0}
                    sx={{
                        bgcolor: "#0D0F29",
                        px: 3,
                        "&:hover": { bgcolor: "#1a1d4d" },
                    }}
                >
                    Clear Selected
                </Button>
            </Box>
        </Box>
    );
}
