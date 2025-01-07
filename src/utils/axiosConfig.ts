import axios from "axios";
import { getUserStorage, removeUserStorage, setUserStorage } from "../services/storage";
import { refreshToken } from "../redux/auth/api";
import { toastifyWarning } from "./toastify";

const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL_API,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const currentUser = getUserStorage();
    if (currentUser && currentUser.token) {
      config.headers["token"] = `${currentUser.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data && response.data.status === false) {
      toastifyWarning(response.data.message || "Có lỗi xảy ra.");
      return Promise.reject(new Error(response.data.message || "Có lỗi xảy ra."));
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const currentUser = getUserStorage();
      if (currentUser) {
        const { refresh } = currentUser;
        try {
          const res = await refreshToken(refresh);
          const newToken = res.data;
          setUserStorage(currentUser, newToken);
          originalRequest.headers["token"] = newToken;
          return axiosInstance(originalRequest);
        } catch (error) {
          removeUserStorage();
          return Promise.reject(error);
        }
      }
    }
    if (error.response && error.response.status === 400) {
      const errorMessage = error.response.data?.message || "Yêu cầu không hợp lệ.";
      toastifyWarning(errorMessage);
      return Promise.reject(new Error(errorMessage));
    }
    return Promise.reject(error);
  },
);

export { axiosInstance };
