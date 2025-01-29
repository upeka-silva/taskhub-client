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
import api from "../api/api";
import { useStoreContext } from "../api/contextApi";
import { ContextApi } from "../api/contextApi";

const TaskForm = ({ open, onClose, onSubmitTask }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useStoreContext(ContextApi);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await api.post("/api/v1/tasks/add", data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      onSubmitTask(response.data);
      toast.success("Task successfully created!");
      reset();
      onClose();
      return;
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Error adding task! Please try again.");
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
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskForm;
