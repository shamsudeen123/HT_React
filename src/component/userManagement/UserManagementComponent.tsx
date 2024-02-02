"use client"
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import FilterDrawer from "../filter/FilterDrawer";
import searchIcon from "../../assets/images/search_icon.svg";
import { useEffect, useState } from "react";
import { TableComponent } from "../table/page";
import { routerUtils } from "@/utils/routerUtils";
import { routerStrings } from "@/strings";
import { useRouter } from "next/navigation";
import { USER_MANAGEMENT_TABLE_HEAD } from "@/constants/AttendanceSystem";
import { useSelector } from "react-redux";
import { dispatch } from "@/redux/store";
import { getTableList, setReduxState } from "@/redux/slices/attendanceSystem";
import {
  userManagementType,
  userManagmentListViewRequestBody,
} from "@/requestBody/UserManagement";
import { END_POINT } from "@/redux/serverEndPoints";
import TableSkeleton from "../table/TableSkeleton";
import NoDataFound from "../table/NoDataFound";
import { resetReduxState } from "@/utils/resetReduxState";

export default function UserManagementComponent() {
  const router = useRouter();
  const [department, setDepartment] = useState("");
  const dealersList = useSelector(
    (state: any) => state?.attendanceSystem?.listview
  ); //  user management data fetching from redux
  const reduxDepartmentList = useSelector(
    (state: any) => state?.attendanceSystem?.departmentList?.data
  ); // department list data fetching from redux
  const reduxUserManagmentList = useSelector(
    (state: any) => state?.attendanceSystem?.listview?.data
  ); //  user management data fetching from redux
  const reduxSearchInput = useSelector(
    (state: any) => state.attendanceSystem?.searchInput
  ); //  search value from redux
  const reduxDepartmentDropdownList = useSelector(
    (state: any) => state.attendanceSystem?.departmentDropdownList
  ); //  dropdown value from redux
  const isLoading = useSelector(
    (state: any) => state.attendanceSystem?.isLoading
  ); // to check api success or not
  const reduxOffset = useSelector(
    (state: any) => state.attendanceSystem?.offSet
  ); // pagination value from redux
  const filterData = useSelector((state: any) =>
    state?.attendanceSystem?.filterData
      ? state?.attendanceSystem?.filterData
      : []
  ); // filter value from redux
  const [userManagmentList, setUserManagementList] = useState([]);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    resetReduxState(dispatch); // setting redux state to initial state
    getUserManagementListView(); // api call for listing on initial load
  }, []);

  useEffect(() => {
    // setting response to local state to bind with table predefined structure
    if (reduxUserManagmentList) {
      const userManagmentList = reduxUserManagmentList?.map((data: any) => {
        const item = {
          employee: data?.name,
          id: data?.employeeID,
          department: data?.departmentName,
          editIcon: data?._id,
        };
        return item;
      });
      setUserManagementList(userManagmentList);
    }
  }, [reduxUserManagmentList]);

  useEffect(() => {
    const setDateToReduxStore = async () => {
      await dispatch(setReduxState("offSet", pageCount));
    };
    setDateToReduxStore();
  }, [pageCount]);

  // api call based onchange of search, pagination and dropdown filter
  useEffect(() => {
      getUserManagementListView();
  }, [reduxSearchInput, reduxOffset]);

  const getUserManagementListView = () => {
    dispatch(
      getTableList(
        END_POINT.userManagementListview+ `?search=${reduxSearchInput}&page=${reduxOffset + 1}&limit=${20}`,
        userManagmentListViewRequestBody(
          reduxSearchInput,
          reduxDepartmentDropdownList,
          reduxOffset,
          filterData
        ),
        userManagementType
      )
    );
  };

  // func to handle department dropdown
  const handleChangeDepartment = (event: SelectChangeEvent) => {
    const value = event.target.value.toString();
    dispatch(setReduxState("departmentDropdownList", [value]));
  };

  // func to handle search bar
  const handleSearchBar = (event: any) => {
    dispatch(setReduxState("searchInput", event.target.value));
  };
  console.log(dealersList, "reduxUserManagmentList");
  return (
    /*  user management UI section */
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
              User Management
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={3} xl={2}>
            <Button
              variant="text"
              className="btn primary-bg text-white fs-16 fw-600"
              sx={{ marginRight: 1 }}
              onClick={() =>
                routerUtils(
                  `${routerStrings.addNewUser}?tittle=Profile&btnText=Done`,
                  router
                )
              }
            >
              Add New User
            </Button>
            {/* <FilterDrawer /> */}
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12} md={8}>
          <TextField
            className="search-field"
            value={reduxSearchInput}
            onChange={handleSearchBar}
            sx={{ marginBottom: 1 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <IconButton>
                    <img src={searchIcon.src} alt="" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            placeholder="Search by employee name"
          />
        </Grid>
        {/* <Grid item xs={12} md={4}>
          <Grid sx={{ display: "flex", alignItems: "center" }}>
            <FormControl sx={{ minWidth: 120, width: "100%", marginRight: 1 }}>
              <InputLabel id="demo-simple-select-helper-label">
                Department
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={reduxDepartmentDropdownList[0]}
                label="Department"
                onChange={handleChangeDepartment}
              >
                {reduxDepartmentList?.map((department: any, index: any) => (
                  <MenuItem value={department._id} key={index}>
                    {department.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FilterDrawer variant="user-management" />
          </Grid>
        </Grid> */}
      </Grid>
      <Grid sx={{ marginTop: 1 }}>
        {isLoading ? (
          // loader while making api call
          <TableSkeleton />
        ) : dealersList?.users?.length > 0 ? (
          // list view UI
          <TableComponent
            headLabel={USER_MANAGEMENT_TABLE_HEAD}
            tableData={dealersList.users}
            variant="user-management"
            setPageCount={setPageCount}
            totalPages={dealersList.totalPages}
            pages={pageCount}
          />
        ) : (
          // no data found UI
          <NoDataFound />
        )}
      </Grid>
    </Grid>
    /*  user management UI section */
  );
}
