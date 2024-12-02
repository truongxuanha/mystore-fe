// store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import cartReducer from "./cart/cartSlice";
import productReducer from "./product/productSlice";
import searchReducer from "./search/searchSlice";
import manufactureReducer from "./manufacture/manuSlice";
import orderReducer from "./order/orderSlice";
import homeReducer from "./home/homeSlice";
import billReducer from "./bill/billSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    product: productReducer,
    search: searchReducer,
    manufacturer: manufactureReducer,
    order: orderReducer,
    home: homeReducer,
    bill: billReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
