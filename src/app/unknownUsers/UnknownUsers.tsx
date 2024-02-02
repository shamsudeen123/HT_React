"use client";
import UnknownUsersComponent from "@/component/unknownUsers/UnknownUsersComponent";
import { resetReduxState } from "@/utils/resetReduxState";
import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function UnknownUsers() {

  const dispatch = useDispatch();

  useEffect(() => {
    resetReduxState(dispatch);
  }, [])
  
  return (
    <Grid className="page-content-wrapper">
      <UnknownUsersComponent />
    </Grid>
  );
}
