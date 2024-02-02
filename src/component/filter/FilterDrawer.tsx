import * as React from "react";

import filterIcon from "../../assets/images/filter_icon.svg";
import {
  Box,
  Button,
  Checkbox,
  Drawer,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import closeIcon from "../../assets/images/close.svg";
import { useSelector } from "react-redux";
import { getListview, getTableList, setReduxState } from "@/redux/slices/attendanceSystem";
import { END_POINT } from "@/redux/serverEndPoints";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
type Anchor = "top" | "left" | "bottom" | "right";

export default function FilterDrawer(props: any) {

  const searchParams = useSearchParams();
  const userId = searchParams.get("ID");
  const reduxSearchInput = useSelector((state: any) => state.attendanceSystem?.searchInput);
  const dispatch: any = useDispatch();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const status = props.variant === "user-management" ? ["Active", "Inactive"] : ["All", "In", "Out"];
  const departmentList = useSelector((state: any) => state?.attendanceSystem?.departmentList?.data);

//  useEffect(() => {
//     dispatch(getListview(END_POINT.departmentListView, "departmentList")); //api call for department listview
//   }, []);

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {  if (event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
    dispatch(setReduxState('filterData', []));
  };
//function to set array of checked departments
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const handleCheckboxChange = (itemId: any) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(itemId)) {
        return prevSelectedItems.filter((id) => id !== itemId);
      } else {
        return [...prevSelectedItems, itemId];
      }
    });
  };
//function to set array of checked status
  const [selectedStatus, setSelectedStatus] = useState<any[]>([]);

  const handleCheckboxStatusChange = async(itemId: any) => {
    console.log(itemId, "inside itemId itemId");
    
    // let filterData: any = [];
    setSelectedStatus((prevSelectedItems) => {
      if (prevSelectedItems.includes(itemId)) {
        return prevSelectedItems.filter((id) => id !== itemId);
      } else {
        return [...prevSelectedItems, itemId];
      }
    });
    // if(filterData.includes(itemId)) {
    //   console.log(filterData.indexOf(itemId), "filterData.indexOf(itemId)");
      
    //   filterData.splice(filterData.indexOf(itemId), 1)
    // }
    // else if(!filterData.includes(itemId)) filterData.push(itemId)
    // await dispatch(setReduxState('filterData', filterData));
  };

  useEffect(() => {
    dispatch(setReduxState('filterData', selectedStatus));
  }, [selectedStatus])

//function for report list api call
  const getReportListview = () => {
    const type: string = "report history";
    let statusValue: any;
    if (selectedStatus?.length >= 2) statusValue = "";
    else statusValue = selectedStatus[0] === 1 ? 1 : selectedStatus[0] === 2 ? 0 : "";
    const stringSelectedItems = selectedItems.map((item) => item.toString());
    const requestBody = {
      startDate: "",
      endDate: "",
      userID:props.variant === "userAttendanceHistory" ? userId : "",
      departmentID: stringSelectedItems,
      status: statusValue,
    };
    dispatch(getTableList(END_POINT.reportListView, requestBody, type));
  };
//function for attendance list api call
  const getAttendanceListview = () => {
    const type: string = "attendance history";
    let statusValue: any;
    if (selectedStatus?.length >= 2) statusValue = "";
    else statusValue = selectedStatus[0] === 1 ? 1 : selectedStatus[0] === 2 ? 0 : "";
    const stringSelectedItems = selectedItems.map((item) => item.toString());
    const requestBody = {
      startDate: "",
      endDate: "",
      departmentID: stringSelectedItems,
      status: statusValue,
      search: reduxSearchInput ? reduxSearchInput : "",
      offset: 0,
      limit: 10,
    };
    dispatch(getTableList(END_POINT.attendanceListview, requestBody, type));
  };

  const list = (anchor: Anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : "100%",
      }}
      role="presentation"
      className="filter-content"
    >
      <Grid>
        <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" className="fs-16 fw-700 primary-font-color">
            Filter
          </Typography>
          <Button
            variant="text"
            className="filter-close-btn"
            onClick={toggleDrawer("right", false)}
            sx={{
              width: "32px",
              height: "32px",
              borderRadius: "50px",
              minWidth: "auto",
            }}
          >
            <img src={closeIcon.src} alt="" />
          </Button>
        </Grid>
        <Grid>
          <Typography
            variant="h6"
            className="fs-16 fw-600 secondary-font-color"
            sx={{ margin: "5px 0px" }}
          >
            Status
          </Typography>
          <List>
            {/* <ListItem disablePadding>
              <Grid className="form-check-box">
                <FormControlLabel
                  control={<Checkbox name="All" />}
                  label="All"
                />
              </Grid>
            </ListItem> */}
            {status.map((text, index: any) => (
              <ListItem key={index} disablePadding>
                <Grid className="form-check-box">
                  <FormControlLabel
                    control={
                      <Checkbox
                        name={text}
                        onChange={() => handleCheckboxStatusChange(index)}
                      />
                    }
                    label={text}
                  />
                </Grid>
              </ListItem>
            ))}
          </List>
        </Grid>
        {props.variant !== "user-management" &&
        <Grid>
          <Typography
            variant="h6"
            className="fs-16 fw-600 secondary-font-color"
            sx={{ margin: "5px 0px" }}
          >
            Department
          </Typography>
          <List>
            <ListItem disablePadding>
              <Grid className="form-check-box">
                <FormControlLabel
                  control={<Checkbox name="All" />}
                  label="All"
                />
              </Grid>
            </ListItem>
            {departmentList?.map((text: any, index: number) => (
              <ListItem key={index} disablePadding>
                <Grid className="form-check-box">
                  <FormControlLabel
                    control={
                      <Checkbox
                        name={text}
                        checked={selectedItems.includes(text._id)}
                        onChange={() => handleCheckboxChange(text._id)}
                      />
                    }
                    label={text.name}
                  />
                </Grid>
              </ListItem>
            ))}
          </List>
        </Grid>
}
      </Grid>
      {(props.variant === "reports" || props.variant === "userAttendanceHistory") && (
        <Button
          className="btn primary-bg text-white fs-16 fw-600"
          onClick={getReportListview}
        >
          Apply
        </Button>
      )}
      {props.variant === "attendance" && (
        <Button
          className="btn primary-bg text-white fs-16 fw-600"
          onClick={getAttendanceListview}
        >
          Apply
        </Button>
      )}
    </Box>
  );

  return (
    <Grid>
      <React.Fragment>
        <Button
          onClick={toggleDrawer("right", true)}
          sx={{ width: "44px", height: "44px", minWidth: "auto" }}
        >
          <img src={filterIcon.src} alt="" />
        </Button>
        <Drawer
          className="filter-drawer-wrapper"
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
        >
          {list("right")}
        </Drawer>
      </React.Fragment>
    </Grid>
  );
}
