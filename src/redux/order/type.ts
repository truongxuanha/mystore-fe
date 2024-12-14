export type ProductOrderType = {
  id: number;
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

export type ProductInBillType = {
  product_name: string;
  thumbnail: string;
  id_product: number;
  price: number;
  quantity: number;
  discount: number;
  orther_discount: number;
};
export type AddressInBillType = {
  detail_address: string;
  district: string;
  full_name: string;
  id_account: string;
  phone: string;
  province: string;
  wards: string;
};
export type BillDetailType = {
  address: AddressInBillType;
  products: ProductInBillType[];
};
