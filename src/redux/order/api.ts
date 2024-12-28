import { InitOrder, ParamsOrderDetailBill } from "./../../types/order.type";
import { axiosInstance } from "../../utils/axiosConfig";
import dayjs from "dayjs";
import { dateNow } from "utils/dateNow";

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
    const res = await axiosInstance.post(`/detail-bill/${type}/create`, { ...items, createAt: dateNow });
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

export async function getBillByAccountApi(status: string | number = "all") {
  try {
    const params: { status?: string | number } = {};
    if (status !== undefined) {
      params.status = status;
    }
    const res = await axiosInstance.get(`/detail-bill/get-by-account?status=${status}`);
    if (!res.data.status) throw new Error(res.data.data);
    return res.data.data;
  } catch (err) {
    throw err;
  }
}
///v1/bill/110/update-status

export async function updateStatusOrderApi({ confirmAt, email, status, id }: { confirmAt?: any; id: number; email: string; status: number }) {
  try {
    const res = await axiosInstance.put(`/bill/${id}/update-status`, { confirmAt, email, status });
    if (!res.data.success) throw new Error(res.data.data);
    return res.data.data;
  } catch (err) {
    throw err;
  }
}
