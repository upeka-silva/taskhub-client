import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "../api/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../style/loginPage.css";
import { useForm } from "react-hook-form";
import { useStoreContext } from "../api/contextApi";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

const LogInPage = () => {
  const { setToken } = useStoreContext();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    localStorage.setItem("USER_EMAIL", data.email);
    setIsLoading(true);

    try {
      const { data: response } = await axios.post("/api/v1/auth/logIn", data);

      if (response && response.token) {
        console.log({ response });
        setToken(response.token);

        localStorage.setItem("JWT_TOKEN", JSON.stringify(response.token));

        toast.success("Login successful!");
        navigate("/dashboard");
      }

      return data;
    } catch (error) {
      toast.error("Invalid credentials!");
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="login-page">
        <Container maxWidth="xs" className="login-container">
          <Box className="login-form-box">
            <div className="header-text login-header ">
              <h4>Login Here</h4>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="login-form">
              <TextField
                {...register("email", { required: "Email is required" })}
                label="Email"
                fullWidth
                margin="normal"
                variant="outlined"
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
              />

              <TextField
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must have at least 8 characters",
                  },
                })}
                label="Password"
                fullWidth
                margin="normal"
                variant="outlined"
                type="password"
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
              />

              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
                className="login-btn"
                disabled={isLoading}
              >
                {isLoading ? "Logging In..." : "Log In"}
              </Button>

              <Grid container justifyContent="center" className="signup-link">
                <Grid item>
                  <Typography>
                    Don't have an account?{" "}
                    <a href="/registration" className="signup-link-text">
                      Sign Up
                    </a>
                  </Typography>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Container>
      </div>
    </>
  );
};

export default LogInPage;
