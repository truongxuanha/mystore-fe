import { createSlice } from "@reduxjs/toolkit";
import { createManufactureThunk, getAllManuThunk, getManuThunk } from "./manuThunk";
import { ManufactureType } from "./type";

export type InitialStateType = {
  manuItems: ManufactureType[];
  loading: boolean;
  error: string;
  manufactures: ManufactureType[];
  totalPage: number;
  totalItem: number;
};
const initialState: InitialStateType = {
  manuItems: [],
  loading: false,
  error: "",
  manufactures: [],
  totalPage: 0,
  totalItem: 0,
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
    builder
      .addCase(getAllManuThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllManuThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.manufactures = action.payload.data;
        state.totalItem = action.payload.totalItem;
        state.totalPage = action.payload.totalPage;
      })
      .addCase(getAllManuThunk.rejected, (state) => {
        state.loading = false;
      });
    builder
      .addCase(createManufactureThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createManufactureThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createManufactureThunk.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default manuSlice.reducer;
