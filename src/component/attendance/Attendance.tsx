"use client";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  ListItemAvatar,
  MenuItem,
  Select,
  TextField,
  debounce,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { Search } from "@mui/icons-material";
import searchIcon from "../../assets/images/search_icon.svg";
import filterIcon from "../../assets/images/filter_icon.svg";
import FilterDrawer from "../filter/FilterDrawer";
import TableComponent from "../table/TableComponent";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getListview,
  getTableList,
  getTicketListview,
  setReduxState,
} from "@/redux/slices/attendanceSystem";
import { END_POINT } from "@/redux/serverEndPoints";
import moment from "moment";
import { useRouter } from "next/navigation";
import RefreshIcon from '@mui/icons-material/Refresh';
import TableSkeleton from "../table/TableSkeleton";

// import TableComponent from "../table/TableComponent";
const TABLE_HEAD = [
  { id: "imagePath", label: "", minWidth: 100, align: "left" },
  {
    id: "passengerName",
    label: "Passenger Name",
    minWidth: 100,
    align: "left",
  },
  { id: "departure", label: "Departure", minWidth: 100, align: "left" },
  { id: "arrival", label: "Arrival", minWidth: 100, align: "left" },
  { id: "dealerName", label: "Dealer Name", minWidth: 100, align: "left" },
  { id: "ticketStatus", label: "Ticket Status", minWidth: 100, align: "left" },
  {
    id: "numberOfPassengers",
    label: "Number Of Passengers",
    minWidth: 100,
    align: "left",
  },
  { id: "updatedBy", label: "Updated By", minWidth: 100, align: "left" },
  // { id: "total_entries", label: "Total Entries", minWidth: 100, align: "left" },
  // { id: "status", label: "Status", minWidth: 70, align: "left" },
  // { id: "icon", label: "", align: "left" },
];

export default function Attendance() {
  const dispatch: any = useDispatch();

  //fetching data from redux
  const reduxSearchInput = useSelector(
    (state: any) => state.attendanceSystem?.searchInput
  );
  const dealerId = useSelector(
    (state: any) => state.attendanceSystem?.dealerId
  );
  const reduxStartDate = useSelector(
    (state: any) => state.attendanceSystem?.startDate
  );
  const reduxEndDate = useSelector(
    (state: any) => state.attendanceSystem?.endDate
  );
  const reduxOffset = useSelector(
    (state: any) => state.attendanceSystem?.offSet
  );
  const tableData = useSelector(
    (state: any) => state?.attendanceSystem?.ticketListview
  );
  const dealersList = useSelector(
    (state: any) => state?.attendanceSystem?.listview
  );

  console.log(dealersList, "inside tableDAte");

  const [startDate, setStartDate] = useState<any>("2023-05-19");
  const [endDate, setEndDate] = useState<any>("");
  const [searchInput, setSearchInput] = useState("");
  const [searchInputOn, setSearchInputOff] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [tableDatas, setTableDatas] = useState([
    {
      passengerName: "",
      departure: "",
      arrival: "",
      dealerName: "",
      numberOfPassengers: "",
    },
  ]);

  useEffect(() => {
    getAttendanceListview(); // api call for attendance listview
    dispatch(setReduxState("dealerId", ""));
  }, []);
  //  setting tabledata using API response
  useEffect(() => {
    if (tableData) {
      const formattedData = tableData?.ticketList?.map((row: any, index: number) => {
        const formattedDate = moment(row?.date).format("DD/MM/YYYY");
        const formattedIn = moment(row?.checkInAt).format("h:mm A");
        const formattedOut = moment(row?.checkOutAt).format("h:mm A");
        const formattedHours = `${row?.hours
          ?.toString()
          .padStart(2, "0")} hr ${row?.minutes
          ?.toString()
          .padStart(2, "0")} Mn`;
        return {
          passengerName: row?.passengerName,
          departure: row?.departure,
          arrival: row?.arrival,
          dealerName: row?.dealerName,
          numberOfPassengers: row?.Passengers.length,
          imagePath: row?.imagePath,
          id: row?.id,
          ticketStatus: row?.ticketStatus === "0" ? "Failed" : row?.ticketStatus === "1" ? "Started" :  row?.ticketStatus === "2" ? "In progress" : "Completed",
          updatedBy: row?.updatedBy ? row?.updatedBy : row?.dealerName
        };
      });
      setTableDatas(formattedData);
    }
  }, [tableData]);

  //function for date field
  const handleDate = (event: any, type: string) => {
    if (type === "startDate") setStartDate(event.target.value);
    else setEndDate(event.target.value);
  };
  const debounceFn = useCallback(debounce(handleDebounceFn, 500), []);
  //function for searching
  const searchInputChange = async (event: any) => {
    setSearchInput(event.target.value);
    setSearchInputOff(true);
    // getApplicationDetails();
    dispatch(setReduxState("searchInput", event.target.value));
  };

  const onKeyDowns = (event: any) => {
    if (event.key === "Enter") {
      //getApplicationDetails();
      debounceFn(event.target.value);
      setSearchInput(event.target.value);
      setSearchInputOff(true);
    }
  };

  useEffect(() => {
    dispatch(setReduxState("startDate", "2023-05-19")); //setting startDate to redux
  }, []);

  //setting startDate and endDate to redux
  useEffect(() => {
    const setDateToReduxStore = async () => {
      await dispatch(setReduxState("startDate", startDate));
      await dispatch(setReduxState("endDate", endDate));
    };
    setDateToReduxStore();
  }, [startDate, endDate]);

  console.log(reduxStartDate, "7627");

  const handleSubmit = () => {
    getAttendanceListview(); // api call for attendance listview
  };

  useEffect(() => {
    getAttendanceListview(); // api call for attendance listview
  }, [reduxSearchInput, dealerId, pageCount]);

  // function for attendance listview api call
  const getAttendanceListview = () => {
 let queryparams: any;
 if(reduxSearchInput && dealerId) { 
     queryparams = "?searchKeyword=" + reduxSearchInput + "&dealerId=" + dealerId + "&page=" + pageCount;
 }
 else  if(reduxSearchInput && !dealerId) { 
  queryparams = "?searchKeyword=" + reduxSearchInput + "&page=" + pageCount;
}
else  if(!reduxSearchInput && dealerId) { 
  queryparams = "?dealerId=" + dealerId + "&page=" + pageCount;
}
if(reduxSearchInput || dealerId) { 
  dispatch(getTicketListview(END_POINT.getTicketList + queryparams));
}
  else {
    const page = pageCount;
    queryparams = "?page=" + page; 
    dispatch(getTicketListview(END_POINT.getTicketList + queryparams));
  }
}
  // debounce function for searching
  function handleDebounceFn(reduxSearchInput: string) {
    // dispatch(setReduxState("searchInput", reduxSearchInput));
    // if(reduxSearchInput) getAttendanceListview()
    // dispatch(getTableList(END_POINT.attendanceListview, requestBody, type));
  }

  const router: any = useRouter();
  const handleTicket = () => {
    router.push("create-ticket");
  };

  const handleDealer = async(event: any) => {
    await dispatch(setReduxState("dealerId", event.target.value));
    // getAttendanceListview();
  }

  const role = typeof localStorage !== 'undefined' && localStorage.getItem("role");
  const isLoading = useSelector((state: any) => state?.attendanceSystem?.isLoading);

  return (
    <>
      <Grid sx={{ margin: "20px 0px " }}>
        <Grid container spacing={3} sx={{ alignItems: "center" }}>
          <Grid item xs={12} lg={2}>
            <Typography
              variant="h2"
              className="fs-26 fw-600 primary-font-color"
            >
              Tickets
            </Typography>
          </Grid>
          <Grid item xs={12} lg={10}>
            <Grid>
              <Grid container spacing={1}>
                <Grid item xs={12} lg={5} xl={5}>
                  <TextField
                    className="search-field"
                    sx={{ marginBottom: 1 }}
                    onChange={(event) => searchInputChange(event)}
                    onKeyDown={(event) => onKeyDowns(event)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <IconButton>
                            <img src={searchIcon.src} alt="" />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    placeholder="Search by name"
                  />
                </Grid>
                
                <Grid item xs={12} lg={4} xl={4}>
                  {role !== "1" &&
                  <FormControl
                    sx={{ minWidth: 120, width: "100%", marginRight: 1 }}
                  >
                    <InputLabel id="demo-simple-select-helper-label">
                      Dealer
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      label="Department"
                      MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
                      onChange={handleDealer}
                    >
                      {dealersList?.users?.map((data: any, index: any) => (
                        <MenuItem key={index} value={data.id}>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Avatar alt={data.username} src={data.imagePath} sx={{objectFit: "contain"}} />
                            <span style={{ marginLeft: "8px" }}>
                              {data.username}
                            </span>
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
}
                </Grid>
                <Grid item xs={12} sm={12} lg={3} xl={3}>
                  <Grid sx={{ display: "flex", alignItems: "center" }}>
                    <Button
                      variant="text"
                      className="btn primary-bg text-white fs-16 fw-600"
                      sx={{ marginRight: 1 }}
                      onClick={handleTicket}
                    >
                      Create Ticket
                    </Button>
                    <RefreshIcon sx={{cursor: "pointer"}} onClick={getAttendanceListview} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid>
        {isLoading ? <TableSkeleton /> : 
        tableDatas?.length > 0 ? 
        <TableComponent
          headLabel={TABLE_HEAD}
          tableData={tableDatas}
          variant="ticket"
            setPageCount={setPageCount}
            totalPages={tableData?.totalPages}
            pages={pageCount}
        /> : <h1 style={{display: "flex", justifyContent: "center", marginTop: 80, color: "#DEDEDE"}}>No Data Found</h1> }
      </Grid>
    </>
  );
}
