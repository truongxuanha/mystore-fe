import { ApiResponseType, ProductsType } from "types";

export interface ResSearchType extends ApiResponseType {
  data: {
    status: boolean;
    data: ProductsType[];
  };
}
