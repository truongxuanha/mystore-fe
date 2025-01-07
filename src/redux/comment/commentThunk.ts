import { createAsyncThunk } from "@reduxjs/toolkit";
import { CommentProductType, CreateCommentType } from "./type";
import { createCmtByIdProductApi, getCmtByIdProduct } from "./api";
import { CallBackType } from "types/redux.type";

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
  async ({ id_product, star, content, parent_id, callBack }: CreateCommentType & CallBackType, { rejectWithValue }) => {
    try {
      const data = await createCmtByIdProductApi({ id_product, star, content, parent_id });
      callBack();
      return data?.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
