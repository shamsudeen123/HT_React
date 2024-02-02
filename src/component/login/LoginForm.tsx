"use client";
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import Toaster from "../toaster/Toaster";
import { useDispatch, useSelector } from "react-redux";
import { HTLogin } from "@/redux/slices/attendanceSystem";
import { END_POINT } from "@/redux/serverEndPoints";

export default function LoginForm() {

  const dispatch: any = useDispatch();
  const response = useSelector((state: any) => state?.attendanceSystem?.login);
  
  // Define validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Required"),
    password: Yup.string()
      .required("Required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Must contain at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special symbol"
      ),
  });

  const [isLoginBtnClicked, setIsLoginBtnClicked] = useState(false);
  const [openToaster, setOpenToaster] = useState(false);
  const [isErrorMessage, setIsErrorMessage] = useState(false);
  const [tosterMessage, setTosterMessage] = useState("");
  const router = useRouter();

  // Handle form submission
  const handleSubmit = (values: any) => {
    setIsLoginBtnClicked(true);
    const requestBody = {
      email: values.email,
      password: values.password,
    };
    dispatch(HTLogin(END_POINT.login, requestBody));
    setIsLoginBtnClicked(true);
  };
  //actions based on the API response
  useEffect(() => {
    if (response?.data?.success && isLoginBtnClicked) {
      setOpenToaster(true);
      setTosterMessage(response?.data?.message);
      setTimeout(() => {
        router.push("/dashboard");
        localStorage.setItem("accessToken", response?.data?.token);
        localStorage.setItem("role", response?.data?.data?.role);
        localStorage.setItem("dealerName", response?.data?.data?.dealerName);
        localStorage.setItem("profileImg", response?.data?.data?.profileImg);
        localStorage.setItem("userID", response?.data?.data?.id);
      }, 2000);
      setIsLoginBtnClicked(false);
      setIsErrorMessage(false);
    } else if (response?.data?.success === false && isLoginBtnClicked) {
      setOpenToaster(true);
      setTosterMessage(response?.data?.message);
      setIsLoginBtnClicked(false);
      setIsErrorMessage(true);
    }
  }, [response]);

  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword: any) => !prevShowPassword);
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <div>
          <Field
            name="email"
            as={TextField}
            label="Email Address "
            fullWidth
            margin="normal"
            helperText={<ErrorMessage name="email" />}
          />
        </div>
        <div>
          <Field
            name="password"
            type={showPassword ? "text" : "password"}
            as={TextField}
            label="Password"
            fullWidth
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            helperText={<ErrorMessage name="password" />}
          />
        </div>
        <Button
          variant="contained"
          className="primary-bg btn w-100"
          type="submit"
          sx={{ marginTop: "20px" }}
        >
          Login
        </Button>
        <Toaster
          toasterMessage={tosterMessage}
          open={openToaster}
          setOpen={() => setOpenToaster(false)}
          error={isErrorMessage}
        />
      </Form>
    </Formik>
  );
}
