// import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { alpha } from "@mui/material/styles";
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton } from "@mui/material";
import MenuPopover from "../../components/MenuPopover";
import { useAlertContext } from "../../components/AlertProvider";
// import { connect } from "react-redux";
// import { authLogout } from "../../actions/auth";

const MENU_OPTIONS = [
  // {
  //   label: "Home",
  //   icon: "eva:home-fill",
  //   linkTo: "/admin-dashboard/",
  // },
  {
    label: "Admin Profile",
    icon: "eva:person-fill",
    linkTo: "/admin-dashboard/adminprofile",
  },
  // {
  //   label: "Settings",
  //   icon: "eva:settings-2-fill",
  //   linkTo: "/admin-dashboard",
  // },
];

const AdminAccountPopover = () =>
  // { account, authLogout }
  {
    const anchorRef = useRef(null);
    const navigate = useNavigate();
    const { showAlertDialog } = useAlertContext();

    const [open, setOpen] = useState(null);

    const handleOpen = (event) => {
      setOpen(event.currentTarget);
    };

    const handleClose = () => {
      setOpen(null);
    };

    const handleLogout = () => {
      showAlertDialog({
        title: "Logout",
        description: "Are you sure, you want to log out?",
        agreeCallback: () => {
          // authLogout();
          navigate("/adminpanellogin");
        },
      });
    };

    return (
      <>
        <IconButton
          ref={anchorRef}
          onClick={handleOpen}
          sx={{
            p: 0,
            ...(open && {
              "&:before": {
                zIndex: 1,
                content: "''",
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                position: "absolute",
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
              },
            }),
          }}
        >
          <Avatar
            // src={account.user?.pic}
            sx={{ bgcolor: "#009BA5", color: "white" }}
          />
        </IconButton>

        <MenuPopover
          open={Boolean(open)}
          anchorEl={open}
          onClose={handleClose}
          sx={{
            p: 0,
            mt: 1.5,
            ml: 0.75,
            "& .MuiMenuItem-root": {
              typography: "body2",
              borderRadius: 0.75,
            },
          }}
        >
          {/* <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap> */}
          {/* {account.user?.firstname} {account.user?.lastname} */}
          {/* Admin
          </Typography> */}
          {/* <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            India
          </Typography> */}
          {/* </Box> */}

          {/* <Divider sx={{ borderStyle: "dashed" }} /> */}

          <Stack sx={{ p: 1 }}>
            {MENU_OPTIONS.map((option) => (
              <MenuItem key={option.label} to={option.linkTo} component={RouterLink} onClick={handleClose}>
                {option.label}
              </MenuItem>
            ))}
          </Stack>

          <Divider sx={{ borderStyle: "dashed" }} />

          <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
            Logout
          </MenuItem>
        </MenuPopover>
      </>
    );
  };

// const mapStateToProps = (state) => {
//   return {
//     account: state.auth,
//   };
// };

export default AdminAccountPopover;
// connect(mapStateToProps, { authLogout })(AdminAccountPopover);
