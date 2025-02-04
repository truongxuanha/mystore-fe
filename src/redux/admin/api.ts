import { axiosInstance, headerPostFile } from "utils/axiosConfig";
import { BannerCreateType, CreateImportType } from "./type";
import { buildApiUrl } from "utils/buildUrl";

export async function getRevenueApi() {
  try {
    const res = await axiosInstance.get(`/revenue`);

    if (!res.data.status) throw new Error(res.data.data);
    return res.data;
  } catch (err) {
    throw err;
  }
}
export async function getStaticticalApi({ startDate, endDate }: { startDate?: any; endDate?: any }) {
  try {
    const query = buildApiUrl({ startDate, endDate });
    const res = await axiosInstance.get(`/revenue/statictical${query}`);

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
  return res.data;
}
export async function deleteBannerApi(id: number | string) {
  const res = await axiosInstance.delete(`/banner/${id}/remove`);
  return res.data;
}
export async function updateCustomerApi(id: string, status?: number) {
  const res = await axiosInstance.put(`/account/${id}/update-by-id`, { status });
  return res.data;
}
export async function deleteCustomerApi(id: string) {
  const res = await axiosInstance.delete(`/account/${id}/remove`);
  return res.data;
}
export async function importProductApi(data: CreateImportType) {
  const res = await axiosInstance.post(`/revenue/import-product`, { ...data });
  return res.data;
}

export async function getImportDetailApi(id: number) {
  const res = await axiosInstance.get(`/revenue/${id}/details`);
  return res.data;
}
export async function createImageDescriptionApi(formData: any) {
  const res = await axiosInstance.post("/image_description/create", formData, headerPostFile);
  return res.data;
}
export async function deleteImageDescriptionApi(id: number) {
  const res = await axiosInstance.delete(`/image_description/${id}/remove`);
  return res.data;
}
