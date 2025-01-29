import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { FaRegCheckCircle, FaRegClock } from "react-icons/fa";
import dayjs from "dayjs";
import api from "../api/api";
import { ContextApi, useStoreContext } from "../api/contextApi";
import toast from "react-hot-toast";

const TaskCard = ({ task, onViewDetails }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardContent>
        <Typography variant="h6">{task.taskName}</Typography>
        <Typography variant="body2" color="text.secondary">
          {task.description}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 2,
          }}
        >
          <Typography variant="caption">
            <FaRegClock /> {dayjs(task.dueDate).format("YYYY-MM-DD HH:mm")}
          </Typography>
          <Typography
            variant="caption"
            color={task.status === "completed" ? "green" : "orange"}
          >
            <FaRegCheckCircle /> {task.status}
          </Typography>
        </Box>
        <Button
          size="small"
          sx={{ marginTop: 2 }}
          variant="contained"
          onClick={() => onViewDetails(task)}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

const TaskListCard = ({ tasks, fetchTasks }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { token } = useStoreContext(ContextApi);

  const handleViewDetails = (task) => {
    setSelectedTask(task);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTask(null);
  };

  const handleUpdate = async () => {
    if (!selectedTask) return;
    setLoading(true);
    try {
      await api.put(`/api/v1/tasks/update/${selectedTask.id}`, selectedTask, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Task updated successfully!");
      handleClose();
      fetchTasks();
    } catch (error) {
      toast.error("Failed to update task.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedTask) return;
    setLoading(true);
    try {
      await api.delete(`/api/v1/tasks/delete/${selectedTask.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Task deleted successfully!");
      handleClose();
      fetchTasks();
    } catch (error) {
      toast.error("Failed to delete task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        {tasks.map((task) => (
          <Grid item xs={12} sm={6} md={4} key={task.id}>
            <TaskCard task={task} onViewDetails={handleViewDetails} />
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Task Details</DialogTitle>
        <DialogContent>
          {selectedTask && (
            <>
              <TextField
                fullWidth
                margin="dense"
                label="Task Name"
                value={selectedTask.taskName}
                onChange={(e) =>
                  setSelectedTask({ ...selectedTask, taskName: e.target.value })
                }
              />
              <TextField
                fullWidth
                margin="dense"
                label="Description"
                multiline
                value={selectedTask.description}
                onChange={(e) =>
                  setSelectedTask({
                    ...selectedTask,
                    description: e.target.value,
                  })
                }
              />
              <TextField
                fullWidth
                margin="dense"
                label="Due Date"
                type="datetime-local"
                value={dayjs(selectedTask.dueDate).format("YYYY-MM-DDTHH:mm")}
                onChange={(e) =>
                  setSelectedTask({ ...selectedTask, dueDate: e.target.value })
                }
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" disabled={loading}>
            {loading ? "Deleting..." : "Delete"}
          </Button>
          <Button onClick={handleUpdate} variant="contained" disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskListCard;
