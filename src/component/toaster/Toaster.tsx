import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Alert, Typography } from "@mui/material";
import CustomImageComponent from "../image/page";
import { error_icon, toast_Success } from "@/assets/images";
type Props = {
  toasterMessage: any;
  open: boolean;
  setOpen: any;
  // setClose:any;
  error?: boolean;
};
export default function Toaster({
  toasterMessage,
  open,
  setOpen,
  error,
}: Props) {
  //   const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        action={action}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        className={`${error ? "error" : ""} toaster-wrapper`}
      >
        <Alert>
          <CustomImageComponent
            src={error ? error_icon : toast_Success}
            width={40}
            height={40}
            alt={""}
            style={undefined}
          />
          <Typography variant="body1" sx={{ flexGrow: 1, mx: "12px" }}>
            {toasterMessage}
          </Typography>

          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Alert>
      </Snackbar>
    </div>
  );
}
