import { ProductsType } from "../../types";

export type ResProductType = {
  data: {
    totalItem: number;
    status: boolean;
    data: ProductsType[];
    totalPage: number;
  };
};

export type ProductParaType = {
  currentPage?: number;
  itemsPerPage?: number;
  totalItem?: number;
  sort?: string;
  query?: string;
  manufacturer?: string | number;
};
export type ProductManuType = {
  min?: number;
  max?: number;
  manufacturer?: string;
  currentPage?: number;
  itemsPerPage?: number;
  sort?: number;
};

export type CreateProductType = {
  price: number;
  product_name: string;
  id_manu: number;
  discount: number;
  quantity: number;
  createAt?: string;
  thumbnail?: string;
  description: string;
  other_discount: number;
  callBack?: any;
};
export type EditProductType = {
  product_id: number;
} & CreateProductType;

export type CategoryType = {
  category_id: number;
  name: string;
};
export type ImageProductType = {
  id: number;
  id_product: number;
  path_name: string;
};
