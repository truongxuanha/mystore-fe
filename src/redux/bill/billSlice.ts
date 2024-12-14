import { createSlice } from "@reduxjs/toolkit";
import { BillType } from "./type";
import { getAllBillThunk } from "./billThunk";

export type InitialStateType = {
  bills?: BillType[];
  loadingBill: boolean;
  error: string;
  totalPage: number;
  totalItem: number;
};
const initialState: InitialStateType = {
  bills: undefined,
  loadingBill: false,
  error: "",
  totalPage: 0,
  totalItem: 0,
};

const billSlice = createSlice({
  name: "billAdmin",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllBillThunk.pending, (state) => {
        state.loadingBill = true;
      })
      .addCase(getAllBillThunk.fulfilled, (state, action) => {
        state.loadingBill = false;
        state.bills = action.payload.data;
        state.totalItem = action.payload.totalItem;
        state.totalPage = action.payload.totalPage;
      })
      .addCase(getAllBillThunk.rejected, (state) => {
        state.loadingBill = false;
      });
  },
});

export default billSlice.reducer;
