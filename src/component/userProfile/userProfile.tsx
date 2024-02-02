import { back_icon } from "@/assets/images";
import CustomImageComponent from "@/component/image/page";
import { STRINGS, routerStrings } from "@/strings";
import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "../../app/page.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import ProfileHeader from "./profileHeader";
import UserAttendanceHistory from "./UserAttendanceHistory";
import { useDispatch } from "react-redux";
import { getListview } from "@/redux/slices/attendanceSystem";
import { END_POINT } from "@/redux/serverEndPoints";

// add new user form
function UserProfile() {

  const dispatch:any = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("ID");
  const [showDeleteIcon, setDeleteIcon] = useState(false);
  const [index, setIndex] = useState(null);
  const imageArr = [
    "image1",
    "image1",
    "image1",
    "image1",
    "image1",
    "image1",
    "image1",
    "image1",
    "image1",
    "image1",
    "image1",
    "image1",
    "image1",
    "image1",
  ];
  // back button function
  const goBack = () => {
    router.back();
  };

  
  useEffect(()=>{
    const type = "profileDetails"
    dispatch(getListview(END_POINT.getUserDetails + userId, type)); //api call for userprofile details
    // dispatch(getListview(`${END_POINT.userProfileDetails}?ID=${userId}`,type))
    dispatch(getListview(`${END_POINT.todayStatus}?userID	=${userId}`,"todayStatus")) //api call for today status
  },[])

  return (
    <Grid>
      <Grid sx={{ margin: "20px 0px " }}>
        <Grid container spacing={0}>
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
              {STRINGS.PROFILE}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid className="user-profile-wrapper">
        <ProfileHeader />
        {/* <UserAttendanceHistory /> */}
      </Grid>
    </Grid>
  );
}

export default UserProfile;
