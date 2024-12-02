export type BillType = {
  id: number;
  id_account: string;
  account_name: string;
  email: string;
  phone: string;
  createAt: string;
  confirmAt: string | null;
  paymentAt: string | null;
  cancellationAt: string | null;
  note_cancelation: string | null;
  discount: number;
  status: number;
  key: number;
};
export type ParamsGetAllBill = {
  query?: string;
  status?: string | number;
  page?: number;
  item?: number;
};

export type ResBillType = {
  data: BillType[];
  totalPage: number;
  totalItem: number;
  status: boolean;
};
