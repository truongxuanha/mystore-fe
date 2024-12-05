import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createOrderDetailBillThunk, createOrderThunk } from "./orderThunk";
import { OrderPayloadType, OrderTypeEnum, ProductOrderType } from "./type";

export type InitialStateType = {
  orderItems: ProductOrderType[];
  loading: boolean;
  quantity: number;
  typeOrder: OrderTypeEnum;
};
const initialState: InitialStateType = {
  orderItems: [],
  typeOrder: OrderTypeEnum.BUYNOW,
  loading: false,
  quantity: 1,
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
  },
});
export const { updateQuantity, handleOrder } = orderSlice.actions;
export default orderSlice.reducer;
