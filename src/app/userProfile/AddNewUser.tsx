"use client";
import UserProfile from "@/component/userProfile/userProfile";
import { Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

// add new user page(to create new user)
function AddNewUser() {
  
  return (
    <>
      {/* calling add user component to the page component */}
      <Grid className="page-content-wrapper">
        <UserProfile />
      </Grid>

      {/* calling add user component to the page component */}
    </>
  );
}

export default AddNewUser;
