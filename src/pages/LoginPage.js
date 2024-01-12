import * as Yup from "yup";
import { makeStyles } from "@mui/styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Container, Typography, Box, Card, Stack, alpha } from "@mui/material";
import Page from "../components/Page";
import { COMMON_ERROR_MSG, PUBLIC_URL } from "../constants";
import useResponsive from "../hooks/useResponsive";
import CustomButton from "../components/CustomButton";
import Iconify from "../components/Iconify";
import { FormProvider, RHFTextField } from "../components/hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthServices from "../services/AuthServices";
import { connect } from "react-redux";
import { authSuccess } from "../actions/auth";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { useAlertContext } from "../components/AlertProvider";

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

const LoginPage = ({ authSuccess }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { showSnackbar } = useAlertContext();
  const lgUp = useResponsive("up", "lg");

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get("code");

    if (code) {
      getGithubUserInfo(code);
    }
  }, []);

  const schema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email address is required"),
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

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const response = await AuthServices.loginPerson({ ...data, user_type: "USER" });
      const responseData = response.data?.data ?? {};
      setLoading(false);

      if (responseData.is_account_verified == true) {
        authSuccess(responseData);
        navigate("/user/icap-test", { replace: true });
      } else {
        navigate("/verification", { state: responseData });
      }
    } catch (err) {
      showSnackbar(err.response?.data?.error ?? COMMON_ERROR_MSG, "error");
      setLoading(false);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const result = await AuthServices.getGoogleUserInfo(tokenResponse.access_token);
        handleGoogleSubmit(result.data);
      } catch (err) {
        showSnackbar(err.response?.data?.error ?? COMMON_ERROR_MSG, "error");
      }
    },
    onError: () => {
      console.log("Login Failed");
    },
  });

  const handleGoogleSubmit = async (data) => {
    setLoading(true);

    try {
      var values = { firstname: data.given_name, lastname: data.family_name, email: data.email, pic: data.picture, signin_source: "GOOGLE" };

      const response = await AuthServices.googleLoginPerson(values);
      const responseData = response.data?.data ?? {};
      setLoading(false);

      if (responseData.is_account_verified == true) {
        authSuccess(responseData);
        navigate("/user/icap-test", { replace: true });
      }
    } catch (err) {
      showSnackbar(err.response?.data?.error ?? COMMON_ERROR_MSG, "error");
      setLoading(false);
    }
  };

  // const handleGithubLogin = async () => {
  //   const githubOAuthUrl = "https://github.com/login/oauth/authorize?client_id=2e63a9cb2528d488121b&scope=user:email";
  //   window.open(githubOAuthUrl, "_blank");
  // try {
  //   const result = await axios.get("https://github.com/login/oauth/authorize?client_id=2e63a9cb2528d488121b&scope=user:email");
  //   const result = await AuthServices.githubLoginPerson();
  //   console.log(result);
  // } catch (err) {
  //   showSnackbar(err.response?.data?.error ?? COMMON_ERROR_MSG, "error");
  // }
  // };

  const handleGithubLogin = () => {
    window.location.assign(AuthServices.githubOauthUrl());
  };

  const getGithubUserInfo = async (code) => {
    try {
      const response = await AuthServices.getGithubUserInfo(code);
      const responseData = response.data?.user_data ?? {};
      handleGithubSubmit(responseData);
    } catch (err) {
      // showSnackbar(err.response?.data?.error ?? COMMON_ERROR_MSG, "error");
    }
  };

  const handleGithubSubmit = async (data) => {
    setLoading(true);

    try {
      var values = { name: data.name, avatar_url: data.avatar_url, github_id: data.id };

      const response = await AuthServices.githubLoginPerson(values);
      const responseData = response.data?.data ?? {};
      setLoading(false);

      if (responseData.is_account_verified == true) {
        authSuccess(responseData);
        navigate("/user/icap-test", { replace: true });
      }
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
            <Box sx={{ py: 3, display: "flex", justifyContent: "center" }}>
              <Box component="img" src={PUBLIC_URL + "/static/icons/logo.svg"} sx={{ width: 130 }} />
            </Box>

            <Card className={classes.card} sx={{ px: 5, pt: 3, pb: 3 }}>
              <Typography fontWeight={500} sx={{ color: "text.subtitle" }}>
                Welcome{" "}
                <Typography component="span" fontSize={20}>
                  &#128075;
                </Typography>
              </Typography>

              <Typography variant="subtitle2" fontSize={30} fontWeight={600}>
                Login Account
              </Typography>

              <Box p={1} />

              <Stack direction="row" spacing={3}>
                <CustomButton title="Google" loading={isLoading} startIcon={<Iconify icon={"mdi:google"} />} onPressed={handleGoogleLogin} sx={{ width: "100%" }} />

                <CustomButton title="Github" loading={isLoading} startIcon={<Iconify icon={"mdi:github"} />} onPressed={handleGithubLogin} sx={{ width: "100%" }} />
              </Stack>

              <Box p={1} />

              <Typography variant="subtitle1" color="primary.main" fontWeight={500} textAlign="center">
                Or
              </Typography>

              {/* <Box p={1} /> */}

              <Stack spacing={1}>
                <RHFTextField name="email" label="Email address*" placeholder="Enter email address" />

                <RHFTextField name="password" type="password" label="Password*" placeholder="Enter password" />
              </Stack>

              <Box p={2} />

              <CustomButton loading={isLoading} type="submit" title="Login" sx={{ width: "100%" }} />

              <Box p={1} />

              <Typography variant="body2" color="text.disabled" fontWeight="normal" textAlign="center">
                You don't have an account ?{" "}
                <Link to={"/signup"} style={{ color: "#CED765" }}>
                  Register account
                </Link>
              </Typography>
            </Card>

            {/* <Box p={5} /> */}
          </FormProvider>
        </Container>
      </Box>
    </Page>
  );
};
export default connect(null, { authSuccess })(LoginPage);
