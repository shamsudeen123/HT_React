import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import FilterDrawer from "../filter/FilterDrawer";
import TableComponent from "../table/TableComponent";
import downloadIcon from "../../assets/images/download.svg";
import userImg from "../../assets/images/user_img.png";
import avatharImg from "../../assets/images/profile.svg";
import Image from "../Image";
import { END_POINT } from "@/redux/serverEndPoints";
import { useDispatch } from "react-redux";
import {
  getListview,
  getTableList,
  setReduxState,
} from "@/redux/slices/attendanceSystem";
import { useSelector } from "react-redux";
import moment from "moment";
import profileImg from "../../assets/images/profile.svg";
// import XLSX from "xlsx";
import { saveAs } from "file-saver";
import {
  utils,
  writeFile,
  WorkBook,
  WorkSheet,
  CellObject,
  ColInfo,
} from "xlsx";
export default function ReportsComponent() {
  const [department, setDepartment] = useState([""]);
  const [user, setUser] = useState("");
  const [startDate, setStartDate] = useState<any>("2023-05-19");
  const [endDate, setEndDate] = useState<any>("");
  const dispatch: any = useDispatch();
  // data fetching from redux
  const departmentList = useSelector(
    (state: any) => state?.attendanceSystem?.departmentList?.data
  );
  const userList = useSelector(
    (state: any) => state?.attendanceSystem?.userList?.data
  );
  const reduxOffSet = useSelector(
    (state: any) => state.attendanceSystem?.offSet
  );
  const reduxStartDate = useSelector(
    (state: any) => state.attendanceSystem?.startDate
  );
  const reduxEndDate = useSelector(
    (state: any) => state.attendanceSystem?.endDate
  );
  const reduxDepartment = useSelector(
    (state: any) => state.attendanceSystem?.department
  );
  const reduxUser = useSelector((state: any) => state.attendanceSystem?.user);
  const tableData = useSelector(
    (state: any) => state?.attendanceSystem?.reportListView?.data
  );
  const excelData = useSelector(
    (state: any) => state?.attendanceSystem?.reportDownload
  );
  console.log(excelData, "excelData");

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
  //setting data to reduxState
  useEffect(() => {
    const setDateToReduxStore = async () => {
      await dispatch(setReduxState("startDate", startDate));
      await dispatch(setReduxState("endDate", endDate));
      await dispatch(setReduxState("department", department));
      await dispatch(setReduxState("user", user));
    };
    setDateToReduxStore();
  }, [startDate, endDate, department, user]);
  //function for department selection
  const handleChange = (event: SelectChangeEvent) => {
    setDepartment([event.target.value]);
  };
  //function for user selection
  const handleUserChange = (event: SelectChangeEvent) => {
    setUser(event.target.value);
  };
  //function for date fields
  const handleDate = (event: any, type: string) => {
    if (type === "startDate") setStartDate(event.target.value);
    else setEndDate(event.target.value);
  };
  console.log(reduxStartDate, "reduxStartDate");

  const TABLE_HEAD = [
    { id: "date", label: "Date", minWidth: 170, align: "left" },
    { id: "employe_in", label: "In", minWidth: 170, align: "left" },
    { id: "employe_out", label: "Out", minWidth: 170, align: "left" },
    { id: "hours", label: "Hours", minWidth: 170, align: "left" },
    { id: "accuracy", label: "Accuracy", minWidth: 170, align: "left" },
    { id: "camera", label: "Camera", minWidth: 170, align: "left" },
    { id: "difference", label: "Difference", minWidth: 170, align: "left" },
  ];
  // Seting tabledata data using API response
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

  useEffect(() => {
    dispatch(getListview(END_POINT.departmentListView, "departmentList")); //api call for department listview
  }, []);

  useEffect(() => {
    dispatch(getListview(END_POINT.userListView, "userList")); //api call for user listview
  }, []);

  useEffect(() => {
    getReportListview(); //api call for reports listview
  }, []);

  const handleReport = () => {
    getReportListview();
  };
  // useEffect(()=>{
  //   if(startDate || endDate || user || department)
  //   getReportListview();  //api call for reports listview with startDate ,endDate and userId
  // },[startDate,endDate,user,department])

  // function for report listview api call
  const getReportListview = () => {
    const type: string = "report";
    const startDateValue = reduxStartDate
      ? moment(reduxStartDate).format("YYYY-MM-DD")
      : "";
    const endDateValue = reduxEndDate
      ? moment(reduxEndDate).format("YYYY-MM-DD")
      : "";
    const departmentIDValue =
      reduxDepartment && reduxDepartment[0] !== ""
        ? reduxDepartment.map((item: any) => item.toString())
        : "";
    const requestBody = {
      startDate: startDateValue,
      endDate: endDateValue,
      userID: reduxUser,
      departmentID: departmentIDValue,
      status: "",
      offset: 0,
      limit: 10,
    };
    dispatch(getTableList(END_POINT.reportListView, requestBody, type));
  };

  const handleExcel = () => {
    const type: string = "dowloadReport";
    const startDateValue = reduxStartDate
      ? moment(reduxStartDate).format("YYYY-MM-DD")
      : "";
    const endDateValue = reduxEndDate
      ? moment(reduxEndDate).format("YYYY-MM-DD")
      : "";
    const departmentIDValue =
      reduxDepartment && reduxDepartment[0] !== ""
        ? reduxDepartment.map((item: any) => item.toString())
        : "";
    const requestBody = {
      startDate: startDateValue,
      endDate: endDateValue,
      userID: reduxUser,
      departmentID: departmentIDValue,
      status: "",
      offset: 0,
      limit: 10,
      hasAllData: true,
    };
    dispatch(getTableList(END_POINT.reportListView, requestBody, type));
  };

  useEffect(() => {
    if (excelData?.succes) downloadExcelFile();
  }, [excelData]);

  const [isFontBold, setIsFontBold] = useState(false);

  const toggleFontWeight = () => {
    setIsFontBold(!isFontBold);
  };
  const downloadExcelFile = () => {
    const excelDatas = excelData?.data;
    console.log(excelDatas, "excelDatas");

    const formattedData = excelDatas.map((row: any, index: number) => {
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

    const headingRow = [
      "Date",
      "Employee In",
      "Employee Out",
      "Hours",
      "Accuracy",
      "Camera",
      "Difference",
    ];

    const formattedDataArray = [
      headingRow,
      ...formattedData.map((row: any) => [
        row.date,
        row.employe_in,
        row.employe_out,
        row.hours,
        row.accuracy || "",
        row.camera || "",
        row.difference || "",
      ]),
    ];

    // Create a new workbook and worksheet
    const workbook: WorkBook = utils.book_new();
    const worksheet: WorkSheet = utils.aoa_to_sheet(formattedDataArray);

    // Set column widths
    const columnWidths: ColInfo[] = [
      { wch: 20 }, // Date
      { wch: 20 }, // Employee In
      { wch: 20 }, // Employee Out
      { wch: 20 }, // Hours
      { wch: 15 }, // Accuracy
      { wch: 15 }, // Camera
      { wch: 20 }, // Difference
    ];
    worksheet["!cols"] = columnWidths;

    // Apply font weight to the heading row
    const headingRowCells: CellObject[] = headingRow.map(
      (headingCell, index) => {
        const cell: CellObject = { v: headingCell, t: "s" };
        if (isFontBold) {
          cell.s = { font: { bold: true } };
        } else {
          cell.s = { font: { bold: true } };
        }
        return cell;
      }
    );
    worksheet["1"] = headingRowCells;
    // Add the worksheet to the workbook
    utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Generate Excel file binary data
    const excelBuffer = writeFile(workbook, "data.xlsx");

    // Convert the buffer to a Blob
    const excelBlob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Save the file using FileSaver.js
    saveAs(excelBlob, "data.xlsx");
  };

  return (
    <Grid>
      <Grid sx={{ margin: "20px 0px " }}>
        <Grid
          container
          spacing={3}
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <Grid item xs={12} sm={6}>
            <Typography
              variant="h2"
              className="fs-26 fw-600 primary-font-color"
            >
              Reports
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={3} xl={2}>
            <Button
              variant="text"
              className="btn  fs-16 fw-600 download btn-without-bg"
              sx={{ marginRight: 1 }}
              onClick={handleExcel}
            >
              <img src={downloadIcon.src} alt="" />
              Download
            </Button>
            {/* <FilterDrawer /> */}
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} lg={3}>
          <FormControl sx={{ minWidth: 120, width: "100%", marginRight: 1 }}>
            <InputLabel id="demo-simple-select-helper-label">
              Select User
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={user}
              label="Select User"
              onChange={handleUserChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {userList?.map((user: any, index: any) => (
                <MenuItem value={user._id} key={index}>
                  <Grid className="selct-user-list">
                    <Image
                      src={
                        user?.image
                          ? END_POINT.imageBaseUrl + user?.image
                          : profileImg.src
                      }
                      height={30}
                    />
                    <Grid>
                      <Typography variant="h6"> {user.name}</Typography>
                      <Typography variant="body1">
                        {" "}
                        {user.employeeID}
                      </Typography>
                    </Grid>
                  </Grid>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} lg={2} xl={2}>
          <FormControl
            sx={{
              minWidth: 120,
              width: "100%",
              marginRight: 1,
              marginBottom: 1,
            }}
          >
            <InputLabel id="demo-simple-select-helper-label">
              Department
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={department[0]}
              label="Department"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {departmentList?.map((department: any, index: any) => (
                <MenuItem value={department._id} key={index}>
                  {department.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3} lg={2} xl={2}>
          <TextField
            id="date"
            className="disable-label-overlap"
            onChange={(event: any) => handleDate(event, "startDate")}
            label="Start Date"
            type="date"
            sx={{ marginBottom: 1 }}
          />
        </Grid>
        <Grid item xs={12} sm={3} lg={2} xl={2}>
          <TextField
            id="date"
            className="disable-label-overlap"
            onChange={(event: any) => handleDate(event, "endDate")}
            label="End Date"
            type="date"
            sx={{ marginBottom: 1 }}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3} xl={3}>
          <Grid sx={{ display: "flex", alignItems: "center" }}>
            <Button
              variant="text"
              className="btn primary-bg text-white fs-16 fw-600"
              sx={{ marginRight: 1 }}
              onClick={handleReport}
            >
              Generate Report
            </Button>
            <FilterDrawer variant="reports" />
          </Grid>
        </Grid>
      </Grid>
      <Grid sx={{ marginTop: 1 }}>
        {/* <TableComponent
          headLabel={TABLE_HEAD}
          tableData={tableDatas}
          variant="reports"
        /> */}
      </Grid>
    </Grid>
  );
}
