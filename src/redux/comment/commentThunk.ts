import { createAsyncThunk } from "@reduxjs/toolkit";
import { CommentProductType } from "./type";
import { getCmtByIdProduct } from "./api";

export const getCommentByIdProductThunk = createAsyncThunk(
  "comment/cmtByIdProduct",
  async ({ item, page, sort, product_id, star }: CommentProductType, { rejectWithValue }) => {
    try {
      const data = await getCmtByIdProduct({ item, page, sort, product_id, star });

      return data?.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
