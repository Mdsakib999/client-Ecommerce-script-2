import axios from "axios";
import { envConfig } from "../config/config";

export const axiosInstance = axios.create({
  baseURL: envConfig.baseURL,
  withCredentials: true,
});
