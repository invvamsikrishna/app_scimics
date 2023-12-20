import React, { createContext, useContext, useState } from "react";
import { Snackbar, Alert, Typography, Slide } from "@mui/material";

const SnackbarContext = createContext();

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};

function TransitionUp(props) {
  return <Slide {...props} direction="left" />;
}

export const SnackbarProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("success");

  const showAlert = (message, color = "success") => {
    setMessage(message);
    setColor(color);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={showAlert}>
      {children}

      <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={open} autoHideDuration={3000} TransitionComponent={TransitionUp} onClose={handleClose}>
        <Alert severity={color} sx={{ width: "100%", margin: "0px 20px" }} onClose={handleClose}>
          <Typography variant="body1">{message}</Typography>
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
