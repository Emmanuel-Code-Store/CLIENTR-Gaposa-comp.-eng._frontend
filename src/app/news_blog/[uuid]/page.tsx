// "use client";

// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import {
//   Box,
//   Card,
//   CardContent,
//   CardHeader,
//   Divider,
//   Typography,
//   Avatar,
//   Button,
// } from "@mui/material";
// import Loading from "@/components/Loading";
// import { UseDepartment, Department } from "@/hooks/useDepartment";
// import Sidebar from "@/components/Sidebar"; 

// export default function DepartmentDetailPage() {
//   const { uuid } = useParams() as { uuid: string };
//   const { fetchDepartmentById, loading, error } = UseDepartment();
//   const [department, setDepartment] = useState<Department | null>(null);

//   useEffect(() => {
//     const sub = fetchDepartmentById(uuid).subscribe({
//       next: (dept) => setDepartment(dept),
//       error: () => setDepartment(null),
//     });

//     return () => sub.unsubscribe();
//   }, [uuid]);

//   if (loading) return <Loading />;

//   if (error)
//     return (
//       <Box p={3}>
//         <Typography color="error">{error.message}</Typography>
//       </Box>
//     );

//   if (!department)
//     return (
//       <Box p={3}>
//         <Typography variant="h6">No department found.</Typography>
//       </Box>
//     );

//   return (
//     <Box sx={{ display: "flex", bgcolor: "#F9FAFB", minHeight: "100vh" }}>
//       <Sidebar />

//       <Box sx={{ flexGrow: 1, p: 3 }}>
//         <Typography variant="h5" gutterBottom>
//           Department Details
//         </Typography>

//         <Card>
//           <CardHeader
//             avatar={
//               <Avatar>
//                 {department.name?.[0]?.toUpperCase() || "D"}
//               </Avatar>
//             }
//             title={<Typography variant="h6">{department.name}</Typography>}
//             subheader={`Department Id: ${department.department_uuid}`}
//             action={
//               <Button variant="contained" color="primary">
//                 Edit Department
//               </Button>
//             }
//           />

//           <Divider />

//           <CardContent>
//             <Info label="Name" value={department.name} />
//             <Info
//               label="Description"
//               value={
//                 department.department_description ||
//                 "No description available."
//               }
//             />
//             <Info label="Department Id" value={department.department_uuid} />
//           </CardContent>
//         </Card>
//       </Box>
//     </Box>
//   );
// }

// const Info = ({ label, value }: { label: string; value: string }) => (
//   <Box sx={{ mb: 2 }}>
//     <Typography variant="subtitle2" color="textSecondary">
//       {label}
//     </Typography>
//     <Typography variant="body1">{value}</Typography>
//   </Box>
// );













"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  Avatar,
  Button,
} from "@mui/material";
import Loading from "@/components/Loading";
import { useDepartment, Department } from "@/hooks/useDepartment";
import Sidebar from "@/components/Sidebar";

export default function DepartmentDetailPage() {
  const { uuid } = useParams() as { uuid: string };
  const { fetchDepartmentById, loading, error } = useDepartment();
  const [department, setDepartment] = useState<Department | null>(null);

  const loadDepartment = useCallback(() => {
    if (!uuid) {
      console.warn("[DepartmentDetailPage] Missing uuid parameter");
      setDepartment(null);
      return () => {};
    }

    console.log("[DepartmentDetailPage] Fetching department for uuid:", uuid);
    const sub = fetchDepartmentById(uuid).subscribe({
      next: (dept: Department) => {
        console.log("[DepartmentDetailPage] Fetched department:", dept);
        setDepartment(dept ?? null);
      },
      error: (err) => {
        console.error("[DepartmentDetailPage] Fetch error:", err);
        setDepartment(null);
      },
    });
    return () => sub.unsubscribe();
  }, [fetchDepartmentById, uuid]);

  useEffect(() => {
    const cleanup = loadDepartment();
    return cleanup;
  }, [loadDepartment]);

  if (loading) return <Loading />;

  if (error) {
    return (
      <Box p={3}>
        <Typography color="error">{error.message}</Typography>
      </Box>
    );
  }

  if (!department) {
    return (
      <Box p={3}>
        <Typography variant="h6">No department found.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", bgcolor: "#F9FAFB", minHeight: "100vh" }}>
      <Sidebar />

      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Department Details
        </Typography>

        <Card>
          <CardHeader
            avatar={
              <Avatar>
                {department.name?.[0]?.toUpperCase() || "D"}
              </Avatar>
            }
            title={<Typography variant="h6">{department.name}</Typography>}
            subheader={`Department Id: ${department.department_uuid}`}
            action={
              <Button variant="contained" color="primary">
                Edit Department
              </Button>
            }
          />

          <Divider />

          <CardContent>
            <Info label="Name" value={department.name} />
            <Info
              label="Description"
              value={
                department.department_description ||
                "No description available."
              }
            />
            <Info label="Department Id" value={department.department_uuid} />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

const Info = ({ label, value }: { label: string; value: string }) => (
  <Box sx={{ mb: 2 }}>
    <Typography variant="subtitle2" color="textSecondary">
      {label}
    </Typography>
    <Typography variant="body1">{value}</Typography>
  </Box>
);