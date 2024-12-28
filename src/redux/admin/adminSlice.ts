import { createSlice } from "@reduxjs/toolkit";
import { createBannerThunk, deleteBannersThunk, deleteCustomerThunk, getRemenueThunk, getStaticticalThunk, updateCustomerThunk } from "./adminThunk";
import { InitialStateAdminType } from "./type";

const initialState: InitialStateAdminType = {
  loadingRemenue: false,
  remenueData: [],
  statisticalData: undefined,
  loadingBanner: false,
  loadingCustomer: false,
};
const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(getRemenueThunk.pending, (state) => {
        state.loadingRemenue = true;
      })
      .addCase(getRemenueThunk.fulfilled, (state, action) => {
        state.loadingRemenue = false;
        state.remenueData = action.payload;
      })
      .addCase(getRemenueThunk.rejected, (state) => {
        state.loadingRemenue = false;
        state.remenueData = [];
      });
    build
      .addCase(getStaticticalThunk.pending, (state) => {
        state.loadingRemenue = true;
      })
      .addCase(getStaticticalThunk.fulfilled, (state, action) => {
        state.loadingRemenue = false;
        state.statisticalData = action.payload;
      })
      .addCase(getStaticticalThunk.rejected, (state) => {
        state.loadingRemenue = false;
        state.statisticalData = undefined;
      });
    build
      .addCase(createBannerThunk.pending, (state) => {
        state.loadingBanner = true;
      })
      .addCase(createBannerThunk.fulfilled, (state) => {
        state.loadingBanner = false;
      })
      .addCase(createBannerThunk.rejected, (state) => {
        state.loadingBanner = false;
      });
    build
      .addCase(deleteBannersThunk.pending, (state) => {
        state.loadingBanner = true;
      })
      .addCase(deleteBannersThunk.fulfilled, (state) => {
        state.loadingBanner = false;
      })
      .addCase(deleteBannersThunk.rejected, (state) => {
        state.loadingBanner = false;
      });
    build
      .addCase(updateCustomerThunk.pending, (state) => {
        state.loadingCustomer = true;
      })
      .addCase(updateCustomerThunk.fulfilled, (state) => {
        state.loadingCustomer = false;
      })
      .addCase(updateCustomerThunk.rejected, (state) => {
        state.loadingCustomer = false;
      });
    build
      .addCase(deleteCustomerThunk.pending, (state) => {
        state.loadingCustomer = true;
      })
      .addCase(deleteCustomerThunk.fulfilled, (state) => {
        state.loadingCustomer = false;
      })
      .addCase(deleteCustomerThunk.rejected, (state) => {
        state.loadingCustomer = false;
      });
  },
});
export default adminSlice.reducer;
