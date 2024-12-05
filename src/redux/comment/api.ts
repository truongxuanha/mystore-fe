import { axiosInstance } from "utils/axiosConfig";
import { CommentProductType } from "./type";

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
