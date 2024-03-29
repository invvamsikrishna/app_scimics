import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Avatar, Box, Container, Stack, Typography, Grid, Button, Divider, TextField, MenuItem } from "@mui/material";
import Page from "../components/Page";
import { FormProvider, RHFTextField, URHFTextField } from "../components/hook-form";
import { COMMON_ERROR_MSG, PROFILE_FILE_SIZE, PUBLIC_URL, UPDATE_PROFILE_SUCCESS_MSG, UPDATE_PSWD_SUCCESS_MSG, phoneRegExp } from "../constants";
import { connect } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { getAllColleges, getAllCoursesById } from "../actions/common";
import UserServices from "../services/UserServices";
import { authUpdated } from "../actions/auth";
import { useAlertContext } from "../components/AlertProvider";

const ProfilePage = ({ account, common, authUpdated, getAllColleges, getAllCoursesById }) => {
  const { showSnackbar } = useAlertContext();

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    handleColleges();
    if (account?.user?.course_id) {
      handleCourses(account?.user?.course_id);
    }
  }, []);

  const schema = Yup.object().shape({
    firstname: Yup.string().required("Firstname is required"),
    lastname: Yup.string().required("Lastname is required"),
    email: Yup.string(),
    phone: Yup.string().matches(phoneRegExp, "Phone number is not valid").required("Phone Name is required"),
    password: Yup.string(),
    college_id: Yup.string().required("College is required"),
    course_id: Yup.string().required("Course is required"),
  });

  const defaultValues = {
    firstname: account?.user?.firstname ?? "",
    lastname: account?.user?.lastname ?? "",
    email: account?.user?.email ?? "",
    phone: account?.user?.phone ?? "",
    password: "",
    college_id: account?.user?.college_id ?? "",
    course_id: account?.user?.course_id ?? "",
  };

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit, getValues, setError, clearErrors, resetField, reset } = methods;

  const onSubmit = async (data) => {
    setLoading(true);
    var values = { ...data, country_code: "+91" };
    try {
      const response = await UserServices.updateUser(values);
      setLoading(false);
      showSnackbar(UPDATE_PROFILE_SUCCESS_MSG);

      delete values["password"];
      delete values["email"];
      authUpdated(values);
    } catch (err) {
      showSnackbar(err.response?.data?.error ?? COMMON_ERROR_MSG, "error");
      setLoading(false);
    }
  };

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
    var file = e.target.files[0];

    if (!file) return;

    if (!file.type.includes("image")) {
      showSnackbar("Unsupported format", "error");
      return;
    }

    if (file.size > PROFILE_FILE_SIZE) {
      showSnackbar(`Maximum file size should not exceed ${PROFILE_FILE_SIZE / 1000} Kb`, "error");
      return;
    }

    // setProfilePic({ file: file, blob: URL.createObjectURL(file) });
  };

  const handleColleges = async () => {
    var result = await getAllColleges();
    if (result != true) {
      showSnackbar(result, "error");
    }
  };

  const handleCourses = async (id) => {
    resetField("course_id");

    var result = await getAllCoursesById(id);
    if (result != true) {
      showSnackbar(result, "error");
    }
  };

  return (
    <Page title="Profile">
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ width: { xs: "100%", md: "85%" } }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={8}>
              <Grid item xs={12} md={3} sx={{ textAlign: "center" }}>
                <Avatar src={account.user?.pic} sx={{ width: "80%", height: "auto", maxWidth: "150px", margin: "auto", aspectRatio: "1/1" }} />

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
                    Personal Profile Details
                  </Typography>
                  <Divider />
                </Grid>

                <Grid item xs={6}>
                  <RHFTextField name="firstname" label="First name" />
                </Grid>

                <Grid item xs={6}>
                  <RHFTextField name="lastname" label="Last name" />
                </Grid>

                {account.user?.signin_source !== "GITHUB" && (
                  <Grid item xs={12}>
                    <RHFTextField name="email" label="Email address" disabled={true} />
                  </Grid>
                )}

                <Grid item xs={2}>
                  <URHFTextField name="country" value="+91" label="Country Code" disabled />
                </Grid>

                <Grid item xs={10}>
                  <RHFTextField type="number" name="phone" label="Phone number" />
                </Grid>

                {account.user?.signin_source === "EMAIL" && (
                  <Grid item container xs={12} spacing={2} sx={{ alignItems: "end" }}>
                    <Grid item xs={8} md={8}>
                      <RHFTextField name="password" label="Change Password" />
                    </Grid>

                    <Grid item xs={4} md={4}>
                      <LoadingButton fullWidth variant="contained" loading={isLoading} onClick={handleChangePswd} sx={{ height: "47px", minWidth: "150px", fontWeight: "normal" }}>
                        Update Password
                      </LoadingButton>
                    </Grid>
                  </Grid>
                )}

                <Grid item xs={12}>
                  <Box p={4} />
                  <Typography variant="subtitle1" fontSize={16} fontWeight="normal">
                    Educational Details
                  </Typography>
                  <Divider />
                </Grid>

                <Grid item xs={12}>
                  <RHFTextField name="college_id" label="College" loading={common.isCollegesLoading} onChange={(e) => handleCourses(e.target.value)} select>
                    {common.colleges.map((item, index) => (
                      <MenuItem key={index} value={item.college_pk}>
                        {item.college_name}
                      </MenuItem>
                    ))}
                  </RHFTextField>
                </Grid>

                <Grid item xs={12}>
                  <RHFTextField name="course_id" label="Course" loading={common.isCoursesLoading} select>
                    {common.courses.map((item, index) => (
                      <MenuItem key={index} value={item.course_pk}>
                        {item.course_name}
                      </MenuItem>
                    ))}
                  </RHFTextField>
                </Grid>

                <Grid item xs={12} sx={{ textAlign: "right" }}>
                  <LoadingButton type="submit" loading={isLoading} variant="contained" sx={{ fontWeight: "normal" }}>
                    Update Profile
                  </LoadingButton>
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
    common: state.common,
  };
};

export default connect(mapStateToProps, { authUpdated, getAllColleges, getAllCoursesById })(ProfilePage);
