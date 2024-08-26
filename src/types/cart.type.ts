import { ProductsType } from "./product.type";

export interface CreateCartType {
  id_product?: ProductsType["id_product"];
  quantity?: number;
}

export interface CartState {
  cartItems: ProductsType[];
  loadingCart: boolean;
  error: string | null;
  cartLength: number;
}

export interface UpdateItem {
  id: ProductsType["id"];
  quantity: ProductsType["quantity"];
}
