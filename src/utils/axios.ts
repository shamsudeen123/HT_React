import axios from "axios";
import { auth_user } from "./appUtils";

const axiosInstance = axios.create({
  baseURL: process.env.HOST_API_KEY || "",
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    )
);

axiosInstance.interceptors.request.use(function(config: any) {
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${auth_user().token}`,
  };
  return config;
});
axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  function(res) {
    if (res.response && res.response.status == 401) {
      localStorage.clear();
      window.location.href = "/";
    }
    return res;
  }
);

export default axiosInstance;
