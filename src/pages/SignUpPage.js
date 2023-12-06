import * as Yup from "yup";
import { makeStyles } from "@mui/styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Container, Typography, Divider, Box, Button, Card, Grid, Stack, alpha } from "@mui/material";
import Page from "../components/Page";
import { PUBLIC_URL } from "../constants";
import useResponsive from "../hooks/useResponsive";
import CustomButton from "../components/CustomButton";
import Iconify from "../components/Iconify";
import { FormProvider, RHFCheckbox, RHFTextField } from "../components/hook-form";
import { Link } from "react-router-dom";
import { useStyles } from "./LoginPage";

const SignUpPage = () => {
  const classes = useStyles();
  const lgUp = useResponsive("up", "lg");

  const schema = Yup.object().shape({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    email: Yup.string().required("Email address is required"),
    password: Yup.string().required("Password is required"),
    cpassword: Yup.string().required("Confirm password is required"),
    terms: Yup.boolean(),
  });

  const defaultValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    cpassword: "",
    terms: false,
  };

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

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
          <FormProvider methods={methods}>
            <Box sx={{ py: 6, display: "flex", justifyContent: "center" }}>
              <Box component="img" src={PUBLIC_URL + "/static/icons/logo.svg"} sx={{ width: 130 }} />
            </Box>

            <Card className={classes.card} sx={{ px: 5, pt: 3, pb: 6 }}>
              <Typography variant="subtitle2" fontSize={30} fontWeight={600}>
                User Registration
              </Typography>

              <Box p={1} />

              <Stack spacing={2}>
                <RHFTextField name="firstname" label="First Name*" placeholder="Enter first name" />

                <RHFTextField name="lastname" label="Last Name*" placeholder="Enter last name" />

                <RHFTextField name="email" label="Email* (OTP Will Send To Email)" placeholder="Enter email" />

                <RHFTextField name="password" label="Password*" placeholder="Enter password" />

                <RHFTextField name="cpassword" label="Confirm Password*" placeholder="Enter confirm password" />

                <RHFCheckbox name="terms" label="I agree to terms & conditions" />
              </Stack>

              <Box p={2} />

              <CustomButton title="Register" sx={{ width: "100%" }} />

              <Box p={1} />

              <Typography variant="body2" color="text.disabled" fontWeight="normal" textAlign="center">
                You already have an account ?{" "}
                <Link to={"/login"} style={{ color: "#CED765" }}>
                  Login
                </Link>
              </Typography>
            </Card>

            <Box p={7} />
          </FormProvider>
        </Container>
      </Box>
    </Page>
  );
};

export default SignUpPage;
