import { createSlice } from "@reduxjs/toolkit";
import { BannerType, SalePopupType } from "./type";
import { deleteBannersThunk, getBannersThunk, getPopupThunk } from "./homeThunk";

type InitialStateType = {
  loadingBanner: boolean;
  loadingPopup: boolean;
  banners: BannerType[];
  salePopup?: SalePopupType[];
};
const initialState: InitialStateType = {
  loadingBanner: false,
  loadingPopup: false,
  banners: [],
  salePopup: undefined,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBannersThunk.pending, (state) => {
        state.loadingBanner = true;
      })
      .addCase(getBannersThunk.fulfilled, (state, action) => {
        state.loadingBanner = false;
        state.banners = action.payload;
      })
      .addCase(getBannersThunk.rejected, (state) => {
        state.loadingBanner = false;
      });
    builder
      .addCase(getPopupThunk.pending, (state) => {
        state.loadingPopup = true;
      })
      .addCase(getPopupThunk.fulfilled, (state, action) => {
        state.loadingPopup = false;
        state.salePopup = action.payload;
      })
      .addCase(getPopupThunk.rejected, (state) => {
        state.loadingPopup = false;
      });
    builder
      .addCase(deleteBannersThunk.pending, (state) => {
        state.loadingBanner = true;
      })
      .addCase(deleteBannersThunk.fulfilled, (state) => {
        state.loadingBanner = false;
      })
      .addCase(deleteBannersThunk.rejected, (state) => {
        state.loadingBanner = false;
      });
  },
});
// export const {  } = homeSlice.actions;

export default homeSlice.reducer;
