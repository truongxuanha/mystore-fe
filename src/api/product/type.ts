import { ProductsType } from "../../types";

export interface ResProductType {
  data: {
    totalItem: number;
    status: boolean;
    data: ProductsType[];
    totalPage: number;
  };
}

export interface ProductParaType {
  currentPage?: number;
  itemsPerPage?: number;
  totalItem?: number;
  sort?: string;
  manufacturer?: string | number;
}
export interface ProductManuType {
  min?: number;
  max?: number;
  manufacturer?: string;
  currentPage?: number;
  itemsPerPage?: number;
  sort?: number;
}
