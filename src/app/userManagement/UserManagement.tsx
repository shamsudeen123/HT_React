"use client";
import Header from "@/component/header/Header";
import SideMenu from "@/component/sideMenu/SideMenu";
import UserManagementComponent from "@/component/userManagement/UserManagementComponent";
import { Grid } from "@mui/material";

export default function UserManagement() {
  return (
    <Grid>
      <Grid className="page-content-wrapper">
        <UserManagementComponent />
      </Grid>
    </Grid>
  );
}
