import { Container, Typography, Divider, Box, Button, Card, Grid, Stack, alpha } from "@mui/material";
import Page from "../components/Page";
import { COMMON_ERROR_MSG, OTPLENGTH_ERROR_MSG, OTPSENT_SUCCESS_MSG, PUBLIC_URL, SIGNUP_SUCCESS_MSG } from "../constants";
import useResponsive from "../hooks/useResponsive";
import CustomButton from "../components/CustomButton";
import AuthServices from "../services/AuthServices";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useStyles } from "./LoginPage";
import PinInput from "react-pin-input";
import { useEffect, useState } from "react";
import { useSnackbar } from "../components/SnackBar";
import { authSuccess } from "../actions/auth";
import { connect } from "react-redux";

const VerificationPage = ({authSuccess}) => {
  const classes = useStyles();
  const props = useLocation().state;
  const navigate = useNavigate();
  const showAlert = useSnackbar();
  const lgUp = useResponsive("up", "lg");

  const [isLoading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");

  const [timer, setTimer] = useState(120); 
  const [isActive, setIsActive] = useState(false);
  
  useEffect(() => {
    if (props.email) {
      sendOtptoEmail();
      // alert("otp sent")
    } else {
      navigate("/404");
    }
  }, []);

  useEffect(() => {
    let interval;
    if (timer > 0 && !isActive) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0 && !isActive) {
      setIsActive(true);
    }
    return () => clearInterval(interval);
  }, [timer, isActive]);

  const sendOtptoEmail = async () => {
    setLoading(true);

    try {
      const response = await AuthServices.sendOtptoEmail({ email: props.email });
      const responseData = response.data?.data ?? {};
      setLoading(false);
      showAlert(OTPSENT_SUCCESS_MSG);
    } catch (err) {
      showAlert(err.response?.data?.error ?? COMMON_ERROR_MSG, "error");
      setLoading(false);
    }
  };

  const handleResend= (e)=>{
    e.preventDefault();
    if (isActive) {
      // alert("clicked")
      sendOtptoEmail();
      setIsActive(false);
      setTimer(120);
    }    
  }

  const handleSubmit = async () => {
    if (otp.length != 6) {
      showAlert(OTPLENGTH_ERROR_MSG, "error");
      return;
    }

    setLoading(true);

    try {
      const response = await AuthServices.verifyOtptoEmail({ email: props.email, received_otp: otp });
      setLoading(false);
      showAlert(SIGNUP_SUCCESS_MSG);

      const responseData = response.data?.data ?? {};
      setLoading(false);
      if (responseData.is_account_verified == true) {
        authSuccess(responseData);
        navigate("/user/icap-test", { replace: true });
      } 
    } catch (err) {
      showAlert(err.response?.data?.error ?? COMMON_ERROR_MSG, "error");
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
          <Box sx={{ py: 6, display: "flex", justifyContent: "center" }}>
            <Box component="img" src={PUBLIC_URL + "/static/icons/logo.svg"} sx={{ width: 130 }} />
          </Box>

          <Card className={classes.card} sx={{ px: 5, pt: 3, pb: 6 }}>
            <Typography variant="subtitle2" fontSize={30} fontWeight={600}>
              OTP Verification
            </Typography>

            <Box p={2} />

            <Box sx={{ width: "100%" }}>
              <PinInput
                length={6}
                type="numeric"
                inputMode="number"
                onComplete={(value) => {
                  setOtp(value);
                }}
                style={{ width: "100%", display: "flex", justifyContent: "space-between" }}
                inputStyle={{ backgroundColor: "#2C2D3C", borderColor: "#2C2D3C", borderRadius: "6px", color: "white", fontSize: 18 }}
              />
            </Box>

            <Box p={1} />

            <Typography variant="body2" color="text.disabled" fontWeight="normal" textAlign="center" gutterBottom>
              Did n’t Receive code ?
            </Typography>

            <Box sx={{ textAlign: "center" }}>
            {isActive ?
              <Link 
              onClick={handleResend}
               style={{ color: "#CED765" }}>Resend Code
              </Link>
              :
              <Typography style={{ color: "#CED765" }}>Resend Code in {timer}s</Typography>
             }
            </Box>

            <Box p={1} />

            <CustomButton loading={isLoading} title="Confirm" onClick={handleSubmit} sx={{ width: "100%" }} />

            <Box p={1} />
          </Card>

          <Box p={7} />
        </Container>
      </Box>
    </Page>
  );
};

export default connect(null, { authSuccess })(VerificationPage);
