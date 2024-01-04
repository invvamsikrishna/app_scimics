import React from "react";

import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Dialog, DialogTitle, DialogActions, Grid, Button, Snackbar, Alert, Typography, Box, List, ListItem, Checkbox } from "@mui/material";
import { FormProvider, RHFTextField } from "../../components/hook-form";
import CustomButton from "../../components/CustomButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

const TestDescDialog = ({ title, totalMinutes }) => {
  const navigate = useNavigate();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isCheckboxChecked, setCheckboxChecked] = useState(false); // for checkbox

  const handleCancel = () => {
    setDialogOpen(false);
  };

  const handleClick = () => {
    navigate("/user/examination");
  };

  return (
    <>
      <Button variant="contained" color="secondary" endIcon={<ArrowForwardIcon />} onClick={() => setDialogOpen(true)} sx={{ fontWeight: "normal" }}>
        Start Test
      </Button>

      <Dialog sx={{boxShadow:"none !importent"}} open={isDialogOpen} maxWidth="md" fullWidth scroll={"body"} onClose={handleCancel}>
        <Box pt={3} px={4}>
          <Typography variant="subtitle1" fontSize={24} fontWeight={600} textAlign="center" sx={{ mb: 2 }}>
            Exam Instructions
          </Typography>
          <Typography variant="subtitle1" fontSize={16} fontWeight="normal" color="#F3002B" sx={{ mb: 2 }}>
            Kindly review the instructions thoroughly prior to the exam.
          </Typography>
          <Box sx={{ minHeight: "300px" }}>
            <List
              sx={{
                listStyleType: "disc",
                listStylePosition: "inside",
              }}
            >
              {[
                "Click on Start Test button to start writing the examination",
                `Total Duration of the examination will be ${totalMinutes / 60} hrs.`,
                "You will see the remaining timer for each question and for each section on the top right corner of your screen.",
                "Once the timer is complete you will automatically moved to your next question/sections",
              ].map((item, index) => (
                <ListItem key={index} sx={{ display: "list-item", py: "4px" }}>
                  <Typography component={"span"} variant="subtitle1" fontSize={14} fontWeight={400}>
                    {item}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Box>

          <Typography variant="subtitle1" fontSize={14} fontWeight={400} sx={{ display: "flex", alignItems: "center" }}>
            <Checkbox
              size="small"
              checked={isCheckboxChecked}
              onChange={() => setCheckboxChecked(!isCheckboxChecked)} // Handle checkbox change
              sx={{
                color: "text.disabled",
                "&.Mui-checked": {
                  color: "text.disabled",
                },
              }}
            />
            I have read and understood the instructions given above
          </Typography>
        </Box>

        <DialogActions sx={{ p: 3 }}>
          <Button
            variant="outlined"
            color="inherit"
            onClick={handleClick}
            endIcon={<ArrowForwardIcon />}
            sx={{ fontWeight: "normal" }}
            disabled={!isCheckboxChecked} // Disable button when checkbox is not checked
          >
            Start Test
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TestDescDialog;
