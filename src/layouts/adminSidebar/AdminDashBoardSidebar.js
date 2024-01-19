import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box, Drawer} from "@mui/material";
import { PUBLIC_URL } from "../../constants";
import useResponsive from "../../hooks/useResponsive";
import NavSection from "../../components/NavSection";
import { NavConfigAdmin } from "./NavConfigAdmin";

const DRAWER_WIDTH = 240;

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const AdminDashboardSidebar = ({ isOpenSidebar, onCloseSidebar, getTestQuestion }) => {
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
      <NavSection navConfig={NavConfigAdmin} />
      <Box flexGrow={1} />
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
};

export default AdminDashboardSidebar