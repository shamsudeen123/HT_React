"use client";
import Header from "@/component/header/Header";
import SideMenu from "@/component/sideMenu/SideMenu";
import SystemSettingsComponent from "@/component/systemSettings/SystemSettingsComponent";
import { Grid } from "@mui/material";

export default function SystemSettings() {
  return (
    <Grid>
      <Grid className="page-content-wrapper">
        <SystemSettingsComponent />
      </Grid>
    </Grid>
  );
}
