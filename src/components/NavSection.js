import { useState } from "react";
import PropTypes from "prop-types";
import { NavLink as RouterLink, matchPath, useLocation } from "react-router-dom";
import { alpha, styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { Box, List, Collapse, ListItemText, ListItemIcon, ListItemButton, ListItem } from "@mui/material";
import Iconify from "./Iconify";

export const ListItemStyle = styled((props) => <ListItemButton disableGutters {...props} />)(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: "relative",
  textTransform: "capitalize",
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
}));

export const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  minWidth: 38,
  color: "inherit",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const ListItemStyle2 = styled((props) => <ListItem disableGutters {...props} />)(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: "relative",
  textTransform: "capitalize",
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
}));

export const ListItemIconStyle2 = styled(ListItemIcon)({
  width: 22,
  height: 22,
  minWidth: 54,
  color: "inherit",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const useStyles = makeStyles((theme) => ({
  activeRootStyle: {
    color: "white",
    // fontWeight: "fontWeightMedium",
    backgroundColor: alpha(theme.palette.text.subtitle, theme.palette.action.selectedOpacity),
  },
  activeSubStyle: {
    color: "white",
    // fontWeight: "fontWeightMedium",
  },
}));

function NavItem({ item, active }) {
  const classes = useStyles();

  const isActiveRoot = active(item.path);

  const { title, path, icon, info, children } = item;

  const [open, setOpen] = useState(isActiveRoot);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  if (children) {
    return (
      <>
        <ListItemStyle className={isActiveRoot ? classes.activeRootStyle : null} onClick={handleOpen}>
          <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
          <ListItemText disableTypography primary={title} />
          {info && info}
          <Iconify icon={open ? "eva:arrow-ios-downward-fill" : "eva:arrow-ios-forward-fill"} sx={{ width: 16, height: 16, mx: 2 }} />
        </ListItemStyle>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map((item) => {
              const { title, path } = item;
              const isActiveSub = active(path);

              return (
                <ListItemStyle key={title} className={isActiveRoot ? classes.activeSubStyle : null} component={RouterLink} to={path}>
                  <ListItemIconStyle>
                    <Box
                      component="span"
                      sx={{
                        width: 4,
                        height: 4,
                        display: "flex",
                        borderRadius: "50%",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "text.disabled",
                        transition: (theme) => theme.transitions.create("transform"),
                        ...(isActiveSub && {
                          transform: "scale(2)",
                          bgcolor: "primary.main",
                        }),
                      }}
                    />
                  </ListItemIconStyle>

                  <ListItemText disableTypography primary={title} />
                </ListItemStyle>
              );
            })}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <ListItemStyle className={isActiveRoot ? classes.activeRootStyle : null} component={RouterLink} to={path}>
      <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
      <ListItemText disableTypography primary={title} />
      {info && info}
    </ListItemStyle>
  );
}

NavSection.propTypes = {
  navConfig: PropTypes.array,
};

export default function NavSection({ navConfig, ...other }) {
  const { pathname } = useLocation();

  const match = (path) => (path ? !!matchPath({ path, end: false }, pathname) : false);

  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {navConfig.map((item) => (
          <NavItem key={item.title} item={item} active={match} />
        ))}
      </List>
    </Box>
  );
}
