import axioses from "@/utils/axios";
import { createSlice } from "@reduxjs/toolkit";
import { END_POINT, setHeader } from "../serverEndPoints";
import { dispatch } from "../store";
import axiosInstance from "@/utils/axios";
import axios from "axios"
// ----------------------------------------------------------------------

const initialState: any = {
  isLoading: true,
  error: null,
  login: null,
  appWidget: null,
  listview: null,
  reportListView:null,
  searchInput:'',
  startDate:'',
  endDate:'',
  offSet: 0,
  limit:'',
  user:'',
  department:'',
  departmentList: null,
  addUserRes: null,
  fileAttachmentRes: null,
  multipleFileAttachmentRes: null,
  profileDetails:null,
  getUserDetailsRes: null,
  todayStatus:null,
  departmentDropdownList: [],
  filterData: null,
  reportDownload:null,
  ticketListview: null,
  dealerId: "",
};

 const slice = createSlice({
  name: "attendance System",
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET CATEGORY
    loginApiSuccess(state, action) {
      state.isLoading = false;
      state.login = action.payload;
    },
    // GET APP WIDGET COUNT
    appWidgetSuccess(state, action) {
      state.isLoading = false;
      state.appWidget = action.payload;
    },
    listviewSuccess(state, action) {
      console.log(action.payload, "payload");
      
      state.isLoading = false;
      state.listview = action.payload;
    },
    listviewTicketSuccess(state, action) {
      state.isLoading = false;
      state.ticketListview = action.payload;
    },
    listReportViewSuccess(state, action) {
      state.isLoading = false;
      state.reportListView = action.payload;
    },
    setLocalStateToRedux(state:any, action: any){
      state[action.payload.key] = action.payload.value
    },
    
    departmentListviewSuccess(state, action) {
      state.isLoading = false;
      state.departmentList = action.payload;
    },
    userListviewSuccess(state, action) {
      state.isLoading = false;
      state.userList = action.payload;
    },

    addUserResponse(state, action) {
      state.isLoading = false;
      state.addUserRes = action.payload;
    },
    fileAttachmentResponse(state, action) {
      state.isLoading = false;
      state.fileAttachmentRes = action.payload;
    },
    muiltipleFileAttachmentResponse(state, action) {
      state.isLoading = false;
      state.multipleFileAttachmentRes = action.payload;
    },
    profileDetailsSuccess(state, action) {
      state.isLoading = false;
      state.profileDetails = action.payload;
    },
    getUserDetailsResponse(state, action) {
      state.isLoading = false;
      state.getUserDetailsRes = action.payload;
    },
    todayStatusSuccess(state, action) {
      state.isLoading = false;
      state.todayStatus = action.payload;
    },
    listReportDownloadSuccess(state, action) {
      state.isLoading = false;
      state.reportDownload = action.payload;
    },
  },
});

export const { actions: attendanceSystemActions, reducer: attendanceSystemReducer } = slice;
// Reducer
export default slice.reducer;

// Actions

export function HTLogin(endPoint: any, requestBody: any) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const response = await axios.post(endPoint, requestBody);
        if(response.status === 200){
        localStorage.setItem("accessToken", response?.data?.token);
      dispatch(slice.actions.loginApiSuccess(response));
      }
    } 
    catch (error) {
        dispatch(slice.actions.loginApiSuccess(error));
    }
  };
}

export function addNewUser(endPoint: any, requestBody: any) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const tokenData = localStorage.getItem("accessToken");
      const header = setHeader(tokenData);
      const response = await axios.post(endPoint, requestBody, header);
      dispatch(slice.actions.addUserResponse(response));
    } catch (error) {
        dispatch(slice.actions.addUserResponse(error));
    }
  };
}

export function addNewTicket(endPoint: any, requestBody: any) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const tokenData = localStorage.getItem("accessToken");
      const header = setHeader(tokenData);
      const response = await axios.post(endPoint, requestBody, header);
      dispatch(slice.actions.addUserResponse(response));
    } catch (error) {
        dispatch(slice.actions.addUserResponse(error));
    }
  };
}

export function getAppWidgetCount(endpoint: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const tokenData = localStorage.getItem("accessToken");
      const header = setHeader(tokenData);
      const response = await axios.get(endpoint, header);
      dispatch(slice.actions.appWidgetSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getListview(endpoint: string, type?: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const tokenData = localStorage.getItem("accessToken");
      const header = setHeader(tokenData);
      const response = await axios.get(endpoint, header);
      if (type === "departmentList") {
        dispatch(slice.actions.departmentListviewSuccess(response.data));
      } else if (type === "userDetails") {
        dispatch(slice.actions.getUserDetailsResponse(response.data));
      } else if (type === "userList") {
        dispatch(slice.actions.userListviewSuccess(response.data));}
        else if (type === "profileDetails"){ dispatch(slice.actions.profileDetailsSuccess(response.data)); }
       else if (type === "todayStatus")
       {
        dispatch(slice.actions.todayStatusSuccess(response.data));
       } else {
        dispatch(slice.actions.listviewSuccess(response.data));
      }
    } catch (error) {
      if (type === "departmentList") {
        dispatch(slice.actions.departmentListviewSuccess(error));
      } else if (type === "userDetails") {
        dispatch(slice.actions.getUserDetailsResponse(error));
      } else if (type === "userList") {
        dispatch(slice.actions.userListviewSuccess(error));
      } else {
        dispatch(slice.actions.listviewSuccess(error));
      }
    }
  };
}

export function setReduxState(key: any, value: any) {
  let data: any = {
    key,
    value,
  };
  return async () => {
    // dispatch(slice.actions.startLoading());
    try {
      dispatch(slice.actions.setLocalStateToRedux(data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getTableList(endpoint: string, requestBody: any, type: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const tokenData = localStorage.getItem('accessToken');
      const header = setHeader(tokenData);
      const response = await axios.get(endpoint,header);
      if(type === "report"){ dispatch(slice.actions.listReportViewSuccess(response.data));}
      else if (type === "dowloadReport"){ dispatch(slice.actions.listReportDownloadSuccess(response.data));}
     else {dispatch(slice.actions.listviewSuccess(response.data));}
    } catch (error) {
      // dispatch(slice.actions.loginApiSuccess(error));
    }
  };
}

export function getTicketListview(endpoint: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const tokenData = localStorage.getItem('accessToken');
      const header = setHeader(tokenData);
      const response = await axios.get(endpoint,header);
      dispatch(slice.actions.listviewTicketSuccess(response.data));
    } catch (error) {
      // dispatch(slice.actions.loginApiSuccess(error));
    }
  };
}

// File attachment api
export function fileAttachments(endPoint: any, requestBody: any, type?: any) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      let response;
      const tokenData = localStorage.getItem("accessToken");
      const header = setHeader(tokenData);
      response = await axios.post(endPoint, requestBody, header);
      if (type === "uploadMuiltipleFiles") {
        dispatch(slice.actions.muiltipleFileAttachmentResponse(response));
      } else {
        dispatch(slice.actions.fileAttachmentResponse(response));
      }
    } catch (error) {
      if (type === "uploadMuiltipleFiles") {
        dispatch(slice.actions.muiltipleFileAttachmentResponse(error));
      } else {
        dispatch(slice.actions.fileAttachmentResponse(error));
      }
    }
  };
}
