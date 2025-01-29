import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Box,
} from "@mui/material";
import { FaRegCheckCircle, FaRegClock } from "react-icons/fa";
import dayjs from "dayjs";

const TaskCard = ({ task }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {task.taskName}
        </Typography>
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
        <Button size="small" sx={{ marginTop: 2 }} variant="contained">
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

const TaskListCard = ({ tasks }) => {
  console.log({ tasks });
  return (
    <Grid container spacing={2}>
      {tasks.map((task) => (
        <Grid item xs={12} sm={6} md={4} key={task.id}>
          <TaskCard task={task} />
        </Grid>
      ))}
    </Grid>
  );
};

export default TaskListCard;
