import { InitOrder, ParamsOrderDetailBill } from "../../types/order.type";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createDetailBillApi, createNewOrder, getDetailBillByIdApi } from "./api";
import { toastifySuccess, toastifyWarning } from "utils/toastify";

export const createOrderThunk = createAsyncThunk("order/createOrderNow", async ({ id_address, total_amount_order }: InitOrder, {}) => {
  try {
    const res = await createNewOrder({ id_address, total_amount_order });
    return res;
  } catch (err) {}
});
export const createOrderDetailBillThunk = createAsyncThunk("order/createOrderDetailBill", async ({ items, type }: ParamsOrderDetailBill, {}) => {
  try {
    const res = await createDetailBillApi({ items, type });
    toastifySuccess(res.data);
    sessionStorage.clear();
    return res;
  } catch (err) {
    toastifyWarning(err.message as string);
  }
});
export const getDetailBillByIdBillThunk = createAsyncThunk("order/getDetailBill", async (id: number, {}) => {
  try {
    const res = await getDetailBillByIdApi(id);
    return res;
  } catch (err) {}
});
