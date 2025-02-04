import { axiosInstance } from "utils/axiosConfig";
import { CommentProductType, CreateCommentType } from "./type";
import dayjs from "dayjs";
import { buildApiUrl } from "utils/buildUrl";

export function getCmtByIdProduct({ product_id, page = 1, item = 5, star = "all", sort = "DESC", id_account }: CommentProductType) {
  const query = buildApiUrl({ item, page, star, sort, id_account });
  const res = axiosInstance.get(`/ratting-comment/${product_id}/comment${query}`);
  return res;
}

export function createCmtByIdProductApi({ id_product, createAt = dayjs(), parent_id, star, content }: CreateCommentType) {
  const res = axiosInstance.post(`/ratting-comment/create`, { id_product, createAt, star, content, parent_id });
  return res;
}

export function hiddenCmtApi(id: number) {
  const res = axiosInstance.put(`/ratting-comment/${id}/update`, { status: 1 });
  return res;
}

export function removeCmtApi(id: number) {
  const res = axiosInstance.delete(`/ratting-comment/${id}/removebyid`);
  return res;
}
export function updateCmtApi({ id, content }: { id: number; content: string }) {
  const res = axiosInstance.put(`/ratting-comment/${id}/update`, { content });
  return res;
}
