import { useState } from "react";
import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";
import { connect } from "react-redux";

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 64;

const RootStyle = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const MainStyle = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE + 50,
  paddingBottom: theme.spacing(8),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 8,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

const SidebarLayout = ({ account }) => {
  const [open, setOpen] = useState(false);

  return (
    <RootStyle>
      <DashboardNavbar account={account ?? {}} onOpenSidebar={() => setOpen(true)} />

      <DashboardSidebar account={account ?? {}} isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />

      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.auth?.user,
  };
};

export default connect(mapStateToProps)(SidebarLayout);
