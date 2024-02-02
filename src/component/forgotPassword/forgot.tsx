import { Button, TextField } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import styles from "../../styles/globalStyles/home.module.css";
import * as Yup from "yup";
import { useState } from "react";
import CustomSnackbar from "../snackbar";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [toast, setToast] = useState(false);
  const router = useRouter();
  // Define validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Required"),
  });

  // Handle form submission
  const handleSubmit = (values: any) => {
    // router.push("/");
    setToast(true);
  };

  return (
    <Formik
      initialValues={{ email: "" }}
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
        <Button
          variant="contained"
          className="primary-bg btn w-100"
          type="submit"
          sx={{ marginTop: "20px" }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <CustomSnackbar
          open={toast}
          snackbarMessage={"Link has been send successfully"}
          severity={"success"}
          setOpen={() => setToast(false)}
        />
      </Form>
    </Formik>
  );
}
