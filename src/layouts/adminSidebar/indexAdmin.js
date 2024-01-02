import { useState } from "react";
import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import AdminDashboardNavbar from "./AdminDashBoardNavbar";
import AdminDashBoardSidebar from "./AdminDashBoardSidebar";
// import { connect } from "react-redux";

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

const AdminSidebarLayout = ({ account }) => {
  const [open, setOpen] = useState(false);

  return (
    <RootStyle>
      <AdminDashboardNavbar account={account ?? {}} onOpenSidebar={() => setOpen(true)} />
      <AdminDashBoardSidebar account={account ?? {}} isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     account: state.auth?.user,
//   };
// };

export default 
// connect(mapStateToProps)(
    AdminSidebarLayout
    // );