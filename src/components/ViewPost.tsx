"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Button,
  Tabs,
  Tab,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  styled,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useElectionPost, ElectionPost } from "@/hooks/useElectionPost";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#dc004e" },
    success: { main: "#2e7d32" },
    warning: { main: "#ed6c02" },
    error: { main: "#d32f2f" },
    background: { default: "#f5f5f5" },
  },
  typography: {
    h5: { fontWeight: 500 },
    h6: { fontWeight: 500 },
  },
});

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  boxShadow: theme.shadows[3],
}));

const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  marginRight: theme.spacing(1),
}));

function TabPanel(props: { children: React.ReactNode; value: string; index: string }) {
  const { children, value, index } = props;
  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`}>
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

export default function ViewPost() {
  const [tabValue, setTabValue] = useState("all");
  const [posts, setPosts] = useState<ElectionPost[]>([]);
  const { fetchElectionPosts, deleteElectionPost } = useElectionPost();

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  // useEffect(() => {
  //   const sub = fetchElectionPosts().subscribe({
  //     next: (data) => setPosts(data),
  //     error: (err) =>
  //       Swal.fire("Error", err.message || "Failed to fetch posts", "error"),
  //   });
  //   return () => sub.unsubscribe();
  // }, [fetchElectionPosts]);

  useEffect(() => {
    const sub = fetchElectionPosts().subscribe({
      next: (data) => setPosts(data),
      error: (err) =>
        Swal.fire("Error", err.message || "Failed to fetch posts", "error"),
    });
    return () => sub.unsubscribe();
  }, []);

  const handleDelete = (uuid: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const sub = deleteElectionPost(uuid).subscribe({
          next: () => {
            setPosts((prev) => prev.filter((p) => p.post_uuid !== uuid));
            Swal.fire("Deleted!", "The post has been deleted.", "success");
          },
          error: (err) => {
            Swal.fire("Error", err.message || "Failed to delete post", "error");
          },
        });
        return () => sub.unsubscribe();
      }
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: { xs: 2, sm: 4, md: 4 },
          pt: 3,
        }}
      >
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Typography variant="h5">Post Management</Typography>
            <StyledButton variant="contained" color="primary" startIcon={<Add />}>
              Create Post
            </StyledButton>
          </Box>

          <Tabs value={tabValue} onChange={handleTabChange} aria-label="post tabs">
            <Tab label="All Posts" value="all" />
            <Tab label="Executive" value="executive" />
            <Tab label="Legislative" value="legislative" />
          </Tabs>

          <TabPanel value={tabValue} index="all">
            <StyledCard>
              <CardHeader
                title="Election Posts"
                subheader="View and manage available election posts"
              />
              <CardContent>
                <Table sx={{ border: 1, borderColor: "grey.300", borderRadius: 1 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Title</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {posts.map((post) => (
                      <TableRow key={post.post_uuid}>
                        <TableCell sx={{ fontWeight: "medium" }}>
                          {post.postName}
                        </TableCell>
                        <TableCell>{post.postDescription}</TableCell>
                        <TableCell>
                          <Chip label="Active" color="success" size="small" />
                        </TableCell>
                        <TableCell align="right">
                          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                            <StyledButton
                              variant="text"
                              size="small"
                              onClick={() => handleDelete(post.post_uuid)}
                            >
                              <Delete />
                            </StyledButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </StyledCard>
          </TabPanel>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
