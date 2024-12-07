import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Lưu trữ vào localStorage
import authReducer from "./auth/authSlice";
import cartReducer from "./cart/cartSlice";
import productReducer from "./product/productSlice";
import searchReducer from "./search/searchSlice";
import manufactureReducer from "./manufacture/manuSlice";
import orderReducer from "./order/orderSlice";
import homeReducer from "./home/homeSlice";
import billReducer from "./bill/billSlice";
import commentReducer from "./comment/commentSlice";

const authPersistConfig = {
  key: "auth",
  storage,
  blacklist: [
    "loading",
    "error",
    "all_accounts",
    "all_customers",
    "totalAccount",
    "totalCustomer",
    "addressAcc",
    "loadingForpass",
    "dataReqOtp",
    "infoForPassWord",
    "verifyOtp",
  ],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    cart: cartReducer,
    product: productReducer,
    search: searchReducer,
    manufacturer: manufactureReducer,
    order: orderReducer,
    home: homeReducer,
    bill: billReducer,
    comment: commentReducer,
  },
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
