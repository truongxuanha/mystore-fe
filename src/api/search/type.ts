import { ProductsType } from "types";

export interface ResSearchType {
  data: {
    status: boolean;
    data: ProductsType[];
  };
}
