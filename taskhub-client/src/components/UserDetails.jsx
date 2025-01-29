import {
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useStoreContext } from "../api/contextApi";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { ContextApi } from "../api/contextApi";
import "../style/User.css";
import { FaUser } from "react-icons/fa";

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { token } = useStoreContext(ContextApi);
  const email = localStorage.getItem("USER_EMAIL");

  const getUser = async () => {
    try {
      const response = await api.get(`/api/v1/users/email?email=${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (loading) {
    return <CircularProgress sx={{ display: "block", mx: "auto", my: 4 }} />;
  }

  return (
    <Grid container justifyContent="center" className="user-details-container">
      {/* One Grid item with responsive sizing */}
      <Grid item xs={12} sm={10} md={8} lg={6} xl={5}>
        <Card className="user-card">
          <CardContent>
            <FaUser className="user-icon" /> {/* React User Icon */}
            <Typography variant="h5" className="user-name">
              {"HI, " + user.firstName}
            </Typography>
            <Typography className="user-info">
              <strong>Name:</strong> {user.firstName} {user.lastName}
            </Typography>
            <Typography className="user-info">
              <strong>Email:</strong> {user.email}
            </Typography>
            <Typography className="user-info">
              <strong>Role:</strong> {user.role}
            </Typography>
            <Button
              variant="contained"
              className="go-dashboard-btn"
              onClick={() => navigate("/dashboard")}
            >
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default UserDetails;
