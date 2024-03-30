import {
  back_icon,
  ic_add_btn,
  ic_delete,
  ic_profile_edit,
  ic_profile_pic,
} from "@/assets/images";
import CustomImageComponent from "@/component/image/page";
import { STRINGS } from "@/strings";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Toaster from "../toaster/Toaster";
import {
  addNewUser,
  fileAttachments,
  getListview,
} from "@/redux/slices/attendanceSystem";
import { END_POINT } from "@/redux/serverEndPoints";
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FormikProps,
  useFormik,
  useFormikContext,
} from "formik";
import * as Yup from "yup";
import ASSelect from "@/molecules/ASSelect";
import { useDispatch, useSelector } from "react-redux";
import { convertImagePathToFile } from "@/utils/fileConversion";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import TableSkeleton from "../table/TableSkeleton";

// add new user form
type Props = {
  fieldValues: any;
};

function AddNewUserComponent({ fieldValues }: Props) {
  const router: any = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const state = router;
  // console.log(state, searchParams,pathname, "searchParams");

  // back button function
  const goBack = () => {
    router.back();
    setUserID(null);
  };

  // Elements references
  const profileImageInputRef = useRef<HTMLInputElement>(null);
  const multipleImageInputRef = useRef<HTMLInputElement>(null);
  const formikRef = useRef<FormikProps<any>>(null);

  // Manage states
  const [tittleText, setTittleText] = useState<any>(null);
  const [btnText, setBtnText] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null);
  const [muitipleFiles, setMuitipleFiles] = useState<File[]>([]);
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [profileFileName, setProfileFileName] = useState(null);
  const [trainingDataFiles, setTrainingDataFiles] = useState<string[]>([]);
  const [isErrorMessage, setIsErrorMessage] = useState(false);
  const [openToaster, setOpenToaster] = useState(false);
  const [tosterMessage, setTosterMessage] = useState("");
  const [userID, setUserID] = useState<string | null>(null);
  const dispatch: any = useDispatch();
  const [isLoginBtnClicked, setIsLoginBtnClicked] = useState(false);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [isMultipleImageSelected, setIsMultipleImageSelected] = useState(false);
  const [imgClicked, setImgClicked] = useState(false);
  const isLoading =  useSelector((state: any) => state.attendanceSystem?.isLoading);

  // Define initial form values
  const [initialValues, setInitialValues] = useState({
    dealerName: "",
    email: "",
    address: "",
    phoneNumber: "",
    contactPerson: "",
    status: "",
    profileImage: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  // Department list response
  const departmentListRes: any = useSelector(
    (state: any) => state?.attendanceSystem?.departmentList
  );
  // Add user response
  const addUserResponse: any = useSelector(
    (state: any) => state?.attendanceSystem?.addUserRes
  );
  // Profile image attachment response
  const fileAttachmentResponse: any = useSelector(
    (state: any) => state?.attendanceSystem?.fileAttachmentRes
  );
  // Multiple  images and videos  attachment response
  const muiltipleFileAttachmentResponse: any = useSelector(
    (state: any) => state?.attendanceSystem?.multipleFileAttachmentRes
  );
  // User details response
  const userDetails: any = useSelector(
    (state: any) => state?.attendanceSystem?.getUserDetailsRes
  );
  // useEffects for get page tittle and button text
  useEffect(() => {
    setTittleText(searchParams.get("tittle"));
    setBtnText(searchParams.get("btnText"));
    setUserID(searchParams.get("ID"));
    setTrainingDataFiles([]);
    setProfileImg(null);
    setMuitipleFiles([]);
    setFile(null);
  }, []);

   // set images from user details api
   useEffect(() => {
    if (fieldValues) {
      setProfileImg(
        fieldValues[0]?.imagePath
          ? fieldValues[0]?.imagePath
          : ""
      );
      setInitialValues({
        dealerName: fieldValues[0].username,
        email: fieldValues[0].email,
        address: fieldValues[0].address,
        phoneNumber: fieldValues[0].phoneNumber,
        contactPerson: fieldValues[0].contactPerson,
        status: fieldValues[0].status,
        profileImage: fieldValues[0].imagePath,
        password: fieldValues[0].password,
        confirmPassword: fieldValues[0].password,
        role: fieldValues[0].role === 1 ? "dealer" : "salesPerson",
      });
    }
  }, [fieldValues]);
  
  // Profile image change handler
  const handleProfileImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setImgClicked(true);
    const file = event.target.files && event.target.files[0];
    setFile(file);
  };

  // file upload api call
  useEffect(() => {
    if (file) {
      const formData = new FormData();
      formData.append("files", file);
      dispatch(
        fileAttachments(END_POINT.fileAttachments, formData, "uploadImage")
      );
    }
  }, [file]);

  // Multiple files upload api call
  useEffect(() => {
    if (muitipleFiles) {
      const formData: any = new FormData();
      muitipleFiles?.forEach((fileData: any) => {
        formData.append("files", fileData);
      });
      dispatch(
        fileAttachments(
          END_POINT.fileAttachments,
          formData,
          "uploadMuiltipleFiles"
        )
      );
    }
  }, [muitipleFiles]);

  // Muiliple image button handler
  const handleMuiltipleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setMuitipleFiles(newFiles);
    }
  };
  // Delete uploaded training files
  const handleDelete = (index: number) => {
    // setMuitipleFiles((prevFiles) => {
    //   const newFiles = [...prevFiles];
    //   newFiles.splice(index, 1);
    //   return newFiles;
    // });
    // if (userDetails?.data?.files?.length > 0) {
    setTrainingDataFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles.splice(index, 1);
      return newFiles;
    });
    // }
  };

  //  Trigger click profile upload input type file
  const handleClick = () => {
    setIsImageSelected(true);
    if (profileImageInputRef.current) {
      profileImageInputRef.current.click();
    }
  };

  //  Trigger click training files upload input type file
  const muiltipleUploadIcon = () => {
    setIsMultipleImageSelected(true);
    if (multipleImageInputRef.current) {
      multipleImageInputRef.current.click();
    }
  };

  // api call for department list and user details
  useEffect(() => {
    dispatch(getListview(END_POINT.departmentListView, "departmentList"));
  }, []);

  // api call for user details
  useEffect(() => {
    if (userID) {
      dispatch(getListview(END_POINT.getUserDetails + userID, "userDetails"));
    }
  }, [userID]);

  // Define Yup validation schema
  const validationSchema = Yup.object({
    dealerName: Yup.string().required("First name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    address: Yup.string().required("Address is required"),
    phoneNumber: Yup.string()
      .matches(
        /^[0-9]{10}$/,
        "Phone number must be exactly 10 digits and contain only numbers"
      )
      .required("Phone number is required"),
    contactPerson: Yup.string().required("Contact person is required"),
    status: Yup.string().required("Status is required"),
    role: Yup.string().required("Role is required"),
    password: Yup.string()
      .required("Required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Must contain at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special symbol"
      ),
    confirmPassword: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("password"), ""], "Passwords must match")
      .nullable(),
  });

  const handleSubmit = (values: any) => {
    try {
      // Handle form submission
      let body = fieldValues ? {id: fieldValues[0].id} : {}
      const requestBody = {
        ...body,
        dealerName: values.dealerName,
        email: values.email,
        address: values.address,
        phoneNumber: values.phoneNumber,
        contactPerson: values.contactPerson,
        imageUrl: profileImg,
        password: values.password,
        role: values.role === "dealer" ? 1 : 2,
        isActive: values.status === "Active" ? 1 : 2,
      };
      dispatch(addNewUser(END_POINT.addUser, requestBody));
      setIsLoginBtnClicked(true);
    } catch (error) {
      console.log(error, "inside error");
    }
  };
  //Set show response message from Add user response
  useEffect(() => {
    if (addUserResponse?.data?.success === true && isLoginBtnClicked) {
      setIsErrorMessage(false);
      setOpenToaster(true);
      setTosterMessage(addUserResponse?.data?.message);
      if (!userID) {
        formikRef.current?.resetForm();
        setTrainingDataFiles([]);
        setProfileImg(null);
      }
      setTimeout(() => {
        router.push("/userManagement");
      }, 2000);
      setIsLoginBtnClicked(false);
    } else if (
      addUserResponse?.response?.data?.success === false &&
      isLoginBtnClicked
    ) {
      setIsErrorMessage(true);
      setOpenToaster(true);
      setTosterMessage(addUserResponse?.response?.data?.message);
      setIsLoginBtnClicked(false);
    }
  }, [addUserResponse]);

  // Set Profile image file name and path
  useEffect(() => {
    if (fileAttachmentResponse?.data?.success && imgClicked) {
      setProfileFileName(fileAttachmentResponse?.data?.files?.[0].fileName);
      setProfileImg(
        END_POINT.imageBaseUrl +
          fileAttachmentResponse?.data?.files?.[0].fileName
      );
      setIsImageSelected(false);
    }
  }, [fileAttachmentResponse]);

  // Set training files from api response
  // useEffect(() => {
  //   if (isMultipleImageSelected) {
  //     const data = trainingDataFiles?.concat(
  //       muiltipleFileAttachmentResponse?.data?.files
  //     );
  //     setTrainingDataFiles([...data]);
  //     setIsMultipleImageSelected(false);
  //   }
  // }, [muiltipleFileAttachmentResponse]);

 

  console.log(fieldValues, "fieldValues");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleTogglePassword = (type: string) => {
    if (type === "password")
      setShowPassword((prevShowPassword: any) => !prevShowPassword);
    else setShowConfirmPassword((prevShowPassword: any) => !prevShowPassword);
  };

  const handlePaste = (event: any) => {
    event.preventDefault(); // Prevents the default paste behavior
  };

  return (
    <Grid className="page-content-wrapper">
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        innerRef={formikRef}
      >
        <Form className="form-validation">
          <Grid sx={{ margin: "20px 0px " }}>
            <Grid
              container
              spacing={3}
              sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <Grid item xs={12} sm={6} sx={{ display: "flex" }}>
                <Button className="back-btn" onClick={goBack}>
                  <CustomImageComponent
                    src={back_icon.src}
                    width={44}
                    height={44}
                    alt={STRINGS.ALT_PROFILE}
                    style={null}
                  />
                </Button>
                <Typography
                  variant="h2"
                  className="fs-26 fw-600 primary-font-color"
                  sx={{ marginLeft: "10px", mt: 0.8 }}
                >
                  {/* {tittleText} */}
                 {fieldValues ? "Edit User" : "Create New User"} 
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4} md={3} lg={2}>
                <Button
                  type="submit"
                  variant="text"
                  className="btn primary-bg text-white fs-16 fw-600"
                  sx={{ marginRight: 1 }}

                  // onClick={() => routerUtils(routerStrings.addNewUser, router)}
                >
                  {fieldValues ? "Edit User" : "Create New User"} 
                </Button>
                {/* <FilterDrawer /> */}
                <Toaster
                  toasterMessage={tosterMessage}
                  open={openToaster}
                  setOpen={() => setOpenToaster(false)}
                  error={isErrorMessage}
                />
              </Grid>
            </Grid>
            <Grid
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // mt: 2.5,
              }}
            >
              <Grid container sx={{ maxWidth: 1200, pl: 3, pr: 3 }}>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  sx={{ flexDirection: "column", mt: 2.5 }}
                >
                  <Typography
                    className="add-user-section-heading-text"
                    sx={{ marginBottom: "20px" }}
                  >
                    {STRINGS.PROFILE_PIC}
                  </Typography>
                  <Grid sx={{ width: "130px", position: "relative" }}>
                    {isLoading ? 
                    <TableSkeleton /> :
                    <img
                      src={profileImg || ic_profile_pic.src}
                      width={130}
                      height={130}
                      alt={STRINGS.ALT_PROFILE}
                      style={{
                        borderRadius: "100%",
                        objectFit: "cover",
                      }}
                    />
}
                    <Button
                      type="button"
                      sx={{
                        position: "absolute",
                        right: "0px",
                        bottom: "10px",
                        zIndex: "99",
                        p: 0,
                        minWidth: "auto",
                      }}
                      onClick={handleClick}
                    >
                      <CustomImageComponent
                        src={ic_profile_edit.src}
                        width={36}
                        height={36}
                        alt={STRINGS.ALT_PROFILE}
                        style={null}
                      />

                      <input
                        type="file"
                        name="profileImage"
                        ref={profileImageInputRef}
                        accept=".jpeg, .jpg, .png, .gif"
                        style={{ display: "none" }}
                        onChange={handleProfileImageChange}
                      />
                    </Button>
                  </Grid>
                </Grid>
                {/* <Grid item xs={12} sm={12} md={6} sx={{ mt: 2.5 }}>
                  <Typography
                    className="add-user-section-heading-text"
                    sx={{ marginBottom: "20px" }}
                  >
                    {STRINGS.TRAINING_IMAGES}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      gap: "10px",
                    }}
                  >
                    <input
                      type="file"
                      name="trainingImages"
                      ref={multipleImageInputRef}
                      accept=".jpeg, .jpg, .png, .gif,.mp4,.avi,.mkv"
                      style={{ display: "none" }}
                      onChange={handleMuiltipleImageChange}
                    />
                    {trainingDataFiles?.map(
                      (data: any, indexes: any) =>
                        data !== undefined && (
                          <Box
                            className="training-image-wrapper"
                            key={indexes}
                            sx={{
                              height: 60,
                              width: 60,
                              display: "flex",
                              flexDirection: "row",
                              position: "relative",
                              justifyContent: "center",
                            }}
                          >
                            {data?.fileName?.endsWith(".JPEG") ||
                            data?.fileName?.endsWith(".jpeg") ||
                            data?.fileName?.endsWith(".png") ||
                            data?.fileName?.endsWith(".JPG") ||
                            data?.fileName?.endsWith(".jpg") ||
                            data?.fileName?.endsWith(".gif") ? (
                              <img
                                alt={`Preview ${indexes}`}
                                src={END_POINT.imageBaseUrl + data?.fileName}
                                style={{
                                  height: "100%",
                                  width: "100%",
                                  borderRadius: "16px",
                                  objectFit: "cover",
                                  cursor: "pointer",
                                }}
                              />
                            ) : data?.fileName?.endsWith(".avi") ||
                              data?.fileName?.endsWith(".mp4") ||
                              data?.fileName?.endsWith(".mkv") ? (
                              <video
                                controls
                                style={{
                                  height: "61px",
                                  width: "61px",
                                  borderRadius: "16px",
                                  cursor: "pointer",
                                }}
                              >
                                <source
                                  src={END_POINT.imageBaseUrl + data?.fileName}
                                ></source>
                              </video>
                            ) : (
                              ""
                            )}

                            <Button
                              onClick={() => handleDelete(indexes)}
                              style={{
                                position: "absolute",
                                bottom: 0,
                                cursor: "pointer",
                                width: "28px",
                                height: "28px",
                                display: "none",
                              }}
                              className="delete-btn"
                            >
                              <CustomImageComponent
                                src={ic_delete.src}
                                width={28}
                                height={28}
                                alt={STRINGS.ALT_PROFILE}
                                style={null}
                              />
                            </Button>
                          </Box>
                        )
                    )}
                    <img
                      onClick={() => muiltipleUploadIcon()}
                      src={ic_add_btn.src}
                      style={{
                        height: "61px",
                        width: "61px",
                        borderRadius: "16px",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                    />
                  </Box>
                </Grid> */}
                {/* <BasicDetailsForm onFormDataChange={handleAddUserForm} /> */}
                <Grid>
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
                      <Field
                        name="dealerName"
                        label="Dealer Name"
                        className="w-100"
                        as={TextField}
                        type="text"
                        helperText={<ErrorMessage name="dealerName" />}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Field
                        name="address"
                        label="Address"
                        className="w-100"
                        type="text"
                        as={TextField}
                        helperText={<ErrorMessage name="address" />}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Field
                        name="email"
                        label="Email"
                        className="w-100"
                        type="text"
                        as={TextField}
                        helperText={<ErrorMessage name="email" />}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={6}>
                      <Field
                        name="phoneNumber"
                        label="Phone Number"
                        placeholder="Gender"
                        className="w-100"
                        as={TextField}
                        helperText={<ErrorMessage name="phoneNumber" />}
                      ></Field>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Field
                        name="password"
                        label="Password"
                        className="w-100"
                        type={showPassword ? "text" : "password"}
                        as={TextField}
                        helperText={<ErrorMessage name="password" />}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => handleTogglePassword("password")}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Field
                        name="confirmPassword"
                        label="Confirm Password"
                        className="w-100"
                        type={showConfirmPassword ? "text" : "password"}
                        onPaste={handlePaste} // Prevent paste action
                        as={TextField}
                        helperText={<ErrorMessage name="confirmPassword" />}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() =>
                                  handleTogglePassword("confirmPassword")
                                }
                                edge="end"
                              >
                                {showConfirmPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Field
                        name="contactPerson"
                        label="Contact Person"
                        className="w-100"
                        type="text"
                        as={TextField}
                        helperText={<ErrorMessage name="contactPerson" />}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Field
                        name="role"
                        label="Role"
                        placeholder="Status"
                        className="w-100"
                        as={ASSelect}
                        helperText={<ErrorMessage name="role" />}
                      >
                        <option value={""}></option>
                        <option value={"dealer"}>Dealer</option>
                        <option value={"salesPerson"}>Sales Person</option>
                      </Field>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Field
                        name="status"
                        label="Status"
                        placeholder="Status"
                        className="w-100"
                        as={ASSelect}
                        helperText={<ErrorMessage name="status" />}
                      >
                        <option value={""}></option>
                        <option value={"Active"}>Active</option>
                        <option value={"Inactive"}>Inactive</option>
                      </Field>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </Grid>
  );
}

export default AddNewUserComponent;
