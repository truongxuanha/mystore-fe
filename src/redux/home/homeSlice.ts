import { createSlice } from "@reduxjs/toolkit";
import { BannerType } from "./type";
import { getBanners } from "./homeThunk";

type InitialStateType = {
  loadingBanner: boolean;
  banners: BannerType[];
};
const initialState: InitialStateType = {
  loadingBanner: false,
  banners: [],
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBanners.pending, (state) => {
        state.loadingBanner = true;
      })
      .addCase(getBanners.fulfilled, (state, action) => {
        state.loadingBanner = false;
        state.banners = action.payload;
      })
      .addCase(getBanners.rejected, (state) => {
        state.loadingBanner = false;
      });
  },
});
// export const {  } = homeSlice.actions;

export default homeSlice.reducer;
