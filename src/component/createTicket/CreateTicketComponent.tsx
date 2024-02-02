import {
  back_icon,
  ic_profile_edit,
} from "@/assets/images";
import CustomImageComponent from "@/component/image/page";
import { STRINGS } from "@/strings";
import {
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Toaster from "../toaster/Toaster";
import {
  addNewTicket,
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
  useFormikContext,
} from "formik";
import * as Yup from "yup";
import ASSelect from "@/molecules/ASSelect";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import moment from "moment";
import ic_pdf from "../../assets/images/ic_pdf.png"
// add new user form
function CreateTicketComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const ticketDetails = useSelector(
    (state: any) => state?.attendanceSystem?.ticketListview?.ticketList
  );

  // back button function
  const goBack = () => {
    router.back();
    setUserID(null);
  };

  // Elements references
  const sectorImageInputRef = useRef<HTMLInputElement>(null);
  const passportImageInputRef = useRef<HTMLInputElement>(null);
  const flightTicketImageInputRef = useRef<HTMLInputElement>(null);
  const formikRef = useRef<FormikProps<any>>(null);

  // Manage states
  const [tittleText, setTittleText] = useState<any>(null);
  const [btnText, setBtnText] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null);
  const [muitipleFiles, setMuitipleFiles] = useState<File[]>([]);
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [flightTicket, setFlightTicket] = useState<string | null>(null);
  const [profileFileName, setProfileFileName] = useState(null);
  const [trainingDataFiles, setTrainingDataFiles] = useState<string[]>([]);
  const [isErrorMessage, setIsErrorMessage] = useState(false);
  const [openToaster, setOpenToaster] = useState(false);
  const [tosterMessage, setTosterMessage] = useState("");
  const [userID, setUserID] = useState<string | null>(null);
  const dispatch: any = useDispatch();
  const [isLoginBtnClicked, setIsLoginBtnClicked] = useState(false);
  const [IsSectorImageSelected, setIsSectorImageSelected] = useState(false);
  const [isPassportImageSelected, setIsPassportImageSelected] = useState(false);
  const [PassengersCount, setPassengersCount] = useState<any>(["1", "2"]);
  const [passportImg, setPassportImg] = useState("");
  const [passportFileName, setPassportFileName] = useState(false);
  const [passportImageIndex, setPassportImageIndex] = useState<any>(null);
  const [isFlightImageSelected, setIsFlightImageSelected] = useState(false);
  const [ticketStatus, setTicketStatus] = useState(1);

  const {
    watch,
    formState: { errors },
  } = useForm();

  // Define initial form values
  const [initialValues, setInitialValues] = useState({
    email: "",
    phoneNumber: "",
    departure: "",
    arrival: "",
    itineraryTypes: "",
    travelClass: "",
    ticketStatus: "",
    amount: "",
    Passengers: [
      {
        travellerType: "",
        givenName: "",
        passportNumber: "",
        lastName: "",
        expiryDate: "",
        dateOfBirth: "",
        issuingDate: "",
        nationality: "",
        passportImagePath: "",
      },
    ],
  });
  const [dealerId, setDealerId] = useState("");
  // Add user response
  const addUserResponse: any = useSelector(
    (state: any) => state?.attendanceSystem?.addUserRes
  );
  // Profile image attachment response
  const fileAttachmentResponse: any = useSelector(
    (state: any) => state?.attendanceSystem?.fileAttachmentRes
  );

  const loggedUserId: any =  typeof localStorage !== 'undefined' && localStorage.getItem("userID");
  const userRole: any = typeof localStorage !== 'undefined' && localStorage.getItem("role");

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

  useEffect(() => {
    if (userId) {
      const filteredElement: any = ticketDetails?.filter(
        (item: any) => item.id === parseInt(userId)
      );
      filteredElement?.map((data: any) => {
        setInitialValues(data);
        setProfileImg(data.sectorImagePath);
        setDealerId(data.dealerId);
        setFlightTicket(data.ticketImageUrl);
        setTicketStatus(data.ticketStatus)
      });
    }

    console.log(ticketDetails, "initailVal");
  }, [userId]);

  // Profile image change handler
  const handleSectorImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsSectorImageSelected(true);
    const file = event.target.files && event.target.files[0];
    setFile(file);
  };

  const handlePassportImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsPassportImageSelected(true);
    const file = event.target.files && event.target.files[0];
    setFile(file);
  };

  const handleTicketImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsFlightImageSelected(true);
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

  //  Trigger click profile upload input type file
  const handleClick = (type: string, index?: number) => {
    console.log(index, "inside indexes");
    if (type === "sector") {
      setIsSectorImageSelected(true);
      if (sectorImageInputRef.current) {
        sectorImageInputRef.current.click();
      }
    } 
    else if (type === "flightTicket") {
      setIsFlightImageSelected(true);
      if (flightTicketImageInputRef.current) {
        flightTicketImageInputRef.current.click();
      }
    }
    else {
      setPassportImageIndex(index);
      setIsPassportImageSelected(true);
      // if (passportImageInputRef.current) {
      //   passportImageInputRef.current.click();
      // }
      // Trigger the file input programmatically for a specific index
      const fileInput = document.getElementById(`passportUpload_${index}`);
      if (fileInput) {
        fileInput.click();
      }
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
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phoneNumber: Yup.string()
      .matches(
        /^[0-9]{10}$/,
        "Phone number must be exactly 10 digits and contain only numbers"
      )
      .required("Phone number is required"),
    departure: Yup.string().required("Departure is required"),
    arrival: Yup.string().required("Arrival is required"),
    travelClass: Yup.string().required("Travel class is required"),
    itineraryTypes: Yup.string().required("Itinerary type is required"),
    Passengers: Yup.array().of(
      Yup.object().shape({
        travellerType: Yup.string().required("Traveller type is required"),
        givenName: Yup.string().required("Given name is required"),
        lastName: Yup.string().required("Last name is required"),
        passportNumber: Yup.string().required("Passport number is required"),
        nationality: Yup.string().required("Nationality is required"),
        ticketStatus: Yup.string().notRequired(),
        amount: Yup.string().notRequired(),
        dateOfBirth: Yup.string()
          .required("Expiry date is required")
          .test("valid-date", "Invalid date format", (value) =>
            value ? moment(value, "YYYY-MM-DD", true).isValid() : true
          ),
        expiryDate: Yup.string()
          .required("Expiry date is required")
          .test("valid-date", "Invalid date format", (value) =>
            value ? moment(value, "YYYY-MM-DD", true).isValid() : true
          ),
        issuingDate: Yup.string()
          .required("Expiry date is required")
          .test("valid-date", "Invalid date format", (value) =>
            value ? moment(value, "YYYY-MM-DD", true).isValid() : true
          ),
      })
    ),
  });

  const handleSubmit = (values: any) => {
    console.log(values, "insoide submit");

    try {
      // Handle form submission
      dispatch(
        addNewTicket(END_POINT.addNewTicket, {
          ...values,
          sectorImagePath: profileImg,
          ticketStatus,
          ticketImageUrl: flightTicket
        })
      );
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
        router.push("/dashboard");
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
    if (fileAttachmentResponse?.data?.success && IsSectorImageSelected) {
      setProfileFileName(fileAttachmentResponse?.data?.files?.[0].fileName);
      setProfileImg(
        END_POINT.imageBaseUrl +
          fileAttachmentResponse?.data?.files?.[0].fileName
      );
      setIsSectorImageSelected(false);
    } else if (
      fileAttachmentResponse?.data?.success &&
      isPassportImageSelected
    ) {
      setInitialValues((prevValues) => {
        const newValues = JSON.parse(
          JSON.stringify(formikRef?.current?.values)
        );
        const updatedPassengers = [...newValues.Passengers]; // Create a copy of the Passengers array
        updatedPassengers[passportImageIndex] = {
          ...updatedPassengers[passportImageIndex],
          ["passportImagePath"]:
            END_POINT.imageBaseUrl +
            fileAttachmentResponse?.data?.files?.[0].fileName,
        };

        return {
          ...newValues,
          Passengers: updatedPassengers, // Update the Passengers array in the state
        };
      });

      setPassportFileName(fileAttachmentResponse?.data?.files?.[0].fileName);
      setPassportImg(
        END_POINT.imageBaseUrl +
          fileAttachmentResponse?.data?.files?.[0].fileName
      );
      setIsPassportImageSelected(false);
    }
    if (fileAttachmentResponse?.data?.success && isFlightImageSelected) {
      // setProfileFileName(fileAttachmentResponse?.data?.files?.[0].fileName);
      setFlightTicket(
        END_POINT.imageBaseUrl +
          fileAttachmentResponse?.data?.files?.[0].fileName
      );
      setIsFlightImageSelected(false);
    }
  }, [fileAttachmentResponse]);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formikContext = useFormikContext();

  const addNewPassenger = async () => {
    const passengerIndex = initialValues.Passengers?.length - 1;
    const result = await validateToAddNewPassenger(passengerIndex);
    if (result) {
      setInitialValues((prevValues) => {
        // Make a deep copy of the previous values
        const newValues = JSON.parse(
          JSON.stringify(formikRef?.current?.values)
        );

        // Make a copy of the Passengers array
        const newPassengers = [...newValues.Passengers];

        // Add a new empty passenger object to the array
        newPassengers.push({
          givenName: "",
          passportNumber: "",
          lastName: "",
          expiryDate: "",
          issuingDate: "",
          nationality: "",
          dateOfBirth: "",
          travellerType: "",
          passportImagePath: "",
        });

        // Update the initialValues object with the new Passengers array
        newValues.Passengers = newPassengers;

        return newValues;
      });
    }
  };

  const validateToAddNewPassenger = (index: number) => {
    const {
      phoneNumber,
      email,
      Passengers,
      departure,
      arrival,
      travelClass,
      itineraryTypes,
    } = formikRef.current?.values;
    if (
      phoneNumber &&
      email &&
      departure &&
      arrival &&
      travelClass &&
      itineraryTypes &&
      Passengers[index].givenName &&
      Passengers[index].passportNumber &&
      Passengers[index].lastName &&
      Passengers[index].nationality &&
      Passengers[index].travellerType &&
      Passengers[index].passportImagePath
    )
      return true;
  };

  const removePassenger = (indexToRemove: number) => {
    setInitialValues((prevValues) => {
      const newValues = JSON.parse(JSON.stringify(formikRef?.current?.values));
      const updatedPassengers = prevValues.Passengers.filter(
        (item: any, index: number) => index !== indexToRemove
      );
      return { ...prevValues, Passengers: updatedPassengers };
    });
  };

  console.log(formikRef.current?.values.ticketStatus, initialValues, "formikRef?.current?.values.ticketStatus");
  

  return (
    <Grid className="page-content-wrapper">
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        // onSubmit={async (values) => {
        //   handleSubmit(values);
        // }}
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
                  Create New Ticket
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4} md={3} lg={2}>
                <Button
                  type="submit"
                  variant="text"
                  className="btn primary-bg text-white fs-16 fw-600"
                  sx={{ marginRight: 1 }}
                  // disabled={
                  //   userId && parseInt(dealerId) === parseInt(loggedUserId)
                  //     ? false
                  //     : !userId || parseInt(loggedUserId) === 0 || parseInt(loggedUserId) === 2
                  //     ? false
                  //     : true
                  // }

                  // onClick={() => routerUtils(routerStrings.addNewUser, router)}
                >
                  {"Submit"}
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
                <Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography
                        className="add-user-section-heading-text"
                        sx={{ mt: 4 }}
                      >
                        {"Basic Details"}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Field
                        name="departure"
                        label="Departure"
                        className="w-100"
                        type="text"
                        as={TextField}
                        helperText={<ErrorMessage name="departure" />}
                        disabled={
                          userId &&
                          parseInt(dealerId) === parseInt(loggedUserId)
                            ? false
                            : !userId
                            ? false
                            : true
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Field
                        name="arrival"
                        label="Arrival"
                        className="w-100"
                        type="text"
                        as={TextField}
                        helperText={<ErrorMessage name="arrival" />}
                        disabled={
                          userId &&
                          parseInt(dealerId) === parseInt(loggedUserId)
                            ? false
                            : !userId
                            ? false
                            : true
                        }
                      ></Field>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Field
                        name="phoneNumber"
                        label="Phone Number"
                        placeholder="Gender"
                        className="w-100"
                        as={TextField}
                        helperText={<ErrorMessage name="phoneNumber" />}
                        disabled={
                          userId &&
                          parseInt(dealerId) === parseInt(loggedUserId)
                            ? false
                            : !userId
                            ? false
                            : true
                        }
                      ></Field>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Field
                        name="email"
                        label="Email"
                        className="w-100"
                        type={"text"}
                        as={TextField}
                        helperText={<ErrorMessage name="email" />}
                        disabled={
                          userId &&
                          parseInt(dealerId) === parseInt(loggedUserId)
                            ? false
                            : !userId
                            ? false
                            : true
                        }
                      />
                    </Grid>
                    {/* <Grid item xs={12} sm={12} md={8}>
                      <Field
                        name="address"
                        label="Address"
                        className="w-100"
                        type={"text"}
                        as={TextField}
                        helperText={<ErrorMessage name="address" />}
                      />
                    </Grid> */}

                    <Grid item xs={12} sm={12} md={4}>
                      <Field
                        name="travelClass"
                        label="Travel Class"
                        placeholder="Travel Class"
                        className="w-100"
                        as={ASSelect}
                        helperText={<ErrorMessage name="travelClass" />}
                        disabled={
                          userId &&
                          parseInt(dealerId) === parseInt(loggedUserId)
                            ? false
                            : !userId
                            ? false
                            : true
                        }
                      >
                        <option value={""}></option>
                        <option value={0}>Economy</option>
                        <option value={1}>Business</option>
                      </Field>
                    </Grid>

                    <Grid item xs={12} sm={12} md={4}>
                      <Field
                        name="itineraryTypes"
                        label="Itinerary Types"
                        placeholder="Itinerary Types"
                        className="w-100"
                        as={ASSelect}
                        helperText={<ErrorMessage name="itineraryTypes" />}
                        disabled={
                          userId &&
                          parseInt(dealerId) === parseInt(loggedUserId)
                            ? false
                            : !userId
                            ? false
                            : true
                        }
                      >
                        <option value={""}></option>
                        <option value={"One Way"}>One Way</option>
                        <option value={"Round Trip"}>Round Trip</option>
                        <option value={"Multi City"}>Multi City</option>
                      </Field>
                    </Grid>
                    {userRole === "0" && userId && (
                      <>
                      <Grid item xs={12} sm={12} md={4}>
                        <Select
                          // name="TicketStatus"
                          label="Ticket Status"
                          placeholder="Ticket Status"
                          className="w-100"
                          value={ticketStatus}
                          onChange={(event: any) => setTicketStatus(event.target.value)}
                          // as={ASSelect}
                          // helperText={<ErrorMessage name="TicketStatus" />}
                          // disabled={userId && parseInt(dealerId) === parseInt(loggedUserId) ? false : !userId ? false : true}
                        >
                          <MenuItem value={1}>Started</MenuItem>
                          <MenuItem value={2}>In Progress</MenuItem>
                          <MenuItem value={3}>Completed</MenuItem>
                          <MenuItem value={0}>Failed</MenuItem>
                        </Select>
                      </Grid>
                      {ticketStatus === 3 &&
                      <>
                      <Grid item xs={12} sm={12} md={4}>
                      <Field
                        name={"amount"}
                        label="Amount"
                        className="w-100"
                        type={"text"}
                        // onPaste={handlePaste} // Prevent paste action
                        as={TextField}
                        helperText={
                          <ErrorMessage
                            name={"amount"}
                          />
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography className="add-user-section-heading-text">
                        {"Flight Ticket Upload"}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      {!flightTicket ? (
                        <Grid
                          sx={{
                            border: "2px dotted #4bb58c",
                            borderRadius: 10,
                            height: 100,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            cursor: "pointer",
                          }}
                          onClick={() => handleClick("flightTicket")}
                        >
                          <Typography sx={{ color: "#4bb58c" }}>
                            {"Please upload ticket"}
                          </Typography>
                          <input
                            type="file"
                            name="flightTicket"
                            ref={flightTicketImageInputRef}
                            accept=".pdf"
                            style={{ display: "none" }}
                            onChange={handleTicketImageChange}
                          />
                        </Grid>
                      ) : (
                        // <img
                        //   src={profileImg}
                        //   width={200}
                        //   height={200}
                        //   alt={STRINGS.ALT_PROFILE}
                        //   style={{
                        //     borderRadius: "100%",
                        //     objectFit: "cover",
                        //   }}
                        // />
                        <Grid sx={{ width: "160px", position: "relative" }}>
                          <img
                            src={ic_pdf.src}
                            width={200}
                            height={200}
                            alt={STRINGS.ALT_PROFILE}
                            style={{
                              borderRadius: "100%",
                              objectFit: "cover",
                            }}
                          />
                          <Button
                            type="button"
                            sx={{
                              position: "absolute",
                              left: "150px",
                              bottom: "20px",
                              zIndex: "99",
                              p: 0,
                              minWidth: "auto",
                            }}
                            onClick={() => handleClick("flightTicket")}
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
                              name="flightTicket"
                              ref={flightTicketImageInputRef}
                              accept=".pdf"
                              style={{ display: "none" }}
                              onChange={handleTicketImageChange}
                            />
                          </Button>
                        </Grid>
                      )}
                    </Grid>
                    </>
                    }
                    </>
                    )}
                    <Grid item xs={12}>
                      <Typography className="add-user-section-heading-text">
                        {"Sector Upload"}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      {!profileImg ? (
                        <Grid
                          sx={{
                            border: "2px dotted #4bb58c",
                            borderRadius: 10,
                            height: 100,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            cursor: "pointer",
                          }}
                          onClick={() => handleClick("sector")}
                        >
                          <Typography sx={{ color: "#4bb58c" }}>
                            {"Please upload sector"}
                          </Typography>
                          <input
                            type="file"
                            name="profileImage"
                            ref={sectorImageInputRef}
                            accept=".jpeg, .jpg, .png, .gif"
                            style={{ display: "none" }}
                            onChange={handleSectorImageChange}
                            disabled={
                              userId &&
                              parseInt(dealerId) === parseInt(loggedUserId)
                                ? false
                                : !userId
                                ? false
                                : true
                            }
                          />
                        </Grid>
                      ) : (
                        // <img
                        //   src={profileImg}
                        //   width={200}
                        //   height={200}
                        //   alt={STRINGS.ALT_PROFILE}
                        //   style={{
                        //     borderRadius: "100%",
                        //     objectFit: "cover",
                        //   }}
                        // />
                        <Grid sx={{ width: "130px", position: "relative" }}>
                          <img
                            src={profileImg}
                            width={200}
                            height={200}
                            alt={STRINGS.ALT_PROFILE}
                            style={{
                              borderRadius: "100%",
                              objectFit: "cover",
                            }}
                          />
                          <Button
                            type="button"
                            sx={{
                              position: "absolute",
                              left: "150px",
                              bottom: "20px",
                              zIndex: "99",
                              p: 0,
                              minWidth: "auto",
                            }}
                            onClick={() => handleClick("sector")}
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
                              ref={sectorImageInputRef}
                              accept=".jpeg, .jpg, .png, .gif"
                              style={{ display: "none" }}
                              onChange={handleSectorImageChange}
                              disabled={
                                userId &&
                                parseInt(dealerId) === parseInt(loggedUserId)
                                  ? false
                                  : !userId
                                  ? false
                                  : true
                              }
                            />
                          </Button>
                        </Grid>
                      )}
                    </Grid>
                    <Grid
                      sx={{ display: "flex", justifyContent: "space-between" }}
                      item
                      xs={12}
                    >
                      <Typography
                        className="add-user-section-heading-text"
                        // sx={{ mt: 4 }}
                      >
                        {"Passenger Details"}
                      </Typography>
                      <Typography
                        // className="add-user-section-heading-text"
                        sx={{
                          backgroundColor: "#4BB58C",
                          color: "#FFFFFF",
                          padding: 0.8,
                          cursor: "pointer",
                          borderRadius: 4,
                        }}
                        onClick={() => addNewPassenger()}
                      >
                        {"+ Add new passenger"}
                      </Typography>
                    </Grid>
                    {initialValues?.Passengers?.map(
                      (data: any, index: number) => (
                        <>
                          <Grid
                            item
                            xs={12}
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography
                              className="add-user-section-heading-text"
                              // sx={{ mt: 4 }}
                            >
                              {"Passenger"} {index + 1}
                            </Typography>
                            {index !== 0 && (
                              <Typography
                                // className="add-user-section-heading-text"
                                // sx={{ mt: 4 }}
                                sx={{
                                  backgroundColor: "red !important",
                                  color: "#FFFFFF",
                                  padding: 0.8,
                                  cursor: "pointer",
                                  borderRadius: 4,
                                }}
                                onClick={() => removePassenger(index)}
                              >
                                {"- Remove passenger"}
                              </Typography>
                            )}
                          </Grid>
                          {/* <Grid item xs={12}>
                            <Typography className="add-user-section-heading-text">
                              {"Passport Upload"}
                            </Typography>
                          </Grid> */}
                          <Grid item xs={12} sm={12} md={12}>
                            {!data.passportImagePath ? (
                              <Grid
                                sx={{
                                  border: "2px dotted #4bb58c",
                                  borderRadius: 10,
                                  height: 100,
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  cursor: "pointer",
                                }}
                                onClick={() => handleClick("passport", index)}
                              >
                                <Typography sx={{ color: "#4bb58c" }}>
                                  {"Please upload passport"}
                                </Typography>
                                <input
                                  type="file"
                                  name={"passportUpload_" + index.toString()}
                                  id={"passportUpload_" + index.toString()}
                                  // ref={passportImageInputRef}
                                  accept=".jpeg, .jpg, .png, .gif"
                                  style={{ display: "none" }}
                                  onChange={handlePassportImageChange}
                                  disabled={
                                    userId &&
                                    parseInt(dealerId) ===
                                      parseInt(loggedUserId)
                                      ? false
                                      : !userId
                                      ? false
                                      : true
                                  }
                                />
                              </Grid>
                            ) : (
                              // <img
                              //   src={data.passportImagePath}
                              //   width={200}
                              //   height={200}
                              //   alt={STRINGS.ALT_PROFILE}
                              //   style={{
                              //     borderRadius: "100%",
                              //     objectFit: "cover",
                              //   }}
                              // />
                              <Grid
                                sx={{ width: "130px", position: "relative" }}
                              >
                                <img
                                  src={data.passportImagePath}
                                  width={200}
                                  height={200}
                                  alt={STRINGS.ALT_PROFILE}
                                  style={{
                                    borderRadius: "100%",
                                    objectFit: "cover",
                                  }}
                                />
                                <Button
                                  type="button"
                                  sx={{
                                    position: "absolute",
                                    left: "150px",
                                    bottom: "20px",
                                    zIndex: "99",
                                    p: 0,
                                    minWidth: "auto",
                                  }}
                                  onClick={() => handleClick("passport", index)}
                                  disabled={
                                    userId &&
                                    parseInt(dealerId) ===
                                      parseInt(loggedUserId)
                                      ? false
                                      : !userId
                                      ? false
                                      : true
                                  }
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
                                    name={"passportUpload_" + index.toString()}
                                    id={"passportUpload_" + index.toString()}
                                    // ref={passportImageInputRef}
                                    accept=".jpeg, .jpg, .png, .gif"
                                    style={{ display: "none" }}
                                    onChange={handlePassportImageChange}
                                    disabled={
                                      userId &&
                                      parseInt(dealerId) ===
                                        parseInt(loggedUserId)
                                        ? false
                                        : !userId
                                        ? false
                                        : true
                                    }
                                  />
                                </Button>
                              </Grid>
                            )}
                          </Grid>

                          <Grid item xs={12} sm={12} md={4}>
                            <Field
                              name={`Passengers[${index}].travellerType`}
                              label="Traveller Type"
                              placeholder="Traveller Type"
                              className="w-100"
                              as={ASSelect}
                              disabled={
                                userId &&
                                parseInt(dealerId) === parseInt(loggedUserId)
                                  ? false
                                  : !userId
                                  ? false
                                  : true
                              }
                              helperText={
                                <ErrorMessage
                                  name={`Passengers[${index}].travellerType`}
                                />
                              }
                            >
                              <option value={""}></option>
                              <option value={0}>Adult(12+ yr)</option>
                              <option value={1}>Child(2-11 yr)</option>
                              <option value={2}>Infant(0-2 yr)</option>
                            </Field>
                          </Grid>

                          <Grid item xs={12} sm={12} md={4}>
                            <Field
                              name={`Passengers[${index}].givenName`}
                              label="Given Name"
                              className="w-100"
                              as={TextField}
                              type="text"
                              disabled={
                                userId &&
                                parseInt(dealerId) === parseInt(loggedUserId)
                                  ? false
                                  : !userId
                                  ? false
                                  : true
                              }
                              helperText={
                                <ErrorMessage
                                  name={`Passengers[${index}].givenName`}
                                />
                              }
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} md={4}>
                            <Field
                              name={`Passengers[${index}].lastName`}
                              label="Last Name"
                              className="w-100"
                              type="text"
                              as={TextField}
                              disabled={
                                userId &&
                                parseInt(dealerId) === parseInt(loggedUserId)
                                  ? false
                                  : !userId
                                  ? false
                                  : true
                              }
                              helperText={
                                <ErrorMessage
                                  name={`Passengers[${index}].lastName`}
                                />
                              }
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} md={4}>
                            <Field
                              name={`Passengers[${index}].dateOfBirth`}
                              label="Date of Birth"
                              className="w-100"
                              type="date" // Specify the type as 'date'
                              as={TextField}
                              disabled={
                                userId &&
                                parseInt(dealerId) === parseInt(loggedUserId)
                                  ? false
                                  : !userId
                                  ? false
                                  : true
                              }
                              helperText={
                                <ErrorMessage
                                  name={`Passengers[${index}].dateOfBirth`}
                                />
                              }
                              InputLabelProps={{
                                shrink: true, // To show the label after a date is selected
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} md={4}>
                            <Field
                              name={`Passengers[${index}].passportNumber`}
                              label="Passport Number"
                              className="w-100"
                              type="text"
                              as={TextField}
                              disabled={
                                userId &&
                                parseInt(dealerId) === parseInt(loggedUserId)
                                  ? false
                                  : !userId
                                  ? false
                                  : true
                              }
                              helperText={
                                <ErrorMessage
                                  name={`Passengers[${index}].passportNumber`}
                                />
                              }
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} md={4}>
                            <Field
                              name={`Passengers[${index}].issuingDate`}
                              label="Issuing Date"
                              className="w-100"
                              type="date" // Specify the type as 'date'
                              as={TextField}
                              disabled={
                                userId &&
                                parseInt(dealerId) === parseInt(loggedUserId)
                                  ? false
                                  : !userId
                                  ? false
                                  : true
                              }
                              helperText={
                                <ErrorMessage
                                  name={`Passengers[${index}].issuingDate`}
                                />
                              }
                              InputLabelProps={{
                                shrink: true, // To show the label after a date is selected
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} md={4}>
                            <Field
                              name={`Passengers[${index}].expiryDate`}
                              label="Expiry Date"
                              className="w-100"
                              type="date" // Specify the type as 'date'
                              as={TextField}
                              disabled={
                                userId &&
                                parseInt(dealerId) === parseInt(loggedUserId)
                                  ? false
                                  : !userId
                                  ? false
                                  : true
                              }
                              helperText={
                                <ErrorMessage
                                  name={`Passengers[${index}].expiryDate`}
                                />
                              }
                              InputLabelProps={{
                                shrink: true, // To show the label after a date is selected
                              }}
                            />
                          </Grid>

                          <Grid item xs={12} sm={12} md={4}>
                            <Field
                              name={`Passengers[${index}].nationality`}
                              label="Nationality"
                              className="w-100"
                              type={"text"}
                              // onPaste={handlePaste} // Prevent paste action
                              as={TextField}
                              disabled={
                                userId &&
                                parseInt(dealerId) === parseInt(loggedUserId)
                                  ? false
                                  : !userId
                                  ? false
                                  : true
                              }
                              helperText={
                                <ErrorMessage
                                  name={`Passengers[${index}].nationality`}
                                />
                              }
                            />
                          </Grid>
                        </>
                      )
                    )}
                 
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

export default CreateTicketComponent;
