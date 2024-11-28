import { axiosInstance } from "../../utils/axiosConfig";

import { ResMunufacture } from "./type";

export async function getManufacturer() {
  try {
    const res = await axiosInstance.get<ResMunufacture>(`/manufacturer`);
    if (!res.data.status) throw new Error("Faill");
    return res.data.data;
  } catch (err) {
    throw err;
  }
}
