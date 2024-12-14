import { axiosInstance } from "utils/axiosConfig";
import { CommentProductType, CreateCommentType } from "./type";
import dayjs from "dayjs";

export async function getCmtByIdProduct({ product_id, page = 1, item = 5, star = "all", sort = "DESC" }: CommentProductType) {
  try {
    const res = await axiosInstance.get(`ratting-comment/${product_id}/comment`, {
      params: {
        item,
        page,
        star,
        sort,
      },
    });
    return res;
  } catch (err) {
    throw err;
  }
}

export async function createCmtByIdProductApi({ id_product, createAt = dayjs(), star, content }: CreateCommentType) {
  try {
    const res = await axiosInstance.post(`ratting-comment/create`, { id_product, createAt, star, content });
    return res;
  } catch (err) {
    throw err;
  }
}
