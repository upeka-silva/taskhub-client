import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Box,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import dayjs from "dayjs"; // To handle date formatting

const TaskForm = ({ open, onClose, onSubmitTask }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  // Handle task form submission
  const onSubmit = (data) => {
    console.log("Form Data Submitted:", data);
    onSubmitTask(data);
    onClose(); // Close the modal after submission
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Task</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {/* Task Name */}
            <Controller
              name="taskName"
              control={control}
              defaultValue=""
              rules={{ required: "Task name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Task Name"
                  variant="outlined"
                  fullWidth
                  error={Boolean(errors.taskName)}
                  helperText={errors.taskName ? errors.taskName.message : ""}
                />
              )}
            />

            {/* Description */}
            <Controller
              name="description"
              control={control}
              defaultValue=""
              rules={{ required: "Description is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  error={Boolean(errors.description)}
                  helperText={
                    errors.description ? errors.description.message : ""
                  }
                />
              )}
            />

            {/* Due Date */}
            <Controller
              name="dueDate"
              control={control}
              defaultValue={dayjs().format("YYYY-MM-DDTHH:mm")}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Due Date"
                  type="datetime-local"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={Boolean(errors.dueDate)}
                  helperText={errors.dueDate ? errors.dueDate.message : ""}
                />
              )}
            />
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit(onSubmit)} variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskForm;
