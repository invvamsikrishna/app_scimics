import { useState, useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box, Link, Button, Drawer, Typography, Avatar, Stack, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { PUBLIC_URL } from "../../constants";
import useResponsive from "../../hooks/useResponsive";
import NavSection from "../../components/NavSection";
import { navConfig } from "./NavConfig";
import FeedbackIcon from "@mui/icons-material/Feedback";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";

const DRAWER_WIDTH = 240;

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

export default function DashboardSidebar({ account, isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();

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
          {renderContent}
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
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
