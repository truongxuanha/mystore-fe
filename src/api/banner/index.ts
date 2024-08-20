import { axiosInstance } from "../../utils/axiosConfig";
import { ResponseBanner } from "./type";

export async function getBanner(): Promise<ResponseBanner> {
  const res: ResponseBanner = await axiosInstance.get("/banner");
  return res;
}
