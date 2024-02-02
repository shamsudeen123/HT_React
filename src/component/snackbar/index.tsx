import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type Props = {
    snackbarMessage: any;
    severity: string;
    open: boolean;
    setOpen: any;
    // setClose:any;
}

function CustomSnackbar({snackbarMessage, severity, open, setOpen}: Props) {

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    // setClose(false);
    setOpen(false);
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        <Alert severity={severity === 'success' ? 'success' : 'error'} sx={{ width: "100%", opacity: 1 , color: "#4BB58C",backgroundColor:"#ffffff"}}>
        
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CustomSnackbar;
