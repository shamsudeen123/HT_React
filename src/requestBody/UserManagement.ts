import { useSelector } from "react-redux";

//user management list view request body
export const userManagmentListViewRequestBody = (reduxSearchInput: string, departmentList: any, reduxOffset: string, filterData: any) => {
   const requestBody =  {
        "departmentID": departmentList ? departmentList : [],
        "search": reduxSearchInput ? reduxSearchInput : "",
        "offset": reduxOffset,
        "limit": 10,
        "status": filterData[0]
    }
    return requestBody;
} 

export const userManagementType = "user-management"; // type
