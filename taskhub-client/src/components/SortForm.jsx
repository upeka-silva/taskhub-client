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
import { ContextApi, useStoreContext } from "../api/contextApi";
import api from "../api/api";

const SortForm = ({ open, onClose, onFilterTasks }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useStoreContext(ContextApi);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const { filterDate } = data;
      const formattedDate = dayjs(filterDate).format("YYYY-MM-DD");

      const response = await api.get("/api/v1/tasks", {
        params: { date: formattedDate },
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      onFilterTasks(response.data);
      toast.success("Tasks successfully filtered!");
      onClose();
    } catch (error) {
      console.error("Error filtering tasks:", error);
      toast.error("Error filtering tasks! Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Sort Tasks by Date</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Controller
              name="filterDate"
              control={control}
              defaultValue={dayjs().format("YYYY-MM-DDTHH:mm")}
              rules={{ required: "Date and time are required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Select Date"
                  type="datetime-local"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={Boolean(errors.filterDate)}
                  helperText={
                    errors.filterDate ? errors.filterDate.message : ""
                  }
                />
              )}
            />
          </Box>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained" disabled={isLoading}>
              {isLoading ? "Filtering..." : "Filter"}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SortForm;
