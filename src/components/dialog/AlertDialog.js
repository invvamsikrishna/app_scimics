import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { createContext, useContext, useState } from "react";

const AlertDialogContext = createContext();

export const useAlertDialog = () => {
  const context = useContext(AlertDialogContext);
  if (!context) {
    throw new Error("useAlertDialog must be used within a AlertProvider");
  }
  return context;
};

export const AlertDialogProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [agreeCallback, setAgreeCallback] = useState(null);

  const showAlertDialog = ({ title = "Are you sure ?", description = "", agreeCallback = null }) => {
    setTitle(title);
    setDescription(description);
    setAgreeCallback(() => agreeCallback);
    setOpen(true);
  };

  const handleClose = (result) => {
    setOpen(false);

    if (result === "yes" && typeof agreeCallback === "function") {
      agreeCallback();
    }
  };

  return (
    <AlertDialogContext.Provider value={showAlertDialog}>
      {children}

      <Dialog open={open} maxWidth="xs" fullWidth>
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">{description}</DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button color="secondary" onClick={() => handleClose("no")}>
            No
          </Button>

          <Button color="secondary" onClick={() => handleClose("yes")} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </AlertDialogContext.Provider>
  );
};
