import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createOrderDetailBillThunk, createOrderThunk, getDetailBillByIdBillThunk } from "./orderThunk";
import { BillDetailType, OrderPayloadType, OrderTypeEnum, ProductOrderType } from "./type";

export type InitialStateType = {
  orderItems: ProductOrderType[];
  loading: boolean;
  quantity: number;
  typeOrder: OrderTypeEnum;
  detailBill?: BillDetailType;
  loadingBillDetail: boolean;
};
const initialState: InitialStateType = {
  orderItems: [],
  typeOrder: OrderTypeEnum.BUYNOW,
  loading: false,
  quantity: 1,
  detailBill: undefined,
  loadingBillDetail: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    updateQuantity: (state, action: PayloadAction<"previous" | "plus" | number>) => {
      if (action.payload === "previous" && state.quantity > 1) {
        state.quantity -= 1;
        return;
      }
      if (action.payload === "plus") {
        state.quantity += 1;
        return;
      }
      if (typeof action.payload === "number") {
        state.quantity = action.payload;
      }
    },
    handleOrder: (state, action: PayloadAction<OrderPayloadType>) => {
      state.orderItems = action.payload.data;
      state.typeOrder = action.payload.typeOrder;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrderThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createOrderThunk.rejected, (state) => {
        state.loading = false;
      });
    builder
      .addCase(createOrderDetailBillThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrderDetailBillThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createOrderDetailBillThunk.rejected, (state) => {
        state.loading = false;
      });
    builder
      .addCase(getDetailBillByIdBillThunk.pending, (state) => {
        state.loadingBillDetail = true;
      })
      .addCase(getDetailBillByIdBillThunk.fulfilled, (state, action) => {
        state.loadingBillDetail = false;
        state.detailBill = action.payload;
      })
      .addCase(getDetailBillByIdBillThunk.rejected, (state) => {
        state.loadingBillDetail = false;
      });
  },
});
export const { updateQuantity, handleOrder } = orderSlice.actions;
export default orderSlice.reducer;
