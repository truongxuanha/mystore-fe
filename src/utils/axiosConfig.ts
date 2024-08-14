import axios from "axios";
import { jwtDecode } from "jwt-decode";

const currentUserString = localStorage.getItem("currentUser");
let currentUser = null;

if (currentUserString && currentUserString !== "undefined") {
  currentUser = JSON.parse(currentUserString);
}

const axiosIntance = axios.create({
  baseURL: process.env.BASE_URL_API,
});

const requestJWT = axios.create({
  baseURL: process.env.BASE_URL_API,
});

export interface InitialTokenRefresh {
  refresh: string;
}

async function refreshToken(initialTokenRefresh: InitialTokenRefresh) {
  try {
    const res = await axiosIntance.post(
      "/account/refresh",
      initialTokenRefresh
    );

    return res.data;
  } catch (err) {
    console.error("Failed to refresh token:", err);
    throw err;
  }
}

requestJWT.interceptors.request.use(
  async (config) => {
    if (currentUser) {
      const { token, refresh } = currentUser;
      const tokenDecode = jwtDecode<{ exp: number }>(token);
      const currentTime = Date.now() / 1000;

      if (tokenDecode.exp < currentTime) {
        try {
          const refreshedData = await refreshToken({ refresh });

          const newToken = refreshedData.data;

          if (newToken) {
            currentUser.token = newToken;
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            localStorage.setItem("access_token", JSON.stringify(newToken));
            config.headers["token"] = `${newToken}`;
          }
        } catch (error) {
          console.error("Token refresh failed:", error);
          localStorage.removeItem("currentUser");
        }
      } else {
        config.headers["token"] = `${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export { axiosIntance, requestJWT };
