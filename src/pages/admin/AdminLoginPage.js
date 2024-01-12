import { useForm } from "react-hook-form";
import { Container, Typography, Box, Card, Stack, alpha, InputLabel, CircularProgress, IconButton } from "@mui/material";
import Page from "../../components/Page";
import { COMMON_ERROR_MSG, PUBLIC_URL } from "../../constants";
import useResponsive from "../../hooks/useResponsive";
import CustomButton from "../../components/CustomButton";
import { FormProvider } from "../../components/hook-form";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import RHFTextField, { CustomTextField } from "../../components/hook-form/RHFTextField";
import { useAlertContext } from "../../components/AlertProvider";
import { useStyles } from "../LoginPage";
import AuthServices from "../../services/AuthServices";
import { authSuccess } from "../../actions/auth";
import { connect } from "react-redux";
import AdminServices from "../../services/AdminServices";

const AdminLoginPage = ({ authSuccess }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { showSnackbar } = useAlertContext();
  const lgUp = useResponsive("up", "lg");

  const [isLoading, setLoading] = useState(false);

  const defaultValues = {
    email: "",
    password: "",
  };

  const methods = useForm({
    // resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const response = await AuthServices.loginPerson({ ...data, user_type: "SUPERADMIN" });
      const responseData = response.data?.data ?? {};
      setLoading(false);

      const catResponse = await AdminServices.getCategoriesList();
      const catresponseData = catResponse.data?.data ?? [];

      authSuccess({ ...responseData, categories: catresponseData });
      navigate("/admin-dashboard/cognitive-abilities-page", { replace: true });
    } catch (err) {
      showSnackbar(err.response?.data?.error ?? COMMON_ERROR_MSG, "error");
      setLoading(false);
    }
  };

  return (
    <Page title="Login">
      <Box px={1} className={classes.root}>
        {lgUp && (
          <>
            <Box className={classes.ellipse1} />
            <Box className={classes.ellipse2} />
            <Box className={classes.ellipse3} />

            <Box className={classes.ellipseSm1} />
            <Box className={classes.ellipseSm2} />
          </>
        )}

        <Container maxWidth="xs" disableGutters>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ py: 6, display: "flex", justifyContent: "center" }}>
              <Box component="img" src={PUBLIC_URL + "/static/icons/logo.svg"} sx={{ width: 130 }} />
            </Box>

            <Card className={classes.card} sx={{ px: 5, pt: 3, pb: 6 }}>
              <Typography fontWeight={500} sx={{ color: "text.subtitle" }}>
                Welcome{" "}
                <Typography component="span" fontSize={20}>
                  &#128075;
                </Typography>
              </Typography>
              <Typography variant="subtitle2" fontSize={30} fontWeight={600}>
                Admin Login
              </Typography>

              <Box p={2} />

              <Stack spacing={2}>
                <RHFTextField name="email" label="Email address*" placeholder="Enter email address" />

                <RHFTextField name="password" type="password" label="Password*" placeholder="Enter password" />
              </Stack>

              <Box p={2} />

              <CustomButton loading={isLoading} type="submit" title="Login" sx={{ width: "100%" }} />
            </Card>
            
          </FormProvider>
        </Container>
      </Box>
    </Page>
  );
};

export default connect(null, { authSuccess })(AdminLoginPage);
