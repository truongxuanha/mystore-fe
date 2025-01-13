import { axiosInstance } from "utils/axiosConfig";
import { CommentProductType, CreateCommentType } from "./type";
import dayjs from "dayjs";

export async function getCmtByIdProduct({ product_id, page = 1, item = 5, star = "all", sort = "DESC", id_account }: CommentProductType) {
  try {
    const res = await axiosInstance.get(`ratting-comment/${product_id}/comment`, {
      params: {
        item,
        page,
        star,
        sort,
        id_account,
      },
    });
    return res;
  } catch (err) {
    throw err;
  }
}

export async function createCmtByIdProductApi({ id_product, createAt = dayjs(), parent_id, star, content }: CreateCommentType) {
  try {
    const res = await axiosInstance.post(`ratting-comment/create`, { id_product, createAt, star, content, parent_id });
    return res;
  } catch (err) {
    throw err;
  }
}
