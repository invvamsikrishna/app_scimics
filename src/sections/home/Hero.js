import React from "react";
import { Grid, Box, Typography, Container, Button } from "@mui/material";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import CustomButton from "../../components/CustomButton";
import { MAXWIDTH, PUBLIC_URL } from "../../constants";
import Typewriter from "typewriter-effect";
import RequestAccessDialog from "../common/RequestAccessDialog";

const Hero = () => {
  return (
    <Container maxWidth={false} disableGutters sx={{ maxWidth: MAXWIDTH, my: 5 }}>
      <Grid container sx={{ backgroundImage: `url(${PUBLIC_URL}/static/images/hero_bg.svg)`, backgroundRepeat: "no-repeat", backgroundPosition: "right", backgroundSize: "contain", height: "520px" }}>
        <Grid item xs={12} md={8}>
          <Box sx={{ pt: 6 }}>
            <Box sx={{ mb: 5, display: "flex", alignItems: "center" }}>
              <Box sx={{ py: 0.5, px: 2, bgcolor: "#ffffff1a", borderRadius: "50px", border: "1px solid #ffffff1a" }}>
                <Typography variant="subtitle2" color="text.primary" fontSize={13} fontWeight={500} sx={{ lineHeight: 1.5, display: "flex", alignItems: "center" }}>
                  Lauching our Private Beta <ArrowForwardIosRoundedIcon sx={{ ml: 1, width: "10px", height: "10px" }} />
                </Typography>
              </Box>
            </Box>

            <Typography variant="h2" color="text.primary" fontWeight={500}>
              Your Success Journey
            </Typography>

            <Typography variant="h2" color="text.primary" fontWeight={500}>
              Begins with{" "}
              <Typewriter
                component="span"
                onInit={(typewriter) => {
                  typewriter.typeString('<span style="color: #CED765">E-Learning</span>').pauseFor(2500).deleteAll().typeString('<span style="color: #CED765">Certification</span>').pauseFor(2500).deleteAll().start();
                }}
                options={{
                  autoStart: true,
                  delay: 100,
                  loop: true,
                }}
              />
            </Typography>

            <Typography variant="h6" color="text.disabled" fontSize={20} fontWeight={500} sx={{ mt: 2, mb: 8 }}>
              Learning, Certifications, AI Resume Builder, Mock Interviews <br />
              and Much More..
            </Typography>

            <RequestAccessDialog title="Request Early Access" />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Hero;
