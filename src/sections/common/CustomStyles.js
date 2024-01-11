import { makeStyles } from "@mui/styles";

export const customMuiStyles = makeStyles((theme) => ({
  customTable: {
    "& th": { padding: "16px 8px" },
    "& td": { padding: "16px 8px" },
  },
}));
