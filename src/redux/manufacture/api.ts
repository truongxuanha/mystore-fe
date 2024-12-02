import { axiosInstance } from "../../utils/axiosConfig";

import { ParamsManuApiType, ResAllMunufacture, ResMunufacture } from "./type";

export async function getManufacturer() {
  try {
    const res = await axiosInstance.get<ResMunufacture>(`/manufacturer`);
    if (!res.data.status) throw new Error("Faill");
    return res.data.data;
  } catch (err) {
    throw err;
  }
}

export async function getAllManufacturerApi({ query, item, page }: ParamsManuApiType) {
  try {
    const res = await axiosInstance.get<ResAllMunufacture>(`/manufacturer/get-all`, {
      params: {
        query,
        page,
        item,
      },
    });
    if (!res.data.status) throw new Error("Faill");
    return res.data;
  } catch (err) {
    throw err;
  }
}
