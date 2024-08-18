import { ApiResponseType, ProductsType } from "types";

export interface ResProductType extends ApiResponseType {
  data: {
    status: boolean;
    data: ProductsType[];
    totalPage: number;
  };
}
