import { axiosInstance } from "../../utils/axiosConfig";
import { RefreshTokenType, ResResfreshType } from "./type";

async function refreshToken(refresh: RefreshTokenType) {
  try {
    const res: ResResfreshType = await axiosInstance.post("account/refresh", {
      refresh: refresh,
    });

    return res.data;
  } catch (error) {
    throw error;
  }
}

export { refreshToken };
