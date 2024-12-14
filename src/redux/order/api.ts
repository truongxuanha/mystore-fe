import { InitOrder, ParamsOrderDetailBill } from "./../../types/order.type";
import { axiosInstance } from "../../utils/axiosConfig";
import dayjs from "dayjs";

export async function createNewOrder({ id_address, createAt = dayjs(), total_amount_order }: InitOrder) {
  try {
    const res = await axiosInstance.post(`/bill/create`, { id_address, createAt, total_amount_order });
    if (!res.data.success) throw new Error(res.data.data);
    return res.data.data;
  } catch (err) {
    throw err;
  }
}
export async function createDetailBillApi({ items, type }: ParamsOrderDetailBill) {
  try {
    const res = await axiosInstance.post(`/detail-bill/${type}/create`, items);
    if (!res.data.success) throw new Error(res.data.data);
    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function getDetailBillByIdApi(id: number) {
  try {
    const res = await axiosInstance.get(`/detail-bill/${id}/get-by-bill`);

    if (!res.data.status) throw new Error(res.data.data);
    return res.data.data;
  } catch (err) {
    throw err;
  }
}
