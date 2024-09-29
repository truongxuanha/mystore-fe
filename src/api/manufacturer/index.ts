import { axiosInstance } from "../../utils/axiosConfig";

export async function getManufacturer() {
  try {
    const res = await axiosInstance.get(`/manufacturer`);
    if (!res.data.status) throw new Error("Faill");
    return res.data.data;
  } catch (err) {
    throw err;
  }
}
