import React, { useEffect, useState } from "react";
import LeftNav from "./LeftNav";
import TaskForm from "./TaskForm";
import TaskListCard from "./TaskListCard";
import api from "../api/api";
import { useStoreContext } from "../api/contextApi";
import dayjs from "dayjs";
import SortForm from "./SortForm";
import { ContextApi } from "../api/contextApi";

const Dashboard = () => {
  const [openTaskForm, setOpenTaskForm] = useState(false);
  const [openSortForm, setOpenSortForm] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const { token } = useStoreContext(ContextApi);

  console.log(token, "dashboard");

  const getAllTasks = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/api/v1/tasks/all", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data);
      setIsLoading(false);
      console.log({ response });
      console.log(tasks);
      return response;
    } catch (error) {
      console.error("Error adding task:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("inside the task");
    getAllTasks();
  }, []);

  const handleOpenTaskForm = () => {
    setOpenTaskForm(true);
  };

  const handleCloseTaskForm = () => {
    setOpenTaskForm(false);
  };

  const handleSubmitTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleFilterChange = (filter) => {
    if (filter === "today") {
      const today = dayjs();

      const todayTasks = tasks.filter((task) => {
        const createdAt = dayjs(task.createdAt);
        console.log("CreatedAt:", createdAt.format());

        return createdAt.isSame(today, "day");
      });
      setTasks(todayTasks);
    }
  };

  console.log({ tasks });

  const handleSortChange = () => {
    setOpenSortForm(true);
  };
  const handleCloseSortForm = () => {
    setOpenSortForm(false);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <LeftNav
        onAddTask={handleOpenTaskForm}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
      />

      <div style={{ flex: 1, padding: "20px" }}>
        <TaskListCard tasks={tasks} fetchTasks={getAllTasks} />
      </div>

      <TaskForm
        open={openTaskForm}
        onClose={handleCloseTaskForm}
        onSubmitTask={handleSubmitTask}
      />

      <SortForm
        open={openSortForm}
        onClose={handleCloseSortForm}
        onFilterTasks={handleSortChange}
      />
    </div>
  );
};

export default Dashboard;
