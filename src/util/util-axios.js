import axios from "axios";
import { toast } from "react-toastify";
import { getErrorMessage } from "./util";

// axios.defaults.baseURL = "https://library-be-seven.vercel.app";
axios.defaults.baseURL = "http://localhost:8000";
axios.headers = { Accept: "application/json" };

const publicAxios = axios.create({});
publicAxios.interceptors.response.use(
  (response) => {
    // Modify the response data or perform any other post-processing
    return response;
  },
  (error) => {
    // Handle response errors
    toast.error(getErrorMessage(error), {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    return Promise.reject(error);
  }
);

const privateAxios = axios.create({});
privateAxios.interceptors.request.use((config) => {
  // Modify the request configuration before it is sent
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
privateAxios.interceptors.response.use(
  (response) => {
    // Modify the response data or perform any other post-processing
    console.log("response", response);
    return response;
  },
  (error) => {
    // Handle response errors
    console.error("private error", error);
    toast.error(getErrorMessage(error), {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    if (error.response) {
      if (error.response.status === 401) window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export { publicAxios, privateAxios };
