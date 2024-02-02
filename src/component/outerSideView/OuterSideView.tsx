import { Grid } from "@mui/material";
import log from "@/assets/images/app_logo_lg.png";
export default function OuterSideView() {
  return (
    <Grid className="auth-logo-wrapper">
      <img src={log.src} alt="Logo" width={200} />
    </Grid>
  );
}
