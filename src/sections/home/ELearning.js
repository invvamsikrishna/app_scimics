import React, { useRef, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Container, Typography, Box, Stack, Grid, Card, CardActionArea } from "@mui/material";
import { MAXWIDTH, PUBLIC_URL } from "../../constants";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const useStyles = makeStyles((theme) => ({
  elearningBlock1: {
    "&:before": {
      bottom: -80,
      position: "absolute",
      left: "25%",
      right: "50%",
      height: 80,
      zIndex: 1,
      content: "' '",
      borderRight: "1px solid #55555560",
      borderBottom: "1px solid #55555560",
      borderBottomRightRadius: "12px",
    },
  },
  elearningBlock2: {
    "&:before": {
      position: "absolute",
      top: -81,
      left: 40,
      right: "75%",
      height: 350,
      zIndex: 1,
      content: "' '",
      borderTop: "1px solid #55555560",
      borderLeft: "1px solid #55555560",
      borderBottom: "1px solid #55555560",
      borderTopLeftRadius: "12px",
      borderBottomLeftRadius: "12px",
    },
  },
  cardInner: {
    padding: "16px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
  },
}));

const ELearning = () => {
  const classes = useStyles();
  const owlCarouselRef = useRef(null);
  const [currentItem, setCurrentItem] = useState(0);

  const items = [
    {
      name: "Projects",
      desc: "Every Project is an Opportunity to Build and Learn.",
      icon: `${PUBLIC_URL}/static/icons/sm-projects.svg`,
      activeIcon: `${PUBLIC_URL}/static/icons/sm-projects-cr.svg`,
      image: `${PUBLIC_URL}/static/images/projects-main.svg`,
    },
    {
      name: "Roadmaps",
      desc: "AI tailored course plans for your focused learning experience",
      icon: `${PUBLIC_URL}/static/icons/sm-roadmap.svg`,
      activeIcon: `${PUBLIC_URL}/static/icons/sm-roadmap-cr.svg`,
      image: `${PUBLIC_URL}/static/images/roadmap-main.svg`,
    },
    {
      name: "Coding Env",
      desc: "Learn coding seamlessly in our Cloud-Based Environment.",
      icon: `${PUBLIC_URL}/static/icons/sm-coding.svg`,
      activeIcon: `${PUBLIC_URL}/static/icons/sm-coding-cr.svg`,
      image: `${PUBLIC_URL}/static/images/coding-main.svg`,
    },
    {
      name: "AI Assistant",
      desc: "Powerful AI that helps you overcome any coding challenge.",
      icon: `${PUBLIC_URL}/static/icons/sm-ai.svg`,
      activeIcon: `${PUBLIC_URL}/static/icons/sm-ai-cr.svg`,
      image: `${PUBLIC_URL}/static/images/ai-main.svg`,
    },
  ];

  const options = {
    items: 1,
    autoplay: true,
    autoplayTimeout: 3000,
    loop: true,
    margin: 0,
    dots: false,
  };

  const handleChange = (e) => {
    if (e.item.index > 0) {
      const index = e.item.index - 2;
      setCurrentItem(index);
    }
  };

  const handleClick = (index) => {
    owlCarouselRef.current.to(index, 100);
  };

  return (
    <Container maxWidth={false} disableGutters sx={{ maxWidth: MAXWIDTH, mt: 6, mb: 10 }}>
      <Box sx={{ position: "relative" }}>
        <Box className={classes.elearningBlock1} />

        <Box component="img" src={`${PUBLIC_URL}/static/images/elearning.svg`} sx={{ width: "100%" }} />
      </Box>

      <Box sx={{ height: 160 }} />

      <Box sx={{ position: "relative" }}>
        <Box className={classes.elearningBlock2} />

        <Stack direction="row" spacing={3} sx={{ position: "relative", zIndex: 2 }}>
          <Box sx={{ height: 80, width: 80, backgroundImage: "linear-gradient(#5C67C7, #23329C)", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "6px" }}>
            <Box component="img" src={`${PUBLIC_URL}/static/icons/education.svg`} sx={{ width: 60, height: 60 }} />
          </Box>

          <Box>
            <Typography variant="h2" fontWeight={700}>
              E-Learning
            </Typography>
            <Typography variant="body2" color="text.subtitle">
              The Most Complete E-learning Platform Available
            </Typography>
          </Box>
        </Stack>

        <Box sx={{ height: 80 }} />

        <Box pl={10}>
          <Box pt={3} px={5} sx={{ bgcolor: "background.default", border: "1px solid #55555550", borderRadius: 4, position: "relative", zIndex: 2 }}>
            <Grid container spacing={2}>
              {items.map((item, index) => (
                <Grid key={index} item xs={12} sm={6} md={3}>
                  <Card sx={{ boxShadow: 0, height: "100%" }}>
                    <CardActionArea className={classes.cardInner} onClick={() => handleClick(index)}>
                      <Stack direction="row" spacing={1} sx={{ mb: 2, alignItems: "center" }}>
                        <Box component="img" src={currentItem == index ? item.activeIcon : item.icon} sx={{ width: 16, height: 16 }} />

                        <Typography variant="h6" fontWeight="500" color={currentItem == index ? "#CED765" : "text.primary"}>
                          {item.name}
                        </Typography>
                      </Stack>

                      <Typography variant="subtitle2" fontSize={13} fontWeight="500">
                        {item.desc}
                      </Typography>

                      <Box flexGrow={1} />
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Box p={1} />

            <Box sx={{ transform: "translateY(20px)" }}>
              <OwlCarousel className="owl-theme" startPosition={currentItem} ref={owlCarouselRef} {...options} onTranslated={handleChange}>
                {items.map((item, index) => (
                  <Box key={index} component="img" src={item.image} sx={{ width: "100%" }} />
                ))}
              </OwlCarousel>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ELearning;
