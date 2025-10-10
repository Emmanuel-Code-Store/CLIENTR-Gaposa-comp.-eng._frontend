"use client";

import React, { useState, useEffect, ReactNode, ReactElement } from "react";
import { useRouter } from "next/navigation";
import {
  Avatar,
  Box,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Tab,
  Tabs,
  Typography,
  Chip,
} from "@mui/material";
import {
  Person,
  Mail,
  Book,
  Edit,
  Settings as SettingsIcon,
  Group,
  School,
  VerifiedUser,
  AdminPanelSettings,
} from "@mui/icons-material";
import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/hooks/useAuth";
import Loading from "@/components/Loading";


type UserRole = "student" | "alumni" | "parent" | "staff" | "admin" | "super admin" | "guest";


const roleColors: Record<UserRole, "primary" | "secondary" | "success" | "warning" | "error" | "default"> = {
  student: "primary",
  alumni: "primary",
  parent: "success",
  staff: "secondary",
  admin: "warning",
  "super admin": "error",
  guest: "default",
};

// Map role → icon
const roleIcons: Record<UserRole, ReactElement> = {
  student: <School fontSize="small" />,
  alumni: <School fontSize="small" />,
  parent: <Group fontSize="small" />,
  staff: <Book fontSize="small" />,
  admin: <VerifiedUser fontSize="small" />,
  "super admin": <AdminPanelSettings fontSize="small" />,
  guest: <Person fontSize="small" />,
};

import { User } from "@/types/user";

export default function UserProfile({ user }: { user: User }) {
  const router = useRouter();
  const [tabIndex, setTabIndex] = useState(0);
  const { isAuthenticated, loading } = useAuth();

  // useEffect(() => {
  //   if (!loading && !isAuthenticated) {
  //     router.push("/auth/user-login");
  //   }
  // }, [isAuthenticated, loading, router]);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/auth/user-login");
    }
  }, []);

  if (loading || !user) return <Loading />;

  const roleLabel: UserRole =
    user.roleId === 2
      ? "student"
      : user.roleId === 3
        ? "alumni"
        : user.roleId === 4
          ? "staff"
          : user.roleId === 5
            ? "parent"
            : user.roleId === 6
              ? "super admin"
              : "guest";

  const roleColor = roleColors[roleLabel];
  const roleIcon = roleIcons[roleLabel];

  const labels = [
    "Personal",
    roleLabel === "student" || roleLabel === "alumni"
      ? "Academic"
      : roleLabel === "parent"
        ? "Children"
        : "Professional",
    "Contact",
    "Settings",
  ];

  return (
    <Box component="main" sx={{ flexGrow: 1, bgcolor: "#F9FAFB", p: 3, height: "100vh" }}>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Card sx={{ mb: 3 }}>
            <CardHeader
              avatar={
                <Avatar src={user.avatar || undefined}>
                  {user.fullname?.match(/\b\w/g)?.join("") ?? "U"}
                </Avatar>
              }
              action={
                <Button startIcon={<Edit />} variant="contained">
                  Edit Profile
                </Button>
              }
              title={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="h5">{user.fullname ?? "Unknown"}</Typography>
                  <Badge color={roleColor} badgeContent={roleIcon}>
                    <Typography variant="caption" sx={{ pl: 1 }}>
                      {roleLabel}
                    </Typography>
                  </Badge>
                </Box>
              }
              subheader={<Typography variant="body2">User ID: {user.userId}</Typography>}
            />
          </Card>

          <Tabs value={tabIndex} onChange={(_, i) => setTabIndex(i)} sx={{ mb: 2 }}>
            {labels.map((label, i) => (
              <Tab key={i} label={label} />
            ))}
          </Tabs>

          {tabIndex === 0 && (
            <Card>
              <CardHeader title="Personal Information" avatar={<Person />} />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Info label="Full Name" value={user.fullname ?? "Unknown"} />
                  </Grid>
                  {user.roleId === 2 && user.studentId && (
                    <Grid item xs={12} md={6}>
                      <Info label="Student ID" value={user.studentId} />
                    </Grid>
                  )}
                  {user.roleId === 4 && user.staffId && (
                    <Grid item xs={12} md={6}>
                      <Info label="Staff ID" value={user.staffId} />
                    </Grid>
                  )}
                  {user.roleId === 5 && user.parentId && (
                    <Grid item xs={12} md={6}>
                      <Info label="Parent ID" value={user.parentId} />
                    </Grid>
                  )}
                </Grid>
              </CardContent>
            </Card>
          )}

          {tabIndex === 1 && (
            <Card>
              <CardHeader title="Academic / Professional Info" avatar={<Book />} />
              <CardContent>
                {user.permissions?.length ? (
                  <Box>
                    <Typography variant="subtitle2">Permissions</Typography>
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                      {user.permissions.map((p) => (
                        <Chip key={p} label={p} color="info" />
                      ))}
                    </Box>
                  </Box>
                ) : (
                  <Typography variant="body2">No permissions assigned.</Typography>
                )}
              </CardContent>
            </Card>
          )}

          {tabIndex === 2 && (
            <Card>
              <CardHeader title="Contact Info" avatar={<Mail />} />
              <CardContent>
                <Info label="Email" value={user.email ?? "No email provided"} icon={<Mail />} />
              </CardContent>
            </Card>
          )}

          {tabIndex === 3 && (
            <Card>
              <CardHeader title="Account Settings" avatar={<SettingsIcon />} />
              <CardContent>
                <Button variant="outlined">Change Password</Button>
                <Divider sx={{ my: 2 }} />
                <Button variant="contained" color="error">
                  Deactivate Account
                </Button>
              </CardContent>
            </Card>
          )}
        </Box>
      </div>
    </Box>
  );
}

const Info = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: ReactNode;
}) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
    {icon}
    <Box>
      <Typography variant="subtitle2">{label}</Typography>
      <Typography variant="body2">{value}</Typography>
    </Box>
  </Box>
);