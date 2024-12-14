import { createSlice } from "@reduxjs/toolkit";
import { getRemenueThunk, getStaticticalThunk } from "./adminThunk";
import { InitialStateAdminType } from "./type";

const initialState: InitialStateAdminType = {
  loadingRemenue: false,
  remenueData: [],
  statisticalData: undefined,
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
  },
});
export default adminSlice.reducer;
