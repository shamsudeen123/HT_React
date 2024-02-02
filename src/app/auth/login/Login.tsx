"use client";
import { Grid, Link, Typography } from "@mui/material";
import logo from "@/assets/images/logo.svg";
import LoginForm from "@/component/login/page";
import OuterSideView from "@/component/outerSideView/OuterSideView";

export default function Login() {

  return (
    <>
      <Grid className="auth-wrapper">
        <Grid container spacing={0} sx={{ alignItems: "center" }}>
          <Grid item xs={12} md={6}>
            <OuterSideView />
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid className="form-wrapper ">
              <img src={logo.src} alt="" className="login-logo" />
              <Grid className="form-wrapper-content wrapper-before">
                <Typography
                  variant="h2"
                  className="fs-26 fw-600 primary-font-color"
                >
                  Sign in to Admin Dashboard
                </Typography>
                <Typography
                  variant="body1"
                  className="fs-16 fw-400 secondary-font-color"
                  sx={{ marginBottom: "40px" }}
                >
                  Enter the email address and password to login
                </Typography>
                <LoginForm />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
