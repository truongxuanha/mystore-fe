import { buildApiUrl } from "utils/buildUrl";
import { axiosInstance, headerPostFile } from "../../utils/axiosConfig";

import { ParamsManuApiType, ProviderType, ResAllMunufacture, ResMunufacture } from "./type";

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
  const params = buildApiUrl({ query, page, item });
  const res = await axiosInstance.get<ResAllMunufacture>(`/manufacturer/get-all${params}`);
  return res.data;
}

export async function createManufactureApi(rest: ProviderType) {
  const res = await axiosInstance.post("/manufacturer/create", { ...rest }, headerPostFile);
  return res.data.data;
}
export async function updateManufactureApi(rest: ProviderType) {
  const res = await axiosInstance.put(`/manufacturer/${rest.id}/update`, { ...rest }, headerPostFile);
  return res.data.data;
}
export async function removeProviderApi(id: number) {
  try {
    const res = await axiosInstance.delete(`/manufacturer/${id}/remove`);
    if (!res.data.status) throw new Error("Faill");
    return res.data.data;
  } catch (err) {
    throw err;
  }
}
