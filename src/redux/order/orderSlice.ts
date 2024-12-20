import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createOrderDetailBillThunk, createOrderThunk, getBillByAccountThunk, getDetailBillByIdBillThunk, updateStatusOrderThunk } from "./orderThunk";
import { BillDetailType, OrderPayloadType, OrderTypeEnum, ProductOrderType } from "./type";

export type IDetailBillProduct = {
  id: number;
  name: string;
  thumbnail: string;
  price: number;
  discount: number;
  other_discount: number;
  quantity: number;
  slug: string;
};

export type IDetailBill = {
  id: number;
  createAt: string | null;
  paymentAt: string | null;
  confirmAt: string | null;
  cancellationAt: string | null;
  status: 0 | 1 | 2 | 3 | 4;
  products: IDetailBillProduct[];
  total_amount_order: number;
};
export type InitialStateType = {
  orderItems: ProductOrderType[];
  loading: boolean;
  quantity: number;
  typeOrder: OrderTypeEnum;
  detailBill?: BillDetailType;
  loadingBillDetail: boolean;
  loadingGetOrder: boolean;
  listOrders: IDetailBill[];
};
const initialState: InitialStateType = {
  orderItems: [],
  typeOrder: OrderTypeEnum.BUYNOW,
  loading: false,
  quantity: 1,
  detailBill: undefined,
  loadingBillDetail: false,
  loadingGetOrder: false,
  listOrders: [],
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
    builder
      .addCase(getBillByAccountThunk.pending, (state) => {
        state.loadingGetOrder = true;
      })
      .addCase(getBillByAccountThunk.fulfilled, (state, action) => {
        state.loadingGetOrder = false;
        state.listOrders = action.payload;
      })
      .addCase(getBillByAccountThunk.rejected, (state) => {
        state.loadingGetOrder = false;
      });
    builder
      .addCase(updateStatusOrderThunk.pending, (state) => {
        state.loadingGetOrder = true;
      })
      .addCase(updateStatusOrderThunk.fulfilled, (state) => {
        state.loadingGetOrder = false;
      })
      .addCase(updateStatusOrderThunk.rejected, (state) => {
        state.loadingGetOrder = false;
      });
  },
});
export const { updateQuantity, handleOrder } = orderSlice.actions;
export default orderSlice.reducer;
