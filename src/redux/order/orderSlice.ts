import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createOrderThunk } from "./orderThunk";
import { ProductOrderType } from "./type";

export type InitialStateType = {
  orderItems: ProductOrderType[];
  loading: boolean;
  quantity: number;
};
const initialState: InitialStateType = {
  orderItems: [],
  loading: false,
  quantity: 1,
};

const orderSlice = createSlice({
  name: "manufacturer",
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
    handleOrder: (state, action: PayloadAction<ProductOrderType[]>) => {
      state.orderItems = action.payload;
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
  },
});

export const { updateQuantity, handleOrder } = orderSlice.actions;
export default orderSlice.reducer;
