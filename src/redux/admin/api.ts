import { axiosInstance } from "utils/axiosConfig";
import { BannerCreateType } from "./type";

export async function getRevenueApi() {
  try {
    const res = await axiosInstance.get(`/revenue`);

    if (!res.data.status) throw new Error(res.data.data);
    return res.data;
  } catch (err) {
    throw err;
  }
}
export async function getStaticticalApi() {
  try {
    const res = await axiosInstance.get(`/revenue/statictical`);

    if (!res.data.status) throw new Error(res.data.data);
    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function createBannerApi({ path, image }: BannerCreateType) {
  const res = await axiosInstance.post(
    `/banner/create`,
    {
      path,
      image,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  if (!res.data.status) throw new Error("Failed to get banner!");
  return res.data;
}
export async function deleteBannerApi(id: number | string) {
  const res = await axiosInstance.delete(`/banner/${id}/remove`);
  if (!res.data.status) throw new Error("Failed to get banner!");
  return res.data;
}
