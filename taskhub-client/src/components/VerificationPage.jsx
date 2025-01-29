import React, { useState } from "react";
import api from "../api/api";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../style/verificationPage.css";
import { Button, CircularProgress, TextField } from "@mui/material";

const VerificationPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const { email } = location.state || {};

  console.log(email);

  const { register, handleSubmit } = useForm({
    VerificationCode: "",
  });

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const response = await api.post("api/v1/auth/verify", {
        email,
        verificationCode: data.verificationCode,
      });

      toast.success("Account verified successfully");
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="verification-page">
        <div className="verification-container">
          <div className="verification-header">
            <h4>Enter Verification Code</h4>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="register-form">
            <TextField
              {...register("verificationCode", { required: true })}
              label="Verification Code"
              variant="standard"
              fullWidth
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="verification-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Verify"
              )}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default VerificationPage;
