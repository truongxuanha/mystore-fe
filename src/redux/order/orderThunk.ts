import { InitOrder, ParamsOrderDetailBill } from "../../types/order.type";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  canncelOrderApi,
  createDetailBillApi,
  createNewOrder,
  createPaymentApi,
  getBillByAccountApi,
  getDetailBillByIdApi,
  getImportByIdProductApi,
  updateStatusOrderApi,
  verifyPaymentApi,
} from "./api";
import { toastifySuccess, toastifyWarning } from "utils/toastify";
import dayjs from "dayjs";

export const createOrderThunk = createAsyncThunk("order/createOrderNow", async ({ id_address, total_amount_order }: InitOrder, {}) => {
  try {
    const res = await createNewOrder({ id_address, total_amount_order });
    return res;
  } catch (err) {}
});
export const createOrderDetailBillThunk = createAsyncThunk(
  "order/createOrderDetailBill",
  async ({ items, type }: ParamsOrderDetailBill, { rejectWithValue }) => {
    try {
      const res = await createDetailBillApi({ items, type });
      toastifySuccess(res.data);
      sessionStorage.clear();
      return res;
    } catch (err) {
      if (err instanceof Error) {
        toastifyWarning(err.message);
        return rejectWithValue(err.message);
      }
    }
  },
);
export const getDetailBillByIdBillThunk = createAsyncThunk("order/getDetailBill", async (id: number, {}) => {
  try {
    const res = await getDetailBillByIdApi(id);
    return res;
  } catch (err) {}
});

export const getBillByAccountThunk = createAsyncThunk("order/getBillByAccount", async (status?: string | number) => {
  try {
    const res = await getBillByAccountApi(status);
    return res;
  } catch (err) {}
});

export const updateStatusOrderThunk = createAsyncThunk(
  "order/updateStatusOrder",
  async ({
    email,
    status,
    id_import,
    id,
    total_unit_price,
    confirmAt = dayjs().format("YYYY/MM/DD hh:mm:ss A"),
    callBack,
  }: {
    email: string;
    confirmAt?: any;
    status: number;
    id_import: string;
    total_unit_price: number;
    id: number;
    callBack: any;
  }) => {
    try {
      const res = await updateStatusOrderApi({ email, status, id, confirmAt, id_import, total_unit_price });
      callBack();
      return res;
    } catch (err) {
      toastifyWarning("Cập nhật đơn hàng thất bại!");
    }
  },
);
export const cancelOrderThunk = createAsyncThunk(
  "order/cancelOrderThunk",
  async ({
    note_cancelation,
    status,
    id,
    cancellationAt = dayjs().format("YYYY/MM/DD hh:mm:ss A"),
    callBack,
  }: {
    note_cancelation: string;
    cancellationAt?: any;
    status: number;
    id: number;
    callBack: any;
  }) => {
    try {
      const res = await canncelOrderApi({ status, id, note_cancelation, cancellationAt });
      callBack();
      return res;
    } catch (err) {
      toastifyWarning("Cập nhật đơn hàng thất bại!");
    }
  },
);

export const createOrderPaymentThunk = createAsyncThunk(
  "order/createOrderPaymentThunk",
  async ({ items, type }: ParamsOrderDetailBill, { rejectWithValue }) => {
    try {
      const res = await createPaymentApi({ items, type });
      window.location.href = res.data;
      return res;
    } catch (err) {
      if (err instanceof Error) {
        toastifyWarning(err.message);
        return rejectWithValue(err.message);
      }
    }
  },
);

export const verifyPaymentThunk = createAsyncThunk(
  "order/verifyPaymentThunk",
  async ({ vnp_ResponseCode, orderId, callBack }: { vnp_ResponseCode: string; orderId: string; callBack: any }) => {
    const res = await verifyPaymentApi({ vnp_ResponseCode, orderId });
    if (!res.data.success) {
      toastifyWarning(res.data.message);
      callBack(res.data.success);
      return;
    }
    callBack(res.data.success);
    toastifySuccess(res.data.message);
    return res;
  },
);

export const getImportByIdProductThunk = createAsyncThunk("order/getImportByIdProduct", async ({ idsProduct }: { idsProduct: string }) => {
  const res = await getImportByIdProductApi({ idsProduct });
  return res.data;
});
