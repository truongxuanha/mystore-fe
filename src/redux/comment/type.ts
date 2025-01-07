export type CommentProductType = {
  item?: number;
  page?: number;
  sort?: string;
  star?: string | number;
  createAt?: string;
  product_id: number;
};
export type CreateCommentType = {
  content: string;
  star?: string | number;
  createAt?: any;
  id_product: number;
  parent_id?: number;
};
