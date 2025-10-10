"use client"

import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  IconButton,
  Box,
  Typography,
  styled,
} from "@mui/material"
import { X } from "lucide-react"

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    width: "100%",
    maxWidth: 600,
    borderRadius: theme.spacing(2),
  },
}))

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  padding: theme.spacing(2),
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}))

interface AddTeacherCommentProps {
  open: boolean
  onClose: () => void
  onSave: (comment: string) => void
}

export default function AddTeacherComment({ open, onClose, onSave }: AddTeacherCommentProps) {
  return (
    <StyledDialog open={open} onClose={onClose} aria-labelledby="add-teacher-comment-dialog">
      <StyledDialogTitle>
        <Typography variant="h6">Add Teachers Comment</Typography>
        <IconButton edge="end" onClick={onClose} aria-label="close" size="small">
          <X size={20} />
        </IconButton>
      </StyledDialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Add Teachers Comment
        </Typography>

        <TextField
          fullWidth
          multiline
          rows={8}
          placeholder="Kewe@example.com"
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              borderRadius: 1,
            },
          }}
        />

        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Button
            variant="contained"
            onClick={() => onSave("")}
            sx={{
              bgcolor: "#0D0F29",
              "&:hover": {
                bgcolor: "#1a1d4d",
              },
            }}
          >
            Save
          </Button>
        </Box>
      </DialogContent>
    </StyledDialog>
  )
}

