import { InitOrder, ParamsOrderDetailBill } from "../../types/order.type";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createDetailBillApi, createNewOrder, getBillByAccountApi, getDetailBillByIdApi, updateStatusOrderApi } from "./api";
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
    id,
    confirmAt = dayjs().format("YYYY/MM/DD hh:mm:ss A"),
    callBack,
  }: {
    email: string;
    confirmAt?: any;
    status: number;
    id: number;
    callBack: any;
  }) => {
    try {
      const res = await updateStatusOrderApi({ email, status, id, confirmAt });
      callBack();
      return res;
    } catch (err) {
      toastifyWarning("Cập nhật đơn hàng thất bại!");
    }
  },
);
