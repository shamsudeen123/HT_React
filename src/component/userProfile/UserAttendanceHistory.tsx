import { Button, Grid, TextField, Typography } from "@mui/material";
import FilterDrawer from "../filter/FilterDrawer";
import TableComponent from "../table/TableComponent";
import { STRINGS } from "@/strings";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getTableList, setReduxState } from "@/redux/slices/attendanceSystem";
import moment from "moment";
import { END_POINT } from "@/redux/serverEndPoints";
import { useSearchParams } from "next/navigation";

export default function UserAttendanceHistory() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("ID");
  const [startDate, setStartDate] = useState<any>("2023-05-19");
  const [endDate, setEndDate] = useState<any>("");
  const dispatch: any = useDispatch();
  //fetching data fron redux
  const reduxStartDate = useSelector(
    (state: any) => state.attendanceSystem?.startDate
  );
  const reduxEndDate = useSelector(
    (state: any) => state.attendanceSystem?.endDate
  );
  const reduxUser = useSelector((state: any) => state.attendanceSystem?.user);
  const tableData = useSelector(
    (state: any) => state?.attendanceSystem?.reportListView?.data
  );

  const [tableDatas, setTableDatas] = useState([
    {
      date: "",
      employe_in: "",
      employe_out: "",
      hours: "",
      accuracy: "",
      camera: "",
      difference: "",
    },
  ]);

  useEffect(() => {
    dispatch(setReduxState("startDate", "2023-05-19")); //setting startDate to reduxState
  }, []);
  //setting startDate and endDate to reduxState
  useEffect(() => {
    const setDateToReduxStore = async () => {
      await dispatch(setReduxState("startDate", startDate));
      await dispatch(setReduxState("endDate", endDate));
    };
    setDateToReduxStore();
  }, [startDate, endDate]);

  //function for date field
  const handleDate = (event: any, type: string) => {
    if (type === "startDate") setStartDate(event.target.value);
    else setEndDate(event.target.value);
  };
  const TABLE_HEAD = [
    { id: "date", label: "Date", minWidth: 170, align: "left" },
    { id: "employe_in", label: "In", minWidth: 170, align: "left" },
    { id: "employe_out", label: "Out", minWidth: 170, align: "left" },
    { id: "hours", label: "Hours", minWidth: 170, align: "left" },
    { id: "accuracy", label: "Accuracy", minWidth: 170, align: "left" },
    { id: "camera", label: "Camera", minWidth: 170, align: "left" },
    { id: "difference", label: "Difference", minWidth: 170, align: "left" },
  ];

  //setting tabledata using API response
  useEffect(() => {
    if (tableData) {
      const formattedData = tableData.map((row: any, index: number) => {
        const formattedDate = moment(row?.date).format("DD/MM/YYYY");
        const formattedIn = moment(row?.checkInAt).format("h:mm A");
        const formattedOut = moment(row?.checkOutAt).format("h:mm A");
        const formattedHours = `${row?.hours
          .toString()
          .padStart(2, "0")} hr ${row?.minutes.toString().padStart(2, "0")} Mn`;
        return {
          date: formattedDate,
          employe_in: formattedIn,
          employe_out: formattedOut,
          hours: formattedHours,
          accuracy: row?.accuracy,
          camera: row?.camera,
          difference: row?.difference,
        };
      });
      setTableDatas(formattedData);
    }
  }, [tableData]);
  //function for generate report button
  const handleReport = () => {
    getReportListview();
  };

  useEffect(() => {
    getReportListview(); //api call for report list
  }, [userId]);

  //function for reportList API  call
  const getReportListview = () => {
    const type: string = "report";
    const startDateValue = reduxStartDate
      ? moment(reduxStartDate).format("YYYY-MM-DD")
      : "";
    const endDateValue = reduxEndDate
      ? moment(reduxEndDate).format("YYYY-MM-DD")
      : "";
    const requestBody = {
      startDate: startDate,
      endDate: endDate,
      userID: userId,
      departmentID: [],
      status: "",
      offset: 0,
      limit: 10,
    };
    dispatch(getTableList(END_POINT.reportListView, requestBody, type));
  };

  return (
    <>
      <Grid sx={{ margin: "30px 0px 10px" }}>
        <Grid container spacing={3} sx={{ alignItems: "center" }}>
          <Grid item xs={12} lg={4}>
            <Typography
              variant="h2"
              className="fs-26 fw-600 secondary-font-color"
            >
              {STRINGS.ATTENDANCE_HISTORY}
            </Typography>
          </Grid>
          <Grid item xs={12} lg={8}>
            <Grid>
              <Grid container spacing={1} sx={{ justifyContent: "end" }}>
                <Grid item xs={12} sm={3} xl={3}>
                  <TextField
                    id="date"
                    className="disable-label-overlap"
                    label="Start Date"
                    onChange={(event: any) => handleDate(event, "startDate")}
                    type="date"
                    sx={{ marginBottom: 1 }}
                  />
                </Grid>
                <Grid item xs={12} sm={3} xl={3}>
                  <TextField
                    id="date"
                    className="disable-label-overlap"
                    label="End Date"
                    onChange={(event: any) => handleDate(event, "endDate")}
                    type="date"
                    sx={{ marginBottom: 1 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={3} xl={2}>
                  <Grid sx={{ display: "flex", alignItems: "center" }}>
                    <Button
                      variant="text"
                      className="btn primary-bg text-white fs-16 fw-600"
                      sx={{ marginRight: 1 }}
                      onClick={handleReport}
                    >
                      Submit
                    </Button>
                    <FilterDrawer variant="userAttendanceHistory" />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid>
        {/* <TableComponent
          headLabel={TABLE_HEAD}
          tableData={tableDatas}
          variant="attendanceReport"
        /> */}
      </Grid>
    </>
  );
}
