import { InitOrder } from "./../../../types/order.type";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createNewOrder } from "../../../api/order";

export const createOrderThunk = createAsyncThunk("order/createOrderNew", async ({ id, id_account, id_address }: InitOrder, { rejectWithValue }) => {
  try {
    const res = await createNewOrder({ id, id_account, id_address });
    return res;
  } catch (err) {}
});
