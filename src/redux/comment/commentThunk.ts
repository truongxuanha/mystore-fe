import { createAsyncThunk } from "@reduxjs/toolkit";
import { CommentProductType, CreateCommentType } from "./type";
import { createCmtByIdProductApi, getCmtByIdProduct } from "./api";

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

export const createCmtByIdProductThunk = createAsyncThunk(
  "comment/createCmnt",
  async ({ id_product, star, content }: CreateCommentType, { rejectWithValue }) => {
    try {
      const data = await createCmtByIdProductApi({ id_product, star, content });

      return data?.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
