import PropTypes from "prop-types";
import { Scrollbars } from "react-custom-scrollbars";
import { alpha, styled } from "@mui/material/styles";
import { Box } from "@mui/material";

const RootStyle = styled("div")(() => ({
  flexGrow: 1,
  height: "100%",
  overflow: "hidden",
}));

Scrollbar.propTypes = {
  children: PropTypes.node.isRequired,
  sx: PropTypes.object,
};

export default function Scrollbar({ children, sx, ...other }) {
  return (
    <RootStyle>
      <Scrollbars autoHide autoHideTimeout={500} sx={sx} {...other}>
        {children}
      </Scrollbars>
    </RootStyle>
  );
}
