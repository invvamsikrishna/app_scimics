import React, { useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box, Drawer} from "@mui/material";
import { PUBLIC_URL } from "../../constants";
import useResponsive from "../../hooks/useResponsive";
import NavSection from "../../components/NavSection";
// import { connect } from "react-redux";
import { NavConfigAdmin } from "./NavConfigAdmin";
import BulkUpload from "../../components/BulkUpload";

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
      <BulkUpload />
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

// const mapStateToProps = (state) => {
//   return {
//     exam: state.exam,
//   };
// };

export default AdminDashboardSidebar
// connect(mapStateToProps, { getTestQuestion })(AdminDashboardSidebar);