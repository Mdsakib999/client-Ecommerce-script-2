import axios from "axios";
import { envConfig } from "../config/config";

export const axiosInstance = axios.create({
  baseURL: envConfig.baseURL,
  withCredentials: true,
});

// axios.interceptors.response.use(
//   (response) => {
//     console.log("response from interceptor==>", response);
//     return response;
//   },

//   (error) => {
//     const originalRequest = error.config
//     return Promise.reject(error);
//   }
// );
