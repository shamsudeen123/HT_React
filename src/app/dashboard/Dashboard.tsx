"use client";
import Header from "@/component/header/Header";
import SideMenu from "@/component/sideMenu/SideMenu";
import { Grid, Skeleton } from "@mui/material";
import Typography from "@mui/material/Typography";
import totalMemberIcon from "../../assets/images/member.svg";
import totalPresentsIcon from "../../assets/images/presents.svg";
import totalUnknownIcon from "../../assets/images/unknown.svg";
import Attendance from "@/component/attendance/Attendance";
import { useEffect } from "react";
import { routerUtils } from "@/utils/routerUtils";
import { useRouter } from "next/navigation";
import { Provider, useDispatch } from "react-redux";
import { END_POINT } from "@/redux/serverEndPoints";
import { getAppWidgetCount, getListview, getTableList } from "@/redux/slices/attendanceSystem";
import { useSelector } from "react-redux";
import { userManagementType } from "@/requestBody/UserManagement";
import { store } from "@/redux/store";

// dashboard home page
export default function Dashboard() {

  const dispatch: any = useDispatch(); 
  const router = useRouter();
  if (typeof window !== "undefined") {
    // Perform localStorage action
    const item = localStorage.getItem("key");
  }
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : "";
  //redirecting to login page if accessToken not available
  // useEffect(() => {
  //   if (!accessToken) routerUtils("/", router);
  // }, [accessToken]);

  useEffect(() => {
    dispatch(getAppWidgetCount(END_POINT.appWidget)); // api call for getting app widget count
    dispatch(
      getTableList(
        END_POINT.dealersListview,
        "",
        userManagementType
      )
    );
    // getAttendanceListview(); // api call for attendance listview
  }, [])

  // // function for attendance listview api call
  // const getAttendanceListview = (searchText?: string, startDate?: string, endDate?: string, offset?: string, limit?: string) => {
  //   const endpoint = `${END_POINT.attendanceListview}?searchText=${searchText}&startDate=${startDate}&endDate=${endDate}&offset	=${offset	}&limit=${limit}`;
  //   const type: string = "attendance history";
  //   dispatch(getListview(endpoint, type));
  // }

  const widgetCount = useSelector((state: any) => state?.attendanceSystem?.appWidget); // retrieving data from redux
  const isLoading = useSelector((state: any) => state?.attendanceSystem?.isLoading); // retrieving data from redux for skeleton 
  console.log(widgetCount, "widgetCount");
  

  return (
    <>
      {/* <Header />
      <SideMenu /> */}
    <Provider store={store}>
          <Grid className="page-content-wrapper">
            <Grid className="dashboard-tile-wrapper">
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} lg={4}>
                  <Grid className="dashboard-tile">
                    <Grid>
                      <Typography variant="body1">Total Tickets</Typography>
                      <Typography variant="h2"> {widgetCount?.totalTickets}</Typography>
                    </Grid>
                    <img src={totalMemberIcon.src} alt="" />
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                  <Grid className="dashboard-tile">
                    <Grid>
                      <Typography variant="body1">Today’s Presents</Typography>
                      <Typography variant="h2"> {widgetCount?.todayCreatedTickets}</Typography>
                    </Grid>
                    <img src={totalPresentsIcon.src} alt="" />
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                  <Grid className="dashboard-tile">
                    <Grid>
                      <Typography variant="body1">
                        Open Tickets
                      </Typography>
                      <Typography variant="h2"> {widgetCount?.openTicketsCount}</Typography>
                    </Grid>
                    <img src={totalUnknownIcon.src} alt="" />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Attendance />
          </Grid>
          </Provider>
        </>
  );
}
