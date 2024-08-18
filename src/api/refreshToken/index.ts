import { CurrentAccount } from "types";
import { requestJWT } from "../../utils/axiosConfig";

async function refreshToken(refresh: CurrentAccount["refresh"]) {
  try {
    const res = await requestJWT.post("account/refresh", {
      refresh: refresh,
    });

    return res.data;
  } catch (error) {
    console.error("Failed to refresh token!!!!", error);
    throw error;
  }
}

export { refreshToken };
