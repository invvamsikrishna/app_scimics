import React, { useRef } from "react";
import { Container, Typography, Box, Stack, Grid, Avatar, IconButton, Divider } from "@mui/material";
import { MAXWIDTH, PUBLIC_URL } from "../../constants";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";

const Certifications = () => {
  const owlCarouselRef = useRef(null);

  const items = [
    { image: `${PUBLIC_URL}/static/icons/js.svg` },
    { image: `${PUBLIC_URL}/static/icons/html.svg` },
    { image: `${PUBLIC_URL}/static/icons/css.svg` },
    { image: `${PUBLIC_URL}/static/icons/python.svg` },
    { image: `${PUBLIC_URL}/static/icons/c++.svg` },
    { image: `${PUBLIC_URL}/static/icons/go.svg` },
    { image: `${PUBLIC_URL}/static/icons/java.svg` },
  ];

  const options = {
    items: 7,
    autoplay: true,
    autoplayTimeout: 3000,
    loop: true,
    margin: 0,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 7,
      },
    },
  };

  return (
    <Container maxWidth={false} disableGutters sx={{ maxWidth: MAXWIDTH, mt: 8, mb: 10 }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <Typography mt={3} variant="h3" fontWeight="500" sx={{ mb: 1 }}>
            Comprehensive Certifications Under One Roof
          </Typography>

          <Container maxWidth="sm">
            <Typography variant="body2" fontSize={15} fontWeight="normal" color="text.subtitle">
              Achieve Recognition: Dive into a curated selection from our extensive catalog of industry-leading certifications.
            </Typography>
          </Container>
        </Box>
      </Container>

      <Box p={5} />

      <Box px={20}>
        <OwlCarousel className="owl-theme" ref={owlCarouselRef} {...options}>
          {items.map((item, index) => (
            <Box key={index} p={2} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Box component="img" src={item.image} sx={{ width: "100%", maxWidth: "100px" }} />
            </Box>
          ))}
        </OwlCarousel>

        <Stack direction="row" px={2} pt={1} spacing={2} sx={{ justifyContent: "end" }}>
          <IconButton size="small" sx={{ bgcolor: "background.disabled" }} onClick={() => owlCarouselRef.current.prev()}>
            <KeyboardArrowLeftRoundedIcon fontSize="small" />
          </IconButton>

          <IconButton size="small" sx={{ bgcolor: "background.disabled" }} onClick={() => owlCarouselRef.current.next()}>
            <KeyboardArrowRightRoundedIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Box>

      <Box p={4} />

      <Container maxWidth="md">
        <Box sx={{ textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <Avatar src={`${PUBLIC_URL}/static/icons/ceo.svg`} sx={{ width: 56, height: 56 }} />

          <Typography mt={3} variant="subtitle1" fontWeight="normal" sx={{ mb: 1 }}>
            Invest in Your Talent. Gain the Skills Your Org Needs to Meet Business Goals and Innovate. Future-proof Your Corporate Workforce with Skill Development. Demo Udemy Business.
          </Typography>

          <Typography variant="body1" fontWeight="normal" color="text.subtitle">
            CEO, RUSA
          </Typography>
        </Box>
      </Container>
    </Container>
  );
};

export default Certifications;
