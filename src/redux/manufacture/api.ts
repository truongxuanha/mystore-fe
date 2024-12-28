import { axiosInstance } from "../../utils/axiosConfig";

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

export async function createManufactureApi({ name, phone, img, website }: ProviderType) {
  try {
    const res = await axiosInstance.post(
      "/manufacturer/create",
      { name, phone, img, website },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    if (!res.data.status) throw new Error("Faill");
    return res.data.data;
  } catch (err) {
    throw err;
  }
}
export async function updateManufactureApi({ id, name, phone, img, website }: ProviderType) {
  try {
    const res = await axiosInstance.put(
      `/manufacturer/${id}/update`,
      { name, phone, img, website },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    if (!res.data.status) throw new Error("Faill");
    return res.data.data;
  } catch (err) {
    throw err;
  }
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
