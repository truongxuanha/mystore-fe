import { createSlice } from "@reduxjs/toolkit";
import { BannerType, SalePopupType } from "./type";
import { createPopupThunk, deletePopupThunk, getBannersThunk, getPopupThunk, updatePopupThunk } from "./homeThunk";

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
      .addCase(createPopupThunk.pending, (state) => {
        state.loadingPopup = true;
      })
      .addCase(createPopupThunk.fulfilled, (state) => {
        state.loadingPopup = false;
      })
      .addCase(createPopupThunk.rejected, (state) => {
        state.loadingPopup = false;
      });
    builder
      .addCase(updatePopupThunk.pending, (state) => {
        state.loadingPopup = true;
      })
      .addCase(updatePopupThunk.fulfilled, (state) => {
        state.loadingPopup = false;
      })
      .addCase(updatePopupThunk.rejected, (state) => {
        state.loadingPopup = false;
      });
    builder
      .addCase(deletePopupThunk.pending, (state) => {
        state.loadingPopup = true;
      })
      .addCase(deletePopupThunk.fulfilled, (state) => {
        state.loadingPopup = false;
      })
      .addCase(deletePopupThunk.rejected, (state) => {
        state.loadingPopup = false;
      });
  },
});

export default homeSlice.reducer;
