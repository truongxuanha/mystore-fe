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
  remaining_quantity: string;
  website: string;
  img: string;
  screen_size: null;
  ram: null;
  point: number;
  parent_id: null;
  cpu: null;
  content: string;
  hard_disk: null;
  startType: number;
  final_price: number;
  mn_name: string;
  starType: number;
  totalPage: number;
  totalStar: number;
  images: string[];
};
export enum IsListType {
  LIST_NEW = "NEW",
  LIST_HOT = "HOT",
}
