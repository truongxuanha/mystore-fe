import { createAsyncThunk } from "@reduxjs/toolkit";
import { CommentProductType, CreateCommentType } from "./type";
import { createCmtByIdProductApi, getCmtByIdProduct, hiddenCmtApi } from "./api";
import { CallBackType } from "types/redux.type";

export const getCommentByIdProductThunk = createAsyncThunk(
  "comment/cmtByIdProduct",
  async ({ item, page, sort, product_id, star, id_account }: CommentProductType) => {
    const data = await getCmtByIdProduct({ item, page, sort, product_id, star, id_account });
    return data?.data;
  },
);

export const createCmtByIdProductThunk = createAsyncThunk(
  "comment/createCmnt",
  async ({ id_product, star, content, parent_id, callBack }: CreateCommentType & CallBackType) => {
    const data = await createCmtByIdProductApi({ id_product, star, content, parent_id });
    callBack();
    return data?.data;
  },
);
export const hiddenCmtThunk = createAsyncThunk("comment/hiddenCmtThunk", async ({ id, callBack }: { id: number } & CallBackType, { rejectWithValue }) => {
  try {
    const data = await hiddenCmtApi(id);
    callBack();
    return data?.data;
  } catch (err) {
    return rejectWithValue(err);
  }
});
