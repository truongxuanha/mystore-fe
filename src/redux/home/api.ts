import { axiosInstance } from "../../utils/axiosConfig";
import { SalePopupReduxType, SalePopupType } from "./type";

export async function getBannerApi() {
  const res = await axiosInstance.get("/banner");
  if (!res.data.status) throw new Error("Failed to get banner!");
  return res.data;
}
export async function getPopupApi() {
  const res = await axiosInstance.get("/salepopup/get-popup-by-account");
  return res.data;
}
export async function deletePopupApi(id: number) {
  const res = await axiosInstance.delete(`/salepopup/delete-popup/${id}`);
  return res.data;
}
export async function createPopupApi({ popup_img, url_transit }: SalePopupReduxType) {
  const res = await axiosInstance.post(
    "/salepopup/create-popup",
    { popup_img, url_transit },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return res.data;
}

export async function updatePopupApi({ popup_img, url_transit, popup_id }: SalePopupType) {
  const res = await axiosInstance.put(
    `/salepopup/${popup_id}/update-popup`,
    { popup_img, url_transit },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return res.data;
}
