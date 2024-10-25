import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductsType } from "../../../types";
import { fetchSearchResults } from "./searchThunk";

export interface SearchStateType {
  isLoading: boolean;
  results: ProductsType[];
}
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
      .addCase(fetchSearchResults.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action: PayloadAction<ProductsType[] | undefined>) => {
        state.isLoading = false;
        state.results = action.payload ?? [];
      })
      .addCase(fetchSearchResults.rejected, (state) => {
        state.isLoading = false;
        state.results = [];
      });
  },
});

export default searchSlice.reducer;
