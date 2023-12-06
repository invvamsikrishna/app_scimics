import React from "react";
import { Button, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const CustomButton = ({ title, loading, startIcon, onPressed, sx, ...other }) => {
  return (
    <LoadingButton
      variant="outlined"
      loading={loading}
      onClick={onPressed}
      startIcon={startIcon}
      sx={{ fontSize: 16, fontWeight: 500, px: 6, py: 1, backgroundImage: "linear-gradient(to left, #5C67C759, #5C67C700)", border: "1px solid #5C67C7", ...sx }}
      {...other}
    >
      {title}
    </LoadingButton>
  );
};

export default CustomButton;
