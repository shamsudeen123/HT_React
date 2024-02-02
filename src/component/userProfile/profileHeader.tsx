import { ic_profile_pic, training_imgae } from "@/assets/images";
import CustomImageComponent from "@/component/image/page";
import { STRINGS, routerStrings } from "@/strings";
import { Button, Grid, List, ListItem, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "../../app/page.module.css";
import { routerUtils } from "@/utils/routerUtils";
import { useRouter, useSearchParams } from "next/navigation";
import editProfile from "../../assets/images/editProfile.svg";
import { useSelector } from "react-redux";
import emptyUseIcon from "../../assets/images/no_user.png";
import EmptyContent from "../emptyContent/EmptyContent";
import { END_POINT } from "@/redux/serverEndPoints";
import moment from "moment";

// add new user form
function ProfileHeader() {
  const router = useRouter();
  const [fieldValues, setFieldValues] = useState<any>([]);

  const ticketDetails = useSelector(
    (state: any) => state?.attendanceSystem?.ticketListview?.ticketList
  );

  // const formattedHours = `${todayStatus?.hours
  //   .toString()
  //   .padStart(1, "0")} Hour ${todayStatus?.minutes
  //   .toString()
  //   .padStart(1, "0")} Minutes`;
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");

  useEffect(() => {
    if (userId) {
      const filteredElement: any = ticketDetails?.filter(
        (item: any) => item.id === parseInt(userId)
      );
      setFieldValues(filteredElement);
    }
  }, [userId]);

  console.log(fieldValues, "fieldValues");

  const handleEditUser = () => {
    router.push('/create-ticket?id='+ userId)
  };

  const fileList: any = [];

  const data: any = fieldValues[0];
  const role = typeof localStorage !== 'undefined' && localStorage.getItem("role");

  // const passengers = fieldValues[0].passenger?.map((item: any) => {

  // })

  return (
    <Grid>
      <Grid container spacing={2} sx={{ justifyContent: "flex-end" }}>
        <Grid item xs={12} lg={8}>
          <Grid
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            <Grid className="profile-image-wrapper">
              <img
                src={data?.imagePath}
                width={150}
                height={150}
                alt={STRINGS.ALT_PROFILE}
              />
            </Grid>

            <Grid sx={{ flexGrow: 1 }}>
              <Typography
                variant="h2"
                className="fs-26 fw-600 primary-font-color"
              >
                {data?.dealerName}
              </Typography>
              <Grid sx={{ display: "flex", alignItems: "center", marginTop: 1 }}>
                <Typography
                  variant="body2"
                  className="fs-16 fw-600 secondary-font-color"
                  sx={{ ml: "7px" }}
                >
                  {data?.departure} {" -  "}
                </Typography>
                <Typography
                  variant="body2"
                  className="fs-16 fw-600 secondary-font-color"
                  // sx={{ ml: "7px" }}
                >
                  {data?.arrival}
                </Typography>
              </Grid>
              <Grid sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  variant="body2"
                  className="fs-14 fw-400 primary-font-color"
                  sx={{ ml: "7px" }}
                >
                 Ticket Status: {data?.ticketStatus === "0" ? "Failed" : data?.ticketStatus === "1" ? "Started" : data?.ticketStatus === "2" ? "In Progress" : "Completed"}
                </Typography>
                {data?.ticketStatus === "3" &&
                <Typography
                  variant="body2"
                  className="fs-16 fw-600 secondary-font-color"
                  sx={{ ml: "20px" }}
                  
                >
                 <a href={data?.ticketImageUrl} target="_blank" style={{color: "#4baa85"}}>Download Ticket </a>
                </Typography>
}
              </Grid>
              {data?.amount &&
              <Grid sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  variant="body1"
                  className="fs-14 fw-400 primary-font-color"
                  sx={{ ml: "7px", background: "#F3FBF8",
                  borderRadius: "8px",
                  p: "6px" }}
                >
                      Amount:
                </Typography>
               <Typography
                      variant="body2"
                      className="fs-14 fw-600 font-color-greeny-Blue"
                      sx={{ ml: "7px" }}
                    >{data?.amount}</Typography>
              </Grid>
}
              <Grid
                container
                spacing={2}
                sx={{ mt: "5px", alignItems: "center" }}
              >
                <Grid item xs={12} md={6}>
                  <Grid
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      background: "#F3FBF8",
                      borderRadius: "8px",
                      p: "10px",
                    }}
                  >
                    <Typography
                      variant="body1"
                      className="fs-14 fw-400 primary-font-color"
                    >
                      Created At :
                    </Typography>
                    <Typography
                      variant="body2"
                      className="fs-14 fw-600 font-color-greeny-Blue"
                      sx={{ ml: "7px" }}
                    >
                      {moment(data?.createdAt).format("YYYY-MMM-DD HH:mm:ss")}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Grid
                    sx={{ display: "flex", alignItems: "center", px: "10px" }}
                  >
                    <Typography
                      variant="body1"
                      className="fs-14 fw-400 primary-font-color"
                    >
                      Email :
                    </Typography>
                    <Typography
                      variant="body2"
                      className="fs-14 fw-600 primary-font-color"
                      sx={{ ml: "7px" }}
                    >
                      {data?.email}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Grid container spacing={1} sx={{display: "flex", justifyContent: "end"}}>
            {/* {role !== "1" && data?.ticketStatus !== "2" && */}
            <Grid item xs={12} sm={6}>
              <Button
                variant="text"
                className=" btn btn-without-bg edit w-100"
                onClick={handleEditUser}
                disabled={role === "1" && data?.ticketStatus !== "1" ? true : false}
              >
                <img src={editProfile.src} alt="" />
                EDIT USER
              </Button>
            </Grid>
{/* } */}
            {/* <Grid item xs={12} sm={6}>
              <Button
                variant="text"
                className=" btn btn-without-bg w-100"
                onClick={() =>
                  routerUtils(routerStrings.attendanceCamera, router)
                }
              >
                RE-ISSUE TICKET
              </Button>
            </Grid> */}
          </Grid>
        </Grid>
      </Grid>
      {data?.Passengers?.map((details: any, index: any) => (
        <Grid container spacing={2} sx={{ mt: "10px" }}>
          <Grid item xs={12} lg={6}>
            <Grid
              sx={{
                p: "20px",
                background: "#F4F8FB",
                borderRadius: "16px",
                height: "100%",
              }}
            >
              <Typography
                variant="h6"
                className="fs-16 fw-600 secondary-font-color"
              >
                Passenger Details
              </Typography>
              <Grid container spacing={1} sx={{ mt: "5px" }} key={index}>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    className="fs-16 fw-400 primary-font-color"
                  >
                    Passenger Name
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body2"
                    className="fs-16 fw-600 primary-font-color"
                  >
                    {details?.givenName} {details?.lastName}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    className="fs-16 fw-400 primary-font-color"
                  >
                    Passport Number
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body2"
                    className="fs-16 fw-600 primary-font-color"
                  >
                    {details?.passportNumber}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    className="fs-16 fw-400 primary-font-color"
                  >
                    Date Of Birth
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body2"
                    className="fs-16 fw-600 primary-font-color"
                  >
                    {details?.dateOfBirth}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    className="fs-16 fw-400 primary-font-color"
                  >
                    Nationality
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body2"
                    className="fs-16 fw-600 primary-font-color"
                  >
                    {details?.nationality}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    className="fs-16 fw-400 primary-font-color"
                  >
                    Issuing Date
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body2"
                    className="fs-16 fw-600 primary-font-color"
                  >
                    {details?.issuingDate}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    className="fs-16 fw-400 primary-font-color"
                  >
                    Expiry Date
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body2"
                    className="fs-16 fw-600 primary-font-color"
                  >
                    {details?.expiryDate}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    className="fs-16 fw-400 primary-font-color"
                  >
                    Travel Class
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body2"
                    className="fs-16 fw-600 primary-font-color"
                  >
                    {data?.travellerType === "0" ? "Economy" : "Business"}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    className="fs-16 fw-400 primary-font-color"
                  >
                   Itinerary Types
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body2"
                    className="fs-16 fw-600 primary-font-color"
                  >
                    {data?.itineraryTypes}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    className="fs-16 fw-400 primary-font-color"
                  >
                   Traveller Type
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body2"
                    className="fs-16 fw-600 primary-font-color"
                  >
                    {data?.travellerType === "0" ? "Adult" : data?.travellerType === "0" ? "Child" : "Infant"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Grid
              sx={{
                p: "20px",
                background: "#F3FBF8",
                borderRadius: "16px",
                height: "100%",
              }}
            >
              <Typography
                variant="h6"
                className="fs-16 fw-600 font-color-greeny-Blue"
              >
                Passport Image
              </Typography>
              <Grid>
                <List
                  className=""
                  // sx={{
                  //   display: "flex",
                  //   flexFlow: "wrap",
                  //   gap: "10px",
                  //   mt: "10px",
                  //   justifyContent: fileList?.length > 0 ? "" : "center",
                  // }}
                >
                  <img
                    // alt={`Preview ${indexes}`}
                    src={details?.passportImagePath}
                    style={{
                      height: "260px",
                      width: "100%",
                      borderRadius: "16px",
                      objectFit: "contain",
                      cursor: "pointer",
                    }}
                  />

                  {/* </>
                ) : (
                  <EmptyContent title="No Images" img={emptyUseIcon.src} />
                )} */}
                </List>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ))}
      <Grid container spacing={2} sx={{ mt: "10px" }}>
        <Grid item xs={12} lg={12}>
          <Grid
            sx={{
              p: "20px",
              background: "#F4F8FB",
              borderRadius: "16px",
              height: "100%",
            }}
          >
            <Typography
              variant="h6"
              className="fs-16 fw-600 secondary-font-color"
            >
              Sector Image
            </Typography>
            <Grid container spacing={1} sx={{ mt: "5px" }}>
              <img src={data?.sectorImagePath} style={{width: "100%", height: 300, objectFit: "contain"}} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ProfileHeader;
