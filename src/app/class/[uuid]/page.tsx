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
// import { useClass, Class } from "@/hooks/useClass";
// import Sidebar from "@/components/Sidebar";

// export default function ClassDetailPage() {
//   const { uuid } = useParams() as { uuid: string };
//   const { fetchClassById, loading, error } = useClass();
//   const [classItem, setClassItem] = useState<Class | null>(null);

//   useEffect(() => {
//     const sub = fetchClassById(uuid).subscribe({
//       next: (cls) => setClassItem(cls),
//       error: () => setClassItem(null),
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

//   if (!classItem)
//     return (
//       <Box p={3}>
//         <Typography variant="h6">No class found.</Typography>
//       </Box>
//     );

//   return (
//     <Box sx={{ display: "flex", bgcolor: "#F9FAFB", minHeight: "100vh" }}>
//       <Sidebar />

//       <Box sx={{ flexGrow: 1, p: 3 }}>
//         <Typography variant="h5" gutterBottom>
//           Class Details
//         </Typography>

//         <Card>
//           <CardHeader
//             avatar={
//               <Avatar>
//                 {classItem.name?.[0]?.toUpperCase() || "C"}
//               </Avatar>
//             }
//             title={<Typography variant="h6">{classItem.name}</Typography>}
//             subheader={`Class Id: ${classItem.class_id}`}
//             action={
//               <Button variant="contained" color="primary">
//                 Edit Class
//               </Button>
//             }
//           />

//           <Divider />

//           <CardContent>
//             <Info label="Name" value={classItem.name} />
//             <Info
//               label="Description"
//               value={
//                 classItem.class_description ||
//                 "No description available."
//               }
//             />
//             <Info label="Class Id" value={classItem.class_id as string} />
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
import { useClass, Class } from "@/hooks/useClass";
import Sidebar from "@/components/Sidebar";

export default function ClassDetailPage() {
  const { uuid } = useParams() as { uuid: string };
  const { fetchClassById, loading, error } = useClass();
  const [classItem, setClassItem] = useState<Class | null>(null);

  useEffect(() => {
    const sub = fetchClassById(uuid).subscribe({
      next: (cls) => setClassItem(cls),
      error: () => setClassItem(null),
    });

    return () => sub.unsubscribe();
  }, [uuid, fetchClassById]); // ✅ include fetchClassById

  if (loading) return <Loading />;

  if (error) {
    return (
      <Box p={3}>
        <Typography color="error">{error.message}</Typography>
      </Box>
    );
  }

  if (!classItem) {
    return (
      <Box p={3}>
        <Typography variant="h6">No class found.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", bgcolor: "#F9FAFB", minHeight: "100vh" }}>
      <Sidebar />

      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Class Details
        </Typography>

        <Card>
          <CardHeader
            avatar={<Avatar>{classItem.name?.[0]?.toUpperCase() || "C"}</Avatar>}
            title={<Typography variant="h6">{classItem.name}</Typography>}
            subheader={`Class Id: ${classItem.class_id}`}
            action={
              <Button variant="contained" color="primary">
                Edit Class
              </Button>
            }
          />

          <Divider />

          <CardContent>
            <Info label="Name" value={classItem.name} />
            <Info
              label="Description"
              value={classItem.class_description || "No description available."}
            />
            <Info label="Class Id" value={String(classItem.class_id)} />
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
