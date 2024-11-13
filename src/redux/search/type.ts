import { ProductsType } from "types";

export type ResSearchType = {
  data: {
    status: boolean;
    data: ProductsType[];
  };
};
