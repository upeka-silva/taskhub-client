import React, { useState } from "react";
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
import dayjs from "dayjs";
import toast from "react-hot-toast";
import axios from "axios"; // Make sure axios is imported
import api from "../api/api";

const TaskForm = ({ open, onClose, onSubmitTask }) => {
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset, // Add reset to clear the form after successful submission
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await api.post("/api/v1/tasks/add", data);
      console.log("Task added successfully:", response.data);
      onSubmitTask(response.data);
      toast.success("Task successfully created!");
      reset();
      onClose();
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Error adding task! Please try again.");
      t;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Task</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
        <Button
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}{" "}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskForm;
