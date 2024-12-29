import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { searchThunk } from "./searchThunk";
import { ProductsType } from "types";

export type SearchStateType = {
  isLoading: boolean;
  results: ProductsType[];
};
const initialState: SearchStateType = {
  results: [],
  isLoading: false,
};
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchThunk.fulfilled, (state, action: PayloadAction<ProductsType[] | undefined>) => {
        state.isLoading = false;
        state.results = action.payload ?? [];
      })
      .addCase(searchThunk.rejected, (state) => {
        state.isLoading = false;
        state.results = [];
      });
  },
});

export default searchSlice.reducer;
