"use client";

import { SelectChangeEvent } from "@mui/material/Select";
import React, { useState, useEffect, FC } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
} from "@mui/material";
import { useClassArms } from "@/hooks/useClassArm";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

toastr.options = {
  closeButton: true,
  progressBar: true,
  positionClass: "toast-top-right",
  timeOut: 5000,
};

interface ClassArmRegistrationDialogProps {
  open: boolean;
  onClose: () => void;
}

interface FormState {
  class_uuid_id: string;
  arms_uuid_id: string;
  class_arm_description: string;
}

interface Class {
  uuid: string;
  name: string;
}

interface Arm {
  uuid: string;
  name: string;
}

const ClassArmRegistrationDialog: FC<ClassArmRegistrationDialogProps> = ({
  open,
  onClose,
}) => {
  const [formData, setFormData] = useState<FormState>({
    class_uuid_id: "",
    arms_uuid_id: "",
    class_arm_description: "",
  });

  const [classes, setClasses] = useState<Class[]>([]);
  const [arms, setArms] = useState<Arm[]>([]);
  const [loading, setLoading] = useState(false);

  const { fetchClass, fetchArms, registerClassArm } = useClassArms();

  // useEffect(() => {
  //   if (!open) return;

  //   const classSub = fetchClass().subscribe({
  //     next: (data: Class[]) => {
  //       setClasses(data);
  //       setFormData((prev) => ({
  //         ...prev,
  //         class_uuid_id: data[0]?.uuid || "",
  //       }));
  //     },
  //     error: (err: unknown) => {
  //       console.error("Error fetching classes:", err);
  //       toastr.error("Failed to fetch classes");
  //     },
  //   });

  //   const armsSub = fetchArms().subscribe({
  //     next: (data: Arm[]) => {
  //       setArms(data);
  //       setFormData((prev) => ({
  //         ...prev,
  //         arms_uuid_id: data[0]?.uuid || "",
  //       }));
  //     },
  //     error: (err: unknown) => {
  //       console.error("Error fetching arms:", err);
  //       toastr.error("Failed to fetch arms");
  //     },
  //   });

  //   return () => {
  //     classSub.unsubscribe();
  //     armsSub.unsubscribe();
  //   };
  // }, [open, fetchClass, fetchArms]); 

  useEffect(() => {
    if (!open) return;

    const classSub = fetchClass().subscribe({
      next: (data: Class[]) => {
        setClasses(data);
        setFormData((prev) => ({
          ...prev,
          class_uuid_id: data[0]?.uuid || "",
        }));
      },
      error: (err: unknown) => {
        console.error("Error fetching classes:", err);
        toastr.error("Failed to fetch classes");
      },
    });

    const armsSub = fetchArms().subscribe({
      next: (data: Arm[]) => {
        setArms(data);
        setFormData((prev) => ({
          ...prev,
          arms_uuid_id: data[0]?.uuid || "",
        }));
      },
      error: (err: unknown) => {
        console.error("Error fetching arms:", err);
        toastr.error("Failed to fetch arms");
      },
    });

    return () => {
      classSub.unsubscribe();
      armsSub.unsubscribe();
    };
  }, []);

  const handleSubmit = () => {
    if (
      !formData.class_uuid_id ||
      !formData.arms_uuid_id ||
      !formData.class_arm_description.trim()
    ) {
      toastr.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    registerClassArm({
      class_id: formData.class_uuid_id,
      arms_id: formData.arms_uuid_id,
      class_arm_description: formData.class_arm_description,
    }).subscribe({
      next: () => {
        toastr.success("Class arm created successfully!");
        setFormData({
          class_uuid_id: "",
          arms_uuid_id: "",
          class_arm_description: "",
        });
        setLoading(false);
        onClose();
      },
      error: (err: unknown) => {
        console.error("Error creating class arm:", err);
        const message =
          err instanceof Error ? err.message : "Failed to create class arm";
        toastr.error(message);
        setLoading(false);
      },
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create Class Arm</DialogTitle>
      <DialogContent>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <FormControl fullWidth required>
              <InputLabel>Select Class</InputLabel>
              <Select
                name="class_uuid_id"
                value={formData.class_uuid_id}
                onChange={handleSelectChange}
                label="Select Class"
              >
                {classes.map((cls) => (
                  <MenuItem key={cls.uuid} value={cls.uuid}>
                    {cls.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth required>
              <InputLabel>Select Arm</InputLabel>
              <Select
                name="arms_uuid_id"
                value={formData.arms_uuid_id}
                onChange={handleSelectChange}
                label="Select Arm"
              >
                {arms.map((arm) => (
                  <MenuItem key={arm.uuid} value={arm.uuid}>
                    {arm.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Description"
              name="class_arm_description"
              value={formData.class_arm_description}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" disabled={loading}>
          {loading ? <CircularProgress size={20} /> : "Register"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClassArmRegistrationDialog;
