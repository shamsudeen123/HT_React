import useResponsive from "@/hooks/useResponsive";
import ASSelect from "@/molecules/ASSelect";
import ASTextField from "@/molecules/ASTextfield";
import { STRINGS, routerStrings } from "@/strings";
import { routerUtils } from "@/utils/routerUtils";
import { Typography, Grid, Button, useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

function SystemSettingsComponent() {
  const router = useRouter();
  const smallScreen = useResponsive("only", "sm");
  const extraSmallScreen = useResponsive("only", "xs");
  const handleViewCamera = () => {
    router.push("/CameraView");
  };
  return (
    <>
      <Grid sx={{ margin: "20px 0px " }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography
              variant="h2"
              className="fs-26 fw-600 primary-font-color"
            >
              {STRINGS.SYSTEM_SETTINGS}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              className="add-user-section-heading-text"
              sx={{ marginBottom: "5px" }}
            >
              {STRINGS.CAMERA_SELECTION}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <ASSelect
              name="Attendance In Camera"
              label="Attendance In Camera"
              placeholder="Attendance In Camera"
              type="text"
              className="w-100"
            >
              <option value={""}></option>
              <option value={"Camera1"}>Camera 1</option>
              <option value={"Camera2"}>Camera 2</option>
              <option value={"Camera3"}>Camera 3</option>
            </ASSelect>
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={2}>
            <Button
              variant="text"
              className=" btn  btn-without-bg"
              onClick={() =>
                routerUtils(routerStrings.attendanceCamera, router)
              }
            >
              View Now
            </Button>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          sx={{ my: extraSmallScreen ? "5px" : "10px" }}
        >
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <ASSelect
              className="w-100"
              name="Attendance Out Camera"
              label="Attendance Out Camera"
              placeholder="Attendance Out Camera"
              type="text"
            >
              <option value={""}></option>
              <option value={"Camera2"}>Camera 2</option>
              <option value={"Camera"}>Camera</option>
            </ASSelect>
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={2}>
            <Button variant="text" className=" btn btn-without-bg">
              View Now
            </Button>
          </Grid>
        </Grid>
        <Typography
          className="add-user-section-heading-text"
          sx={{ my: "30px" }}
        >
          {STRINGS.TRAINING}
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <ASSelect
              name="Training Selection"
              label="Training Selection"
              placeholder="Training Selection"
              type="text"
              className="w-100"
            >
              <option value={""}></option>
              <option value={"Manual"}>Manual</option>
            </ASSelect>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default SystemSettingsComponent;
