import { ProductsType } from "./product.type";

export type CreateCartType = {
  product_id?: ProductsType["id_product"];
  quantity?: number;
};

export type CartState = {
  cartItems: ProductsType[];
  loadingCart: boolean;
  error: string | null;
  cartLength: number;
};

export type UpdateItem = {
  id: ProductsType["id"];
  quantity: ProductsType["quantity"];
};
