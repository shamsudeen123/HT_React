import { Button, Grid, TextField, Typography } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import styles from "../../styles/globalStyles/home.module.css";
import logo from "../../assets/images/logo.svg";
import ForgotPassword from "./forgot";
export default function LoginForm() {
  return (
    <Grid className="form-wrapper ">
      <img src={logo.src} alt="" className="login-logo" />
      <Grid className="form-wrapper-content wrapper-before">
        <Typography variant="h2" className="fs-26 fw-600 primary-font-color">
          Forgot Password?
        </Typography>
        <Typography
          variant="body1"
          className="fs-16 fw-400 secondary-font-color"
          sx={{ marginBottom: "40px" }}
        >
          Enter your email address and we will sent a link to reset your
          password
        </Typography>
        <ForgotPassword />
      </Grid>
    </Grid>
  );
}
