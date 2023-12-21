import React, { useState, useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { darken, styled } from "@mui/material/styles";
import { Box, Link, Button, Drawer, Typography, Avatar, Stack, List, ListItem, ListItemIcon, ListItemText, Grid, Badge, Divider, IconButton } from "@mui/material";
import { PUBLIC_URL, QUES_STATUS, getQuesStatsColor } from "../../constants";
import useResponsive from "../../hooks/useResponsive";
import NavSection, { ListItemIconStyle, ListItemIconStyle2, ListItemStyle, ListItemStyle2, useStyles } from "../../components/NavSection";
import { navConfig } from "./NavConfig";
import FeedbackIcon from "@mui/icons-material/Feedback";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import Iconify from "../../components/Iconify";
import { connect } from "react-redux";
import { getTestQuestion } from "../../actions/exam";

const DRAWER_WIDTH = 240;

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    top: 28,
    right: 5,
    height: 12,
    width: 12,
    backgroundColor: theme.palette.success.main,
    borderRadius: 2,
  },
}));

const DashboardSidebar = ({ exam, isExam, isOpenSidebar, onCloseSidebar, getTestQuestion }) => {
  const { pathname } = useLocation();
  const classes = useStyles();

  const isDesktop = useResponsive("up", "lg");

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
  }, [pathname]);

  const renderContent = (
    <>
      <Box sx={{ px: 2.5, py: 3, display: "inline-flex" }}>
        <Box component="img" src={`${PUBLIC_URL}/static/icons/logo.svg`} sx={{ width: 100 }} />
      </Box>

      <NavSection navConfig={navConfig} />

      <Box flexGrow={1} />

      <List sx={{ mb: 1 }}>
        <ListItem>
          <Typography fontSize={14} fontWeight={500} sx={{ display: "flex", alignItems: "center" }}>
            <FeedbackIcon sx={{ fontSize: 16, color: "text.subtitle", mr: 1 }} />
            <Link underline="none" color="text.subtitle" target="_blank">
              Feedback
            </Link>
          </Typography>
        </ListItem>

        <ListItem>
          <Typography fontSize={14} fontWeight={500} sx={{ display: "flex", alignItems: "center" }}>
            <LocalOfferIcon sx={{ fontSize: 16, color: "text.subtitle", mr: 1 }} />
            <Link underline="none" color="text.subtitle" target="_blank">
              Pricing Plans
            </Link>
          </Typography>
        </ListItem>

        <ListItem>
          <Typography fontSize={14} fontWeight={500} sx={{ display: "flex", alignItems: "center" }}>
            <HelpCenterIcon sx={{ fontSize: 16, color: "text.subtitle", mr: 1 }} />
            <Link underline="none" color="text.subtitle" target="_blank">
              Help & Support
            </Link>
          </Typography>
        </ListItem>
      </List>
    </>
  );

  const examContent = (
    <>
      <Box sx={{ px: 2.5, py: 3, display: "inline-flex" }}>
        <Box component="img" src={`${PUBLIC_URL}/static/icons/logo.svg`} sx={{ width: 100 }} />
      </Box>

      <List disablePadding sx={{ p: 1 }}>
        {exam.data?.map((item, index) => (
          <React.Fragment key={index}>
            <ListItemStyle className={exam.currentTest == index ? classes.activeRootStyle : null}>
              <ListItemIconStyle>
                <Iconify icon={"healthicons:i-exam-multiple-choice"} width={16} height={16} />
              </ListItemIconStyle>

              <ListItemText primary={item.testname} primaryTypographyProps={{ style: { fontSize: 14, overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: "1", WebkitBoxOrient: "vertical" } }} />
            </ListItemStyle>

            {exam.currentTest == index && (
              <Box py={1} pt={1} pb={2}>
                <Grid container rowSpacing={1}>
                  {exam.data[index].questions.map((item, index) => (
                    <Grid key={index} item xs={2.4} sx={{ display: "flex", justifyContent: "center" }}>
                      <QuesBadge value={index + 1} status={item.status} onClick={QUES_STATUS.slice(1, 5).includes(item.status) ? () => getTestQuestion(index) : null} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </React.Fragment>
        ))}
      </List>

      <Box flexGrow={1} />

      <Divider />

      <List>
        <ListItemStyle2>
          <ListItemIconStyle2>
            <QuesBadge value={exam.data[exam.currentTest]?.questions?.filter((e) => e.status == QUES_STATUS[0] || e.status == null).length} status={QUES_STATUS[0]} />
          </ListItemIconStyle2>

          <ListItemText disableTypography primary={"Not Visited"} />
        </ListItemStyle2>

        <ListItemStyle2>
          <ListItemIconStyle2>
            <QuesBadge value={exam.data[exam.currentTest]?.questions?.filter((e) => e.status == QUES_STATUS[1]).length} status={QUES_STATUS[1]} />
          </ListItemIconStyle2>

          <ListItemText disableTypography primary={"Not Answered"} />
        </ListItemStyle2>

        <ListItemStyle2>
          <ListItemIconStyle2>
            <QuesBadge value={exam.data[exam.currentTest]?.questions?.filter((e) => e.status == QUES_STATUS[2]).length} status={QUES_STATUS[2]} />
          </ListItemIconStyle2>

          <ListItemText disableTypography primary={"Answered"} />
        </ListItemStyle2>

        <ListItemStyle2>
          <ListItemIconStyle2>
            <QuesBadge value={exam.data[exam.currentTest]?.questions?.filter((e) => e.status == QUES_STATUS[3]).length} status={QUES_STATUS[3]} />
          </ListItemIconStyle2>

          <ListItemText disableTypography primary={"Mark For Review"} />
        </ListItemStyle2>

        <ListItemStyle2>
          <ListItemIconStyle2>
            <QuesBadge value={exam.data[exam.currentTest]?.questions?.filter((e) => e.status == QUES_STATUS[4]).length} status={QUES_STATUS[4]} />
          </ListItemIconStyle2>

          <ListItemText disableTypography primary={"Answered and Mark For Review"} />
        </ListItemStyle2>
      </List>
    </>
  );

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {isExam ? examContent : renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: "background.default",
              borderRightStyle: "dashed",
            },
          }}
        >
          {isExam ? examContent : renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
};

const QuesBadge = ({ value, status, onClick }) => {
  return (
    <IconButton sx={{ p: 0 }} disabled={onClick == null} onClick={onClick}>
      <StyledBadge color="secondary" variant="dot" invisible={status != QUES_STATUS[4] ? true : false}>
        <Box
          sx={{
            width: 34,
            height: 34,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: getQuesStatsColor(status),
            borderRadius: 1,
          }}
        >
          <Typography variant="subtitle2" fontSize={14} fontWeight="normal" color={"white"}>
            {value}
          </Typography>
        </Box>
      </StyledBadge>
    </IconButton>
  );
};

const mapStateToProps = (state) => {
  return {
    exam: state.exam,
  };
};

export default connect(mapStateToProps, { getTestQuestion })(DashboardSidebar);
