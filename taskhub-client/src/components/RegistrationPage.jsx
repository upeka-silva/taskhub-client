import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import toast from "react-hot-toast";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../style/RegistrationPage.css";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, TextField, Button, Grid } from "@mui/material";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "USER",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await api.post("api/v1/auth/signUp", data);
      console.log(response);
      toast.success("Verification code has been sent!");
      navigate("/verify", { state: { email: response.data.email } });
      setIsLoading(false);
      return response;
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="registration-page">
      <div className=" container register-container">
        <div className="row">
          <div className="col-12">
            <div className="container-item">
              {isLoading ? (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <div className="load-header">
                    <h6>Please wait!</h6>
                    <CircularProgress />
                  </div>
                </Box>
              ) : (
                <form
                  className="register-form"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="header-text">
                    <h4>Register Here</h4>
                  </div>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        {...register("firstName", {
                          required: "First Name is required",
                        })}
                        label="First Name"
                        fullWidth
                        variant="outlined"
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        {...register("lastName", {
                          required: "Last Name is required",
                        })}
                        label="Last Name"
                        fullWidth
                        variant="outlined"
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        {...register("email", {
                          required: "Email is required",
                        })}
                        label="Email"
                        type="email"
                        fullWidth
                        variant="outlined"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 8,
                            message: "Password must have at least 8 characters",
                          },
                        })}
                        label="Password"
                        type="password"
                        fullWidth
                        variant="outlined"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={isLoading}
                      >
                        {isLoading ? "Submitting..." : "Register"}
                      </Button>
                    </Grid>
                  </Grid>

                  <div className="text-center mt-3">
                    <p>
                      Already have an account?
                      <a href="/" className="text-decoration-none">
                        Sign In
                      </a>
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
