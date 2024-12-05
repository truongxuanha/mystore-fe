import { InitOrder, ParamsOrderDetailBill } from "../../types/order.type";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createDetailBillApi, createNewOrder } from "./api";

export const createOrderThunk = createAsyncThunk("order/createOrderNow", async ({ id_address }: InitOrder, {}) => {
  try {
    const res = await createNewOrder({ id_address });
    return res;
  } catch (err) {}
});
export const createOrderDetailBillThunk = createAsyncThunk("order/createOrderDetailBill", async ({ items, type }: ParamsOrderDetailBill, {}) => {
  try {
    const res = await createDetailBillApi({ items, type });
    sessionStorage.clear();
    return res;
  } catch (err) {}
});
