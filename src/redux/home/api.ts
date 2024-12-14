import { axiosInstance } from "../../utils/axiosConfig";
import { BannerCreateType } from "./type";

export async function getBannerApi() {
  const res = await axiosInstance.get("/banner");
  if (!res.data.status) throw new Error("Failed to get banner!");
  return res.data;
}
export async function getPopupApi() {
  const res = await axiosInstance.get("/salepopup/get-popup-by-account");
  return res.data;
}
export async function deleteBannerApi(id: number | string) {
  const res = await axiosInstance.delete(`/banner/${id}/remove`);
  if (!res.data.status) throw new Error("Failed to get banner!");
  return res.data;
}

export async function createBannerApi({ path, image }: BannerCreateType) {
  const res = await axiosInstance.post(`/banner/create`, {
    params: {
      path,
      image,
    },
  });
  if (!res.data.status) throw new Error("Failed to get banner!");
  return res.data;
}
