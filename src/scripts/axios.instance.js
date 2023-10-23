import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `${token}`;
    console.log("Response from axios :" + config.headers.Authorization);
  }

  return config;
});

export default axiosInstance;
