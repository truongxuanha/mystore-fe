export type InitOrder = {
  createAt?: any;
  id_address: number;
  total_amount_order: number;
};
export type InitOrderDetailBill = {
  billData: {
    createAt?: any;
    id_address: number;
    total_amount_order: number;
    status: number;
  };
  detailData: [
    {
      id_product?: string;
      quantity?: number;
      id?: number;
    },
  ];
};
export type ParamsOrderDetailBill = {
  items: InitOrderDetailBill[];
  type: string;
};
