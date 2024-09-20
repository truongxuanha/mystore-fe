import { createSlice } from "@reduxjs/toolkit";
import { getManuThunk } from "./manuThunk";

const initialState = {
  manuItems: [],
  loading: false,
};

const manuSlice = createSlice({
  name: "manufacturer",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getManuThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getManuThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.manuItems = action.payload;
      })
      .addCase(getManuThunk.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default manuSlice.reducer;
