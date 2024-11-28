import { createSlice } from "@reduxjs/toolkit";
import { getManuThunk } from "./manuThunk";
import { ManufactureType } from "./type";

export type InitialStateType = {
  manuItems: ManufactureType[];
  loading: boolean;
  error: string;
};
const initialState: InitialStateType = {
  manuItems: [],
  loading: false,
  error: "",
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
        state.manuItems = action.payload || [];
      })
      .addCase(getManuThunk.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default manuSlice.reducer;
