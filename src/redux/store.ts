// store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/userReducer/userSlice";
import cartReducer from "./reducer/cartReducer/cartSlice";
import productReducer from "./reducer/productReducer/productSlice";
import searchReducer from "./reducer/searchReducer/searchSlice";
import manufactureReducer from "./reducer/manuReducer/manuSlice";
import orderReducer from "./reducer/orderReducer/orderSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    product: productReducer,
    search: searchReducer,
    manufacturer: manufactureReducer,
    order: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
