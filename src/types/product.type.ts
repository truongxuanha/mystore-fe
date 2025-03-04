export type ProductsType = {
  id: number;
  name: string;
  id_account: string;
  id_product: number;
  product_id: number;
  createAt: string;
  updateAt: string;
  quantity: number;
  pd_id: number;
  id_manu: number;
  thumbnail: string;
  product_name: string;
  price: number;
  slug: string | undefined;
  discount: number;
  other_discount: number;
  description: string;
  total_quantity: number;
  product_slug: string;
  remaining_quantity: number;
  website: string;
  img: string;
  screen_size: null;
  point: number;
  parent_id: null;
  content: string;
  startType: number;
  final_price: number;
  starType: number;
  totalPage: number;
  totalStar: number;
  images: string[];
};
export enum IsListType {
  LIST_NEW = "NEW",
  LIST_HOT = "HOT",
}
