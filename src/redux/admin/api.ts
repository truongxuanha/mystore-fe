import { axiosInstance } from "utils/axiosConfig";

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
