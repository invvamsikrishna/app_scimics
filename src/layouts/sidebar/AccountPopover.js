import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { alpha } from "@mui/material/styles";
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton } from "@mui/material";
import MenuPopover from "../../components/MenuPopover";
import { connect } from "react-redux";
import { authLogout } from "../../actions/auth";

const MENU_OPTIONS = [
  {
    label: "Home",
    icon: "eva:home-fill",
    linkTo: "./dashboard",
  },
  {
    label: "Profile",
    icon: "eva:person-fill",
    linkTo: "/user/profile",
  },
  {
    label: "Settings",
    icon: "eva:settings-2-fill",
    linkTo: "./account",
  },
];

const AccountPopover = ({ account, authLogout }) => {
  const anchorRef = useRef(null);

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = () => {
    authLogout();
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
        <Avatar sx={{ bgcolor: "#009BA5", color: "white" }}>{account.user?.firstname?.charAt(0)}</Avatar>
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
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {account.user?.firstname} {account.user?.lastname}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            India
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} to={option.linkTo} component={RouterLink} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem to={"/login"} component={RouterLink} onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </MenuPopover>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.auth,
  };
};

export default connect(mapStateToProps, { authLogout })(AccountPopover);