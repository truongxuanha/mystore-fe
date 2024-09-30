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
  manufacturer: string;
}
