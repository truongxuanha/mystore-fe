export type InitOrder = {
  createAt?: any;
  id_address: number;
};
export type InitOrderDetailBill = {
  id_bill: number;
  id_product?: string;
  quantity?: number;
  id?: number;
};
export type ParamsOrderDetailBill = {
  items: InitOrderDetailBill[];
  type: string;
};
