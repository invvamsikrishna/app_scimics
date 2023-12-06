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
import { FormProvider, RHFTextField } from "../components/hook-form";
import { Link } from "react-router-dom";

export const useStyles = makeStyles((theme) => ({
  root: { position: "relative", minHeight: "100vh", overflow: "hidden" },
  card: {
    background: "linear-gradient(151.39deg, rgba(44, 45, 60, 0.472) 3.72%, rgba(15, 16, 18, 0.656) 96.89%), linear-gradient(0deg, rgba(44, 45, 60, 0.5), rgba(44, 45, 60, 0.5))",
    border: "1px solid #2C2D3C80",
    boxShadow: "none",
  },
  ellipse1: {
    "&:before": {
      backgroundColor: alpha("#2C2D3C", 0.2),
      position: "absolute",
      top: -153,
      left: -175,
      borderRadius: "50%",
      height: 350,
      width: 350,
      zIndex: -1,
      content: "' '",
      border: `3px solid ${alpha("#2C2D3C", 0.2)}`,
    },
  },

  ellipse2: {
    "&:before": {
      backgroundColor: alpha("#2C2D3C", 0.2),
      position: "absolute",
      left: -155,
      bottom: -153,
      borderRadius: "50%",
      height: 306,
      width: 306,
      zIndex: -1,
      content: "' '",
      border: `3px solid ${alpha("#2C2D3C", 0.2)}`,
    },
  },
  ellipse3: {
    "&:before": {
      backgroundColor: alpha("#2C2D3C", 0.2),
      position: "absolute",
      right: -118,
      top: -144,
      borderRadius: "50%",
      height: 306,
      width: 306,
      zIndex: -1,
      content: "' '",
      border: `3px solid ${alpha("#2C2D3C", 0.2)}`,
    },
  },
  ellipseSm1: {
    "&:before": {
      backgroundColor: alpha("#2C2D3C", 0.5),
      position: "absolute",
      left: "33%",
      top: -122,
      borderRadius: "50%",
      height: 200,
      width: 200,
      zIndex: -1,
      content: "' '",
    },
  },
  ellipseSm2: {
    "&:before": {
      backgroundColor: alpha("#2C2D3C", 0.5),
      position: "absolute",
      right: "20%",
      bottom: -122,
      borderRadius: "50%",
      height: 200,
      width: 200,
      zIndex: -1,
      content: "' '",
    },
  },
}));

const LoginPage = () => {
  const classes = useStyles();
  const lgUp = useResponsive("up", "lg");

  const schema = Yup.object().shape({
    email: Yup.string().required("Email address is required"),
    password: Yup.string().required("Password is required"),
  });

  const defaultValues = {
    email: "",
    password: "",
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
              <Typography fontWeight={500} sx={{ color: "text.subtitle" }}>
                Welcome{" "}
                <Typography component="span" fontSize={20}>
                  &#128075;
                </Typography>
              </Typography>

              <Typography variant="subtitle2" fontSize={30} fontWeight={600}>
                Login Account
              </Typography>

              <Box p={2} />

              <Stack direction="row" spacing={3}>
                <CustomButton title="Google" startIcon={<Iconify icon={"mdi:google"} />} sx={{ width: "100%" }} />
                <CustomButton title="Github" startIcon={<Iconify icon={"mdi:github"} />} sx={{ width: "100%" }} />
              </Stack>

              <Box p={1} />

              <Typography variant="subtitle1" color="primary.main" fontWeight={500} textAlign="center">
                Or
              </Typography>

              <Box p={1} />

              <Stack spacing={2}>
                <RHFTextField name="email" label="Email address*" placeholder="Enter email address" />

                <RHFTextField name="password" label="Password*" placeholder="Enter password" />
              </Stack>

              <Box p={2} />

              <CustomButton component={Link} to="/verification" title="Login" sx={{ width: "100%" }} />

              <Box p={1} />

              <Typography variant="body2" color="text.disabled" fontWeight="normal" textAlign="center">
                You don't have an account ?{" "}
                <Link to={"/signup"} style={{ color: "#CED765" }}>
                  Register account
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

export default LoginPage;
