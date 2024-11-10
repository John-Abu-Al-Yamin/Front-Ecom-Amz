import axios from "axios";
import Cookie from "cookie-universal";

const cookie = Cookie();
const baseUrl = "http://127.0.0.1:8000/api";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = cookie.get("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle response errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log(error.response.data.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
