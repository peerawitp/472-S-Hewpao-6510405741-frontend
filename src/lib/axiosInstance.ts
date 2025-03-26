import axios from "axios";
import { env } from "next-runtime-env";

const axiosInstance = axios.create({
  baseURL: env("NEXT_PUBLIC_API_BASEURL"),
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

export default axiosInstance;
