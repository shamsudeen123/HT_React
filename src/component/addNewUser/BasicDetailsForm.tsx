import ASSelect from "@/molecules/ASSelect";
import ASTextField from "@/molecules/ASTextfield";
import { END_POINT } from "@/redux/serverEndPoints";
import { getListview } from "@/redux/slices/attendanceSystem";

import { STRINGS } from "@/strings";
import { Typography, Grid, Select, SelectChangeEvent } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form } from "react-hook-form";
interface AddUserProps {
  onFormDataChange: (formData: FormData | null) => void;
}
interface FormData {
  firstName: string;
  secondName: string;
  employerId: string;
  department: string;
  gender: string;
  status: string;
}
function BasicDetailsForm({ onFormDataChange }: AddUserProps) {
  // const [firstName, setFirstName] = useState("");
  // const [secondName, setSecondName] = useState("");
  // const [employerId, setEmployerId] = useState("");
  // const [department, setDepartment] = useState("");
  // const [gender, setGender] = useState("");
  // const [status, setStatus] = useState("");
  const dispatch: any = useDispatch();
  const response = useSelector(
    (state: any) => state?.attendanceSystem?.listview
  );
  useEffect(() => {
    dispatch(getListview(END_POINT.departmentListView, "department list"));
  }, []);

  // const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   setFirstName(value);
  //   onInputChange(value, secondName, employerId, department, gender, status);
  // };

  // const handleSecondNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   setSecondName(value);
  //   onInputChange(firstName, value, employerId, department, gender, status);
  // };
  // const handleEmployerIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   setEmployerId(value);
  //   onInputChange(firstName, secondName, value, department, gender, status);
  // };
  // const handleGenderChange = (event: SelectChangeEvent) => {
  //   const value = event.target.value;
  //   setGender(value);
  //   onInputChange(firstName, secondName, employerId, department, value, status);
  // };
  // const handleDepartmentChange = (event: SelectChangeEvent) => {
  //   const value = event.target.value;
  //   setDepartment(value);
  //   onInputChange(firstName, secondName, employerId, value, gender, status);
  // };
  // const handleStatusChange = (event: SelectChangeEvent) => {
  //   const value = event.target.value;
  //   setStatus(value);
  //   onInputChange(firstName, secondName, employerId, department, gender, value);
  // };
  const formik = useFormik({
    initialValues: {
      firstName: "",
      secondName: "",
      employerId: "",
      department: "",
      gender: "",
      status: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      secondName: Yup.string().required("Last Name is required"),
      employerId: Yup.string().required("Employer ID is required"),
      department: Yup.string().required("Department is required"),
      gender: Yup.string().required("Gender is required"),
      status: Yup.string().required("Status is required"),
    }),
    onSubmit: () => {
      // No need for submit logic since we're not using a submit button
    },
  });
  useEffect(() => {
    const isValid = Object.keys(formik.errors).length === 0;
    if (isValid) {
      onFormDataChange(formik.values);
    } else {
      onFormDataChange(null);
    }
  }, [formik.values, formik.errors, onFormDataChange]);
  // const handleInputChange = (
  //   event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  // ) => {
  //   formik.handleChange(event);
  //   formik.validateForm().then((errors) => {
  //     const hasErrors = Object.keys(errors).length > 0;
  //     if (!hasErrors) {
  //       onFormDataChange(formik.values);
  //     } else {
  //       onFormDataChange(null);
  //     }
  //   });
  // };
  return (
    <Grid>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              className="add-user-section-heading-text"
              sx={{ mt: 4 }}
            >
              {STRINGS.BASIC_DETAILS}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <ASTextField
              name="firstName"
              label="First Name"
              className="w-100"
              type="text"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <ASTextField
              name="SecondName"
              label="Second Name"
              className="w-100"
              type="text"
              value={formik.values.secondName}
              onChange={formik.handleChange}
              error={
                formik.touched.secondName && Boolean(formik.errors.secondName)
              }
              helperText={formik.touched.secondName && formik.errors.secondName}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <ASTextField
              name="employerID"
              label="Employer ID"
              className="w-100"
              type="text"
              value={formik.values.employerId}
              onChange={formik.handleChange}
              error={
                formik.touched.employerId && Boolean(formik.errors.employerId)
              }
              helperText={formik.touched.employerId && formik.errors.employerId}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Select
              name="gender"
              label="Gender"
              placeholder="Gender"
              className="w-100"
              value={formik.values.gender}
              onChange={formik.handleChange}
              error={formik.touched.gender && Boolean(formik.errors.gender)}
            >
              <option value={""}></option>
              <option value={"Male"}>Male</option>
              <option value={"Female"}>Female</option>
              <option value={"Other"}>Other</option>
            </Select>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Select
              name="Department"
              label="Department"
              placeholder="Department"
              type="text"
              className="w-100"
              value={formik.values.department}
              onChange={formik.handleChange}
              error={
                formik.touched.department && Boolean(formik.errors.department)
              }
            >
              <option value={""}></option>
              {response?.data?.map((value: any, index: any) => (
                <option value={value._id} key={index}>
                  {value.name}
                </option>
              ))}
              {/* <option value={""}></option>
            <option value={"React JS"}>React JS</option>
            <option value={"React Native"}>React Native</option>
            <option value={"Angular JS"}>Angular JS</option> */}
            </Select>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Select
              name="status"
              label="Status"
              placeholder="Status"
              type="text"
              className="w-100"
              value={formik.values.status}
              onChange={formik.handleChange}
              error={formik.touched.status && Boolean(formik.errors.status)}
            >
              <option value={""}></option>
              <option value={"true"}>Active</option>
              <option value={"false"}>Inactive</option>
            </Select>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}

export default BasicDetailsForm;
