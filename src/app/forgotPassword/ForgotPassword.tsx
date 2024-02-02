"use client";

import { Grid } from "@mui/material";
import log from "@/assets/images/logo.svg";

import ForgotPassword from "@/component/forgotPassword";
import OuterSideView from "@/component/outerSideView/OuterSideView";
export default function LoginForgotPassword() {
  return (
    <Grid className="auth-wrapper">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <OuterSideView />
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid>
            <ForgotPassword />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
