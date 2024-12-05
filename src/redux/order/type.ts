export type ProductOrderType = {
  id_product: string | number;
  thumbnail: string;
  product_name: string;
  quantity: number;
  price: number;
  discount: number;
};
export type OrderPayloadType = {
  data: ProductOrderType[];
  typeOrder: OrderTypeEnum;
};
export enum OrderTypeEnum {
  BUYNOW = "buy-now",
  BUYFROMCART = "buy-from-cart",
}
