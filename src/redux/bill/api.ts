import { axiosInstance } from "utils/axiosConfig";
import { buildApiUrl } from "utils/buildUrl";
import { ParamsGetAllBill, ResBillType } from "./type";

export async function getAllBill({ query = "", status = "all", page = 1, item = 5 }: ParamsGetAllBill) {
  const paramQuery = buildApiUrl({
    query,
    status,
    page,
    item,
  });
  try {
    const res = await axiosInstance.get<ResBillType>(`/bill/get-all${paramQuery}`);
    return res.data;
  } catch (err) {
    throw err;
  }
}
