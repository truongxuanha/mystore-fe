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
export interface initialTokenRefresh {
  refresh: string;
}

async function refreshToken(initialTokenRefresh: initialTokenRefresh) {
  try {
    const res = await axiosIntance.post(
      "/account/refresh",
      initialTokenRefresh
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

requestJWT.interceptors.request.use(
  async (config) => {
    if (currentUser) {
      const { token, refresh } = currentUser;
      const tokenDecode = jwtDecode<{ exp: number }>(token);
      const currentTime = Date.now() / 1000;

      if (tokenDecode.exp < currentTime) {
        console.log(currentTime);

        try {
          const resultsAction = await refreshToken({ refresh });
          const newToken = resultsAction.data;

          if (newToken) {
            currentUser.token = newToken;
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            config.headers["token"] = `${newToken}`;
          }
        } catch (error) {
          console.error("Token refresh failed:", error);
        }
      } else {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export { axiosIntance, requestJWT };
