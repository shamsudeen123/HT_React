"use client";
import { testApi } from "@/redux/slices/attendanceSystem";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// interface Column {
//   id:
//     | "name"
//     | "id"
//     | "employe_in"
//     | "out"
//     | "hours"
//     | "total_entries"
//     | "status";
//   label: string;
//   minWidth?: number;
//   align?: "left";
//   format?: (value: number) => string;
// }

// const columns: readonly Column[] = [
//   { id: "name", label: "Employee", minWidth: 170 },
//   { id: "id", label: "ID", minWidth: 100 },
//   {
//     id: "employe_in",
//     label: "In",
//     minWidth: 170,
//     align: "left",
//     format: (value: number) => value.toLocaleString("en-US"),
//   },
//   {
//     id: "out",
//     label: "Out",
//     minWidth: 170,
//     align: "left",
//     format: (value: number) => value.toLocaleString("en-US"),
//   },
//   {
//     id: "hours",
//     label: "Hours",
//     minWidth: 170,
//     align: "left",
//     format: (value: number) => value.toFixed(2),
//   },
//   {
//     id: "total_entries",
//     label: "Total Entries",
//     minWidth: 170,
//     align: "left",
//   },
//   {
//     id: "status",
//     label: "Status",
//     minWidth: 170,
//     align: "left",
//   },
// ];

// interface Data {
//   name: string;
//   id: string;
//   employe_in: string;
//   out: string;
//   hours: string;
//   total_entries: string;
//   status: string;
// }

// function createData(
//   name: string,
//   id: string,
//   employe_in: string,
//   out: string,
//   hours: string,
//   total_entries: string,
//   status: string
// ): Data {
//   return { name, id, employe_in, out, hours, total_entries, status };
// }

// const rows = [
//   createData(
//     "Mathew John",
//     "EA2200",
//     "09:32 AM",
//     "09:32 PM",
//     "03 hr 28 Mn",
//     "03 View",
//     "Out"
//   ),
// ];
function Test() {
  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(testApi());
  }, []);

  return <div>test</div>;
}

export default Test;
