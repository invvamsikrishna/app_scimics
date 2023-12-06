import React from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Avatar, Box, Container, Stack, Typography, Grid, Button, Divider } from "@mui/material";
import Page from "../components/Page";
import { FormProvider, RHFTextField } from "../components/hook-form";
import { PUBLIC_URL } from "../constants";

const ProfilePage = () => {
  const schema = Yup.object().shape({
    firstname: Yup.string().max(120, "Firstname should not exceed 120 characters").required("Firstname is required"),
    lastname: Yup.string().max(120, "Lastname should not exceed 120 characters").required("Lastname is required"),
    gender: Yup.string().max(120, "Gender should not exceed 120 characters").required("Gender is required"),
    dateofbirth: Yup.string().max(120, "Date of birth should not exceed 120 characters").required("Date of birth is required"),
    email: Yup.string().email().required("Email address is required"),
    address: Yup.string().max(120, "Address should not exceed 120 characters"),
    position: Yup.string().max(120, "Position should not exceed 120 characters"),
    additional: Yup.string().max(500, "Additional info should not exceed 120 characters"),
  });

  const defaultValues = {
    firstname: "",
    lastname: "",
    gender: "",
    dateofbirth: "",
    phone: "",
    email: "",
    address: "",
    position: "",
    additional: "",
  };

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data) => {};

  return (
    <Page title="ICAP Test">
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ width: { xs: "100%", md: "85%" } }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={8}>
              <Grid item xs={12} md={3} sx={{ textAlign: "center" }}>
                <Avatar src={`${PUBLIC_URL}/static/images/profile.png`} sx={{ width: "100%", height: "auto", maxWidth: 200, margin: "auto" }} />

                <Box p={1} />

                <Button variant="contained" color="secondary" sx={{ fontWeight: "normal" }}>
                  Change Profile Photo
                </Button>
              </Grid>

              <Grid item container xs={12} md={8} spacing={2} sx={{ alignItems: "end" }}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" fontSize={16} fontWeight="normal">
                    Personal Profile Details
                  </Typography>
                  <Divider />
                </Grid>

                <Grid item xs={12}>
                  <RHFTextField name="name" label="Name" />
                </Grid>

                <Grid item xs={12}>
                  <RHFTextField name="email" label="Email address" />
                </Grid>

                <Grid item xs={3}>
                  <RHFTextField name="country" label="Country Code" />
                </Grid>

                <Grid item xs={9}>
                  <RHFTextField name="phone" label="Phone Number" />
                </Grid>

                <Grid item xs={8} md={9}>
                  <RHFTextField name="password" label="Change Password" />
                </Grid>

                <Grid item xs={4} md={3}>
                  <Button variant="contained" sx={{ height: "47px", width: "100%", fontWeight: "normal" }}>
                    Update Password
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  <Box p={4} />
                  <Typography variant="subtitle1" fontSize={16} fontWeight="normal">
                    Educational Details
                  </Typography>
                  <Divider />
                </Grid>

                <Grid item xs={12}>
                  <RHFTextField name="college" label="College" />
                </Grid>

                <Grid item xs={12}>
                  <RHFTextField name="course" label="Course" />
                </Grid>
              </Grid>
            </Grid>
          </FormProvider>
        </Box>
      </Container>
    </Page>
  );
};

export default ProfilePage;
