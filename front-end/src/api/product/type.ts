import { ProductsType } from "../../types";

export interface ResProductType {
  data: {
    status: boolean;
    data: ProductsType[];
    totalPage: number;
  };
}

export interface ProductParaType {
  currentPage: number;
  itemsPerPage: number;
}
