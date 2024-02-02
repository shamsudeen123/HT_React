import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import profileImg from "../../assets/images/profile.svg";
import {
  Button,
  Pagination,
  Stack,
  SxProps,
  TablePagination,
  Theme,
} from "@mui/material";
import TableMoreMenu from "./TableMoreMenu";
import { routerUtils } from "@/utils/routerUtils";
import { routerStrings } from "@/strings";
import edit_icon from "../../assets/images/iconEdit.svg";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import attendanceSystem, {
  getListview,
  getTableList,
  setReduxState,
} from "@/redux/slices/attendanceSystem";
import { useSelector } from "react-redux";
import moment from "moment";
import { END_POINT } from "@/redux/serverEndPoints";

type Props = {
  headLabel: any[];
  rowCount?: number;
  sx?: SxProps<Theme>;
  tableData: any[];
  variant: any;
  setPageCount?: any;
  totalPages: number,
  pages: any;
};
export default function TableComponent({
  headLabel,
  rowCount,
  sx,
  tableData,
  variant,
  setPageCount,
  totalPages,
  pages
}: Props) {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openMenu, setOpenMenuActions] = React.useState<HTMLElement | null>(
    null
  );
  const dispatch: any = useDispatch();
  const router = useRouter();
  //fetching data from redux
  const reduxSearchInput = useSelector(
    (state: any) => state.attendanceSystem?.searchInput
  );
  const reduxStartDate = useSelector(
    (state: any) => state.attendanceSystem?.startDate
  );
  const reduxDepartment = useSelector(
    (state: any) => state.attendanceSystem?.department
  );
  const reduxUser = useSelector((state: any) => state.attendanceSystem?.user);
  const reduxEndDate = useSelector(
    (state: any) => state.attendanceSystem?.endDate
  );
  const reduxOffset = useSelector(
    (state: any) => state.attendanceSystem?.offSet
  );
  const attendancePageCounts = useSelector(
    (state: any) => state?.attendanceSystem?.listview?.count
  );
  const reportPageCounts = useSelector(
    (state: any) => state?.attendanceSystem?.reportListView?.count
  );
  //calculating pageCount for pagination
  const pageNumber =
    variant === "reports" || variant === "attendanceReport"
      ? reportPageCounts / 10
      : attendancePageCounts / 10;
  let pageCount: any;
  if (pageNumber > 1) {
    pageCount = Math.trunc(pageNumber + 1);
  }
  const handleChangePage = (event: any, newPage: number) => {
    console.log(newPage, event, "inside event");
    
    setPage(newPage);
    setPageCount(newPage);
  };

  // useEffect(() => {
  //   dispatch(setReduxState('offSet',page-1));
  // }, [reduxOffset]);

  useEffect(() => {
    if (variant === "attendance") getAttendanceListview(); //api call for attendance list
    if (variant === "reports") getReportListview(); //api call for report list
  }, [reduxOffset]);

  // useEffect(() => {
  //   const setDateToReduxStore = async () => {
  //     await dispatch(setReduxState('offSet',page - 1));
  //   };
  //   setDateToReduxStore();
  // }, [page]);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const handleMoreMenu = (id: any) => {
    routerUtils(
      `${routerStrings.userProfile}?tittle=Edit User&btnText=Update&ID=${id}`,
      router
    );
  };

  const handleEditIcon = () => {
    routerUtils(
      `${routerStrings.addNewUser}?tittle=Edit User&btnText=Update`,
      router
    );
  };
  const handleEdit = (id: any) => {
    routerUtils(
      `${routerStrings.addNewUser}?tittle=Edit User&btnText=Update&ID=${id}`,
      router
    );
  };
  const hadleClick = () => {};
  //function for attendanceList api call
  const getAttendanceListview = () => {
    const startDateValue = reduxStartDate
      ? moment(reduxStartDate).format("YYYY-MM-DD")
      : "";
    const endDateValue = reduxEndDate
      ? moment(reduxEndDate).format("YYYY-MM-DD")
      : "";
    const type: string = "attendancehistory";
    const requestBody = {
      startDate: startDateValue,
      endDate: endDateValue,
      departmentID: [],
      status: "",
      search: reduxSearchInput,
      offset: reduxOffset,
      limit: 10,
    };
    // dispatch(getTableList(END_POINT.attendanceListview, requestBody, type));
  };
  //function for reportList api call
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
      offset: reduxOffset,
      limit: 10,
    };
    dispatch(getTableList(END_POINT.reportListView, requestBody, type));
  };

  console.log(tableData, "inside tabledata");
  

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", boxShadow: "none" }}>
      <TableContainer sx={{}} className="table-wrapper">
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {headLabel?.map((column: any, index: any) => (
                <TableCell
                  key={index}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    maxWidth: column.maxWidth,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row: any, index: any) => {
              return (
                <>
                  <TableRow
                    hover
                    style={{ cursor: headLabel.length === 8 ? "pointer" : "" }}
                    role="checkbox"
                    tabIndex={-1}
                    key={index}
                    // onClick={() => {
                    //   headLabel.length === 8
                    //     ? handleMoreMenu(row?.icon)
                    //     : headLabel.length === 4
                    //     ? handleEditIcon
                    //     : hadleClick;
                    // }}
                    onClick={() =>
                      variant !== "ticket" ? router.push( "/addNewUser?id="+ row.id) : router.push( "/userProfile?id="+ row.id)}
                  >
                    {headLabel.map((column: any, index: any) => {
                      const value = row[column.id];
                      return (
                        <>
                          {value === row?.icon ? (
                            variant !== "user-management" && (
                              <TableCell
                                align="right"
                                key={index}
                                onClick={() =>
                                  routerUtils(routerStrings.userProfile, router)
                                }
                              >
                                <TableMoreMenu
                                  open={openMenu}
                                  onOpen={handleOpenMenu}
                                  onClose={handleCloseMenu}
                                  actions={""}
                                  key={index}
                                />
                              </TableCell>
                            )
                          ) : value === row?.imagePath ? (
                            <TableCell
                              align="left"
                              key={index}
                              // onClick={() =>
                              //   routerUtils(
                              //     `${routerStrings.addNewUser}?tittle=Edit User&btnText=Update&ID=${row?.editIcon}`,
                              //     router
                              //   )
                              // }
                            >
                              {/* <Button
                                onClick={() => handleEdit(row?.editIcon)}
                                sx={{
                                  borderRadius: "50%",
                                  width: "32px",
                                  height: "32px",
                                  minWidth: "32px",
                                }}
                              > */}
                                <img src={row.imagePath ? row.imagePath : profileImg}  height={60} width={60} style={{objectFit: "contain"}} />
                              {/* </Button> */}

                              {/* <TableMoreMenu
                                  open={openMenu}
                                  onOpen={handleOpenMenu}
                                  onClose={handleCloseMenu}
                                  actions={""}
                                /> */}
                            </TableCell>
                          ) : (
                            <TableCell
                              key={index}
                              align={column.align}
                              onClick={() => {
                                variant === "user-management"
                                  ? handleMoreMenu(row?.editIcon)
                                  : "";
                              }}
                              sx={{ cursor: "pointer" }}
                            >
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                            
                          )}
                          
                        </>
                      );
                    })}
                  </TableRow>
                </>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={2} className="pagination-wrapper">
        {/* <Pagination
          count={totalPages}
          onChange={handleChangePage}
          variant="outlined"
        /> */}
        <Pagination
      count={totalPages}
      onChange={handleChangePage}
      page={pages}
      // hideNextButton
      // hidePrevButton
      variant="outlined"
      shape="rounded"
      // boundaryCount={1}
      // siblingCount={0}
    />
      </Stack>
      {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={5}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </Paper>
  );
}
