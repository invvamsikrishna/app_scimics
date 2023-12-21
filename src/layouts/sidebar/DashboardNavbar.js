import { alpha, styled } from "@mui/material/styles";
import { Box, Stack, AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import Iconify from "../../components/Iconify";
import AccountPopover from "./AccountPopover";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const DRAWER_WIDTH = 240;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 64;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)",
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up("lg")]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  borderBottom: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.up("lg")]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

export default function DashboardNavbar({ account, onOpenSidebar }) {
  const [title, setTitle] = useState(document.title);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const title = document.title.split("|")[0];
      setTitle(title);
    });

    observer.observe(document.querySelector("title"), { childList: true });

    return () => observer.disconnect();
  }, []);

  return (
    <RootStyle elevation={5}>
      <ToolbarStyle>
        <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: "text.primary", display: { lg: "none" } }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>

        <Typography variant="subtitle2" fontWeight={500}>
          {title}
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          <AccountPopover account={account} />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
}
