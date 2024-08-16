import axios from "axios";
import { Account } from "types";

const requestJWT = axios.create({
  baseURL: process.env.BASE_URL_API,
});

function currentUsers() {
  const currentUserLocal = localStorage.getItem("currentUser");
  return currentUserLocal ? JSON.parse(currentUserLocal) : null;
}

async function refreshToken(refreshToken: Account) {
  try {
    const response = await requestJWT.post("account/refresh", {
      refresh: refreshToken,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to refresh token!!!!", error);
    throw error;
  }
}

requestJWT.interceptors.request.use(
  (config) => {
    const currentUser = currentUsers();
    if (currentUser && currentUser.token) {
      config.headers["token"] = `${currentUser.token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

requestJWT.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const currentUser = currentUsers();
      if (currentUser) {
        const { refresh } = currentUser;
        try {
          const res = await refreshToken(refresh);
          const newToken = res.data;

          localStorage.setItem(
            "currentUser",
            JSON.stringify({ ...currentUser, token: newToken })
          );

          // requestJWT.defaults.headers["token"] = newToken;

          originalRequest.headers["token"] = newToken;
          return requestJWT(originalRequest);
        } catch (error) {
          console.error("Error refreshing!!!", error);
          localStorage.removeItem("currentUser");
          return Promise.reject(error);
        }
      }
    }
    return Promise.reject(error);
  }
);

export { requestJWT };
