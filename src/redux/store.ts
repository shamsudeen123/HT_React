import { configureStore } from '@reduxjs/toolkit'
import attendanceSystemReducer from '../redux/slices/attendanceSystem'

export const store = configureStore({
  reducer: {
    attendanceSystem: attendanceSystemReducer,
  },
})

const { dispatch } = store;

export {dispatch}