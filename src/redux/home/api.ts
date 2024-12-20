import { axiosInstance } from "../../utils/axiosConfig";

export async function getBannerApi() {
  const res = await axiosInstance.get("/banner");
  if (!res.data.status) throw new Error("Failed to get banner!");
  return res.data;
}
export async function getPopupApi() {
  const res = await axiosInstance.get("/salepopup/get-popup-by-account");
  return res.data;
}
