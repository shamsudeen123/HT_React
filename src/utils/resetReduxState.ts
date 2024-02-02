import { setReduxState } from "@/redux/slices/attendanceSystem";
import { useDispatch } from "react-redux";

export const resetReduxState = async (dispatch: any) => {
    await dispatch(setReduxState('departmentDropdownList', []));
    await dispatch(setReduxState('searchInput', ""));
    await dispatch(setReduxState('offSet', 0));
    await dispatch(setReduxState('filterData', []));
    
}