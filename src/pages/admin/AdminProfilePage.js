import React, { useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Avatar, Box, Container, Stack, Typography, Grid, Button, Divider, TextField, MenuItem } from "@mui/material";
import Page from "../../components/Page";
import { FormProvider, RHFTextField } from "../../components/hook-form";
import { COMMON_ERROR_MSG, PROFILE_FILE_SIZE, PUBLIC_URL, UPDATE_PROFILE_SUCCESS_MSG, UPDATE_PSWD_SUCCESS_MSG } from "../../constants";
import { connect } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { useAlertContext } from "../../components/AlertProvider";
import UserServices from "../../services/UserServices";

const AdminProfilePage = ({ account }) => {
  const { showSnackbar } = useAlertContext();

  const [isLoading, setLoading] = useState(false);

  const schema = Yup.object().shape({
    email: Yup.string(),
    password: Yup.string(),
  });

  const defaultValues = {
    email: account.user?.email ?? "",
    password: "",
  };

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit, getValues, setError, clearErrors, resetField, reset } = methods;

  const handleChangePswd = async () => {
    clearErrors("password");
    var password = getValues("password");
    if (password.length < 8) {
      setError("password", { message: "Password must be 8 characters long" });
      return;
    }

    setLoading(true);
    var values = { email: account?.user?.email, hashed_password: password };

    try {
      const response = await UserServices.updateUserPswd(values);
      setLoading(false);
      showSnackbar(UPDATE_PSWD_SUCCESS_MSG);
      resetField("password");
    } catch (err) {
      showSnackbar(err.response?.data?.error ?? COMMON_ERROR_MSG, "error");
      setLoading(false);
    }
  };

  const handleProfileChange = (e) => {
    // var file = e.target.files[0];
    // if (!file) return;
    // if (!file.type.includes("image")) {
    //   showSnackbar("Unsupported format", "error");
    //   return;
    // }
    // if (file.size > PROFILE_FILE_SIZE) {
    //   showSnackbar(`Maximum file size should not exceed ${PROFILE_FILE_SIZE / 1000} Kb`, "error");
    //   return;
    // }
    // setProfilePic({ file: file, blob: URL.createObjectURL(file) });
  };

  return (
    <Page title="Profile">
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ width: { xs: "100%", md: "85%" } }}>
          <FormProvider methods={methods}>
            <Grid container spacing={8}>
              <Grid item xs={12} md={3} sx={{ textAlign: "center" }}>
                <Avatar src={account?.user?.pic} sx={{ width: "80%", height: "auto", maxWidth: "150px", margin: "auto", aspectRatio: "1/1" }} />

                <Box p={1} />

                <label htmlFor="profile-pic">
                  <input accept="image/*" id="profile-pic" type="file" hidden onChange={handleProfileChange} />

                  <LoadingButton loading={isLoading} component="span" variant="contained" color="secondary" sx={{ fontWeight: "normal" }}>
                    Change Profile Photo
                  </LoadingButton>
                </label>
              </Grid>

              <Grid item container xs={12} md={8} spacing={2} sx={{ alignItems: "start" }}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" fontSize={16} fontWeight="normal">
                    Admin Profile Details
                  </Typography>
                  <Divider />
                </Grid>

                <Grid item xs={12}>
                  <RHFTextField disabled name="email" label="Email address" />
                </Grid>

                <Grid item container xs={12} spacing={2} sx={{ alignItems: "end" }}>
                  <Grid item xs={8} md={8}>
                    <RHFTextField name="password" type="password" label="Change Password" />
                  </Grid>

                  <Grid item xs={4} md={4}>
                    <LoadingButton variant="contained" fullWidth loading={isLoading} onClick={handleChangePswd} sx={{ height: "47px", minWidth: "150px", fontWeight: "normal" }}>
                      Update Password
                    </LoadingButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </FormProvider>
        </Box>
      </Container>
    </Page>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.auth,
  };
};

export default connect(mapStateToProps, null)(AdminProfilePage);
