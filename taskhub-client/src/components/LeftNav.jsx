import React from "react";
import { List, ListItem, ListItemText, Divider, Button } from "@mui/material";
import { FaHome, FaTasks, FaCalendarDay, FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LeftNav = ({
  onAddTask,
  onFilterChange,
  onSortChange,
  onRefreshDashboard,
}) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "250px",
        background: "#f4f4f4",
        padding: "20px",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <List>
        <ListItem button onClick={onAddTask}>
          <Button variant="contained" color="primary" fullWidth>
            + Add task
          </Button>
        </ListItem>
        <Divider />

        <ListItem button onClick={() => navigate("/dashboard/user")}>
          <FaUserAlt style={{ marginRight: "10px" }} />
          <ListItemText primary="User Details" />
        </ListItem>

        <ListItem button onClick={() => onFilterChange("today")}>
          <FaCalendarDay style={{ marginRight: "10px" }} />
          <ListItemText primary="Today's Tasks" />
        </ListItem>

        <ListItem button onClick={() => navigate("")}>
          <FaTasks style={{ marginRight: "10px" }} />
          <ListItemText primary="All Tasks" />
        </ListItem>

        <Divider />

        <ListItem button onClick={onSortChange}>
          <FaHome style={{ marginRight: "10px" }} />
          <ListItemText primary="Sort by Date/Time" />
        </ListItem>
      </List>
    </div>
  );
};

export default LeftNav;
