import { createSlice } from "@reduxjs/toolkit";
import { createCmtByIdProductThunk, getCommentByIdProductThunk } from "./commentThunk";
type InitialStateType = {
  loadingCmt: boolean;
  dataCommentById: any;
  commentById: any;
  dataAccountCmts: any;
  dataRatingProduct: any;
};
const initialState: InitialStateType = {
  dataCommentById: [],
  commentById: [],
  dataAccountCmts: [],
  dataRatingProduct: [],
  loadingCmt: false,
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCommentByIdProductThunk.pending, (state) => {
        state.loadingCmt = true;
      })
      .addCase(getCommentByIdProductThunk.fulfilled, (state, action) => {
        state.loadingCmt = false;
        state.dataCommentById = action.payload.data;
        state.commentById = action.payload;
        state.dataRatingProduct = action.payload.starStats;
        state.dataAccountCmts = action.payload.dataAccount;
      })
      .addCase(getCommentByIdProductThunk.rejected, (state) => {
        state.loadingCmt = false;
      });
    builder
      .addCase(createCmtByIdProductThunk.pending, (state) => {
        state.loadingCmt = true;
      })
      .addCase(createCmtByIdProductThunk.fulfilled, (state) => {
        state.loadingCmt = false;
      })
      .addCase(createCmtByIdProductThunk.rejected, (state) => {
        state.loadingCmt = false;
      });
  },
});
export default commentSlice.reducer;
