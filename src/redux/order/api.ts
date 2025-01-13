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

export async function updateStatusOrderApi({
  confirmAt,
  email,
  status,
  id_import,
  total_unit_price,
  id,
}: {
  confirmAt?: any;
  id_import: string;
  id: number;
  email: string;
  status: number;
  total_unit_price?: number;
}) {
  try {
    const res = await axiosInstance.put(`/bill/${id}/update-status`, { confirmAt, email, id_import, status, total_unit_price });
    if (!res.data.success) throw new Error(res.data.data);
    return res.data.data;
  } catch (err) {
    throw err;
  }
}
export async function canncelOrderApi({
  cancellationAt,
  note_cancelation,
  status,
  id,
}: {
  cancellationAt?: any;
  id: number;
  note_cancelation: string;
  status: number;
}) {
  try {
    const res = await axiosInstance.put(`/bill/${id}/update`, { cancellationAt, note_cancelation, status });
    if (!res.data.success) throw new Error(res.data.data);
    return res.data.data;
  } catch (err) {
    throw err;
  }
}
export async function createPaymentApi({ items, type }: ParamsOrderDetailBill) {
  try {
    const res = await axiosInstance.post(`/payment/create-payment`, { ...items, createAt: dateNow, type });
    if (!res.status) throw new Error(res.data.data);
    return res.data;
  } catch (err) {
    throw err;
  }
}
export async function verifyPaymentApi({ vnp_ResponseCode, orderId }: { vnp_ResponseCode: string; orderId: string }) {
  const res = await axiosInstance.get(`/payment/vpn-return`, {
    params: {
      responseCode: `${vnp_ResponseCode}`,
      orderId,
    },
  });
  return res.data;
}

export async function getImportByIdProductApi({ idsProduct }: { idsProduct: string }) {
  const res = await axiosInstance.get(`/revenue/get-import-id-product?ids=${idsProduct}`);
  return res.data;
}
