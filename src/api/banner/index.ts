import { axiosInstance } from "../../utils/axiosConfig";
import { ApiResponse } from "./type";

export async function getBanner(): Promise<ApiResponse> {
  const res = await axiosInstance.get<ApiResponse>("/banner");
  if (!res.data.status) throw new Error("Failed to get banner!");
  return res.data;
}
