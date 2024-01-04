// import * as Yup from "yup";
import { makeStyles } from "@mui/styles";
import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
import { Container, Typography, Box, Card, Stack, alpha, InputLabel, CircularProgress, IconButton } from "@mui/material";
import Page from "../components/Page";
import { PUBLIC_URL } from "../constants";
import useResponsive from "../hooks/useResponsive";
import CustomButton from "../components/CustomButton";
import { FormProvider } from "../components/hook-form";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
// import AuthServices from "../services/AuthServices";
import { useSnackbar } from "../components/SnackBar";
// import { connect } from "react-redux";
// import { authSuccess } from "../actions/auth";
import { CustomTextField } from "../components/hook-form/RHFTextField";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import VisibilityIcon from "@mui/icons-material/Visibility";

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

const AdminLoginPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const showAlert = useSnackbar();
  const lgUp = useResponsive("up", "lg");
  const [passwordType, setPasswordType] = useState("password");
  // const [eyeIcon, setEyeIcon] = useState(false);

  const [isLoading, setLoading] = useState(false);

  // const togglePasswordVisibility = () => {
  //   setPasswordType((prevType) => (prevType === "password" ? "text" : "password"));
  // };
  const defaultValues = {
    email: "",
    password: "",
  };

  const methods = useForm({
    // resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const onSubmit = async () => {
    setLoading(true);
    const mail ="admin@123.com";
    const pass ="admin@123";
    if(mail===email && pass===password){
      setLoading(false);
      navigate("/admin-dashboard/cognitive-abilities-page", { replace: true });
    }else{
      showAlert("wrong credentials");
      setTimeout(() => {
        if (showAlert.close) {
          showAlert.close();
      }
      }, 20000);
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
                <InputLabel shrink={false} htmlFor={"username"}>
                  <Typography component="span" color="white" fontSize={12} fontWeight="normal">
                  Email address*
                  </Typography>
                </InputLabel>

                <CustomTextField 
                onChange={(e)=>setEmail(e.target.value)}
                name="email"
                type="email"
                placeholder="Enter email address"
                endadornment={<React.Fragment>
                {isLoading ? <CircularProgress color="primary" size={20} /> : null}
              </React.Fragment>}
                >
                </CustomTextField>
                
                <InputLabel shrink={false} htmlFor={"username"}>
                  <Typography component="span" color="white" fontSize={12} fontWeight="normal">
                  Password*
                  </Typography>
                </InputLabel>

                <CustomTextField 
                onChange={(e)=>setPassword(e.target.value)}
                name="password"
                type={passwordType}
                placeholder="Enter password"
                endadornment={<React.Fragment>
                {isLoading ? <CircularProgress color="primary" size={20} /> : null}
                {/* {passwordType === "password" && (
                    <IconButton onClick={togglePasswordVisibility} sx={{ p: 0, color: "white" }}>
                      {eyeIcon ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  )} */}
              </React.Fragment>
              }
                >
                </CustomTextField>
              </Stack>

              <Box p={2} />

              <CustomButton loading={isLoading} type="submit" title="Login" sx={{ width: "100%" }} />
            </Card>
            <Box p={7} />
          </FormProvider>
        </Container>
      </Box>
    </Page>
  );
};
export default AdminLoginPage;
