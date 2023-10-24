import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://obla.azurewebsites.net/",
});

axiosInstance.interceptors.request.use((config) => {
  console.log("Calling api");
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = "Bearer " + `${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Api call done"); 
    return response;
  },
  (error) => {
    console.error("Error:", error); 
    console.log("Api call done with error"); 
    return Promise.reject(error);
  }
);

export default axiosInstance;
