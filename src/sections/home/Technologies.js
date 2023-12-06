import React from "react";
import { makeStyles } from "@mui/styles";
import { Container, Typography, Box, Stack, Grid, Divider } from "@mui/material";
import { MAXWIDTH, PUBLIC_URL } from "../../constants";
import CustomButton from "../../components/CustomButton";

const useStyles = makeStyles((theme) => ({
  technologyBlock1: {
    "&:before": {
      position: "absolute",
      top: 60,
      left: "50%",
      transform: "translateX(-72px)",
      height: 80,
      width: 144,
      zIndex: 1,
      content: "' '",
      borderLeft: "1px solid #55555560",
      borderRight: "1px solid #55555560",
      borderBottom: "1px solid #55555560",
      borderBottomLeftRadius: "12px",
      borderBottomRightRadius: "12px",
    },
  },
  technologyBlock2: {
    "&:before": {
      position: "absolute",
      top: 140,
      left: "50%",
      height: 70,
      width: 144,
      zIndex: 1,
      content: "' '",
      borderLeft: "1px solid #55555560",
    },
  },
  technologyBlock3: {
    "&:before": {
      position: "absolute",
      top: 80,
      left: "50%",
      height: 70,
      width: 144,
      zIndex: 1,
      content: "' '",
      borderLeft: "1px solid #55555560",
    },
  },
}));

const Technologies = () => {
  const classes = useStyles();

  return (
    <>
      <Container maxWidth={false} disableGutters sx={{ maxWidth: MAXWIDTH, mt: 12, mb: 12 }}>
        <Box sx={{ position: "relative" }}>
          <Box className={classes.technologyBlock1} />
          <Box className={classes.technologyBlock2} />

          <Stack direction="row" spacing={8} justifyContent="center" sx={{ position: "relative", zIndex: 2 }}>
            <Box sx={{ height: 80, width: 80, backgroundImage: "linear-gradient(#5C67C7, #23329C)", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "6px" }}>
              <Box component="img" src={`${PUBLIC_URL}/static/icons/ai1.svg`} sx={{ width: 50, height: 50 }} />
            </Box>

            <Box sx={{ height: 80, width: 80, backgroundImage: "linear-gradient(#5C67C7, #23329C)", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "6px" }}>
              <Box component="img" src={`${PUBLIC_URL}/static/icons/ai2.svg`} sx={{ width: 50, height: 50 }} />
            </Box>
          </Stack>
        </Box>

        <Box sx={{ height: 120 }} />

        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h2" fontWeight={700} gutterBottom>
            AI resume builder
          </Typography>

          <Typography variant="body2" color="text.subtitle">
            The Most Efficient AI Resume Creator Online
          </Typography>
        </Box>

        <Box p={6} />

        <Box component="img" src={`${PUBLIC_URL}/static/images/resume.svg`} sx={{ width: "100%" }} />
      </Container>

      <Container maxWidth="md">
        <Divider />
      </Container>

      <Container maxWidth={false} disableGutters sx={{ maxWidth: MAXWIDTH, mt: 12 }}>
        <Box sx={{ position: "relative" }}>
          <Box className={classes.technologyBlock3} />

          <Stack direction="row" justifyContent="center" sx={{ position: "relative", zIndex: 2 }}>
            <Box sx={{ height: 80, width: 80, backgroundImage: "linear-gradient(#5C67C7, #23329C)", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "6px" }}>
              <Box component="img" src={`${PUBLIC_URL}/static/icons/mock.svg`} sx={{ width: 50, height: 50 }} />
            </Box>
          </Stack>
        </Box>

        <Box p={4} />

        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h2" fontWeight={700} gutterBottom>
            Mock Interview
          </Typography>

          <Typography variant="body2" color="text.subtitle">
            The meaning of a mock interview is self-explanatory
          </Typography>
        </Box>

        <Box p={3} />

        <Box component="img" src={`${PUBLIC_URL}/static/images/mock.png`} sx={{ width: "100%" }} />
      </Container>

      <Container maxWidth="sm" disableGutters sx={{ mt: 20, mb: 16 }}>
        <Stack direction="row" justifyContent="center">
          <Box sx={{ height: 80, width: 80, backgroundImage: "linear-gradient(#5C67C7, #23329C)", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "6px" }}>
            <Box component="img" src={`${PUBLIC_URL}/static/icons/future.svg`} sx={{ width: 50, height: 50 }} />
          </Box>
        </Stack>

        <Box p={2} />

        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h2" fontWeight={500} gutterBottom>
            Built for your future.
          </Typography>

          <Typography variant="body2" color="text.subtitle">
            Experience the most enjoyable, powerful way for you to learn and transform your career.
          </Typography>

          <Box p={5} />

          <CustomButton title="Request Early Access" />
        </Box>
      </Container>
    </>
  );
};

export default Technologies;
