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
// import { useArms, Arms } from "@/hooks/useArms";
// import Sidebar from "@/components/Sidebar";

// export default function ArmDetailPage() {
//   const { uuid } = useParams() as { uuid: string };
//   const { fetchArmsById, loading, error } = useArms();
//   const [arm, setArm] = useState<Arms | null>(null);

//   useEffect(() => {
//     const sub = fetchArmsById(uuid).subscribe({
//       next: (response) => {
//         const fetchedArm = (response as any)?.arm;
//         setArm(fetchedArm ?? null);
//       },
//       error: () => setArm(null),
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

//   if (!arm)
//     return (
//       <Box p={3}>
//         <Typography variant="h6">No arm found.</Typography>
//       </Box>
//     );

//   return (
//     <Box sx={{ display: "flex", bgcolor: "#F9FAFB", minHeight: "100vh" }}>
//       <Sidebar />

//       <Box sx={{ flexGrow: 1, p: 3 }}>
//         <Typography variant="h5" gutterBottom>
//           Arm Details
//         </Typography>

//         <Card>
//           <CardHeader
//             avatar={
//               <Avatar>{arm.name?.[0]?.toUpperCase() || "A"}</Avatar>
//             }
//             title={<Typography variant="h6">{arm.name}</Typography>}
//             subheader={`Arm Id: ${arm.arms_id}`}
//             action={
//               <Button variant="contained" color="primary">
//                 Edit Arm
//               </Button>
//             }
//           />

//           <Divider />

//           <CardContent>
//             <Info label="Name" value={arm.name} />
//             <Info
//               label="Description"
//               value={arm.arms_description || "No description available."}
//             />
//             <Info label="Arm Id" value={arm.arms_id} />
//             <Info label="Created At" value={new Date(arm.createdAt || "").toLocaleString()} />
//             <Info label="Updated At" value={new Date(arm.updatedAt || "").toLocaleString()} />
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
import { useEffect, useState } from "react";
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
import { useArms, Arms } from "@/hooks/useArms";
import Sidebar from "@/components/Sidebar";

export default function ArmDetailPage() {
  const { uuid } = useParams() as { uuid: string };
  const { fetchArmsById, loading, error } = useArms();
  const [arm, setArm] = useState<Arms | null>(null);

  useEffect(() => {
    const sub = fetchArmsById(uuid).subscribe({
      next: (fetchedArm: Arms) => {
        setArm(fetchedArm ?? null);
      },
      error: () => setArm(null),
    });

    return () => sub.unsubscribe();
  }, [uuid, fetchArmsById]); // ✅ include fetchArmsById

  if (loading) return <Loading />;

  if (error)
    return (
      <Box p={3}>
        <Typography color="error">{error.message}</Typography>
      </Box>
    );

  if (!arm)
    return (
      <Box p={3}>
        <Typography variant="h6">No arm found.</Typography>
      </Box>
    );

  return (
    <Box sx={{ display: "flex", bgcolor: "#F9FAFB", minHeight: "100vh" }}>
      <Sidebar />

      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Arm Details
        </Typography>

        <Card>
          <CardHeader
            avatar={<Avatar>{arm.name?.[0]?.toUpperCase() || "A"}</Avatar>}
            title={<Typography variant="h6">{arm.name}</Typography>}
            subheader={`Arm Id: ${arm.arms_id}`}
            action={
              <Button variant="contained" color="primary">
                Edit Arm
              </Button>
            }
          />

          <Divider />

          <CardContent>
            <Info label="Name" value={arm.name} />
            <Info
              label="Description"
              value={arm.arms_description || "No description available."}
            />
            <Info label="Arm Id" value={String(arm.arms_id)} />
            <Info
              label="Created At"
              value={new Date(arm.createdAt || "").toLocaleString()}
            />
            <Info
              label="Updated At"
              value={new Date(arm.updatedAt || "").toLocaleString()}
            />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

const Info = ({ label, value }: { label: string; value: string | number | null }) => (
  <Box sx={{ mb: 2 }}>
    <Typography variant="subtitle2" color="textSecondary">
      {label}
    </Typography>
    <Typography variant="body1">{value ?? "—"}</Typography>
  </Box>
);
