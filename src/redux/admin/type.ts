export type RemenueType = {
  date: string;
  total: number;
};
export type InitialStateAdminType = {
  loadingRemenue: boolean;
  remenueData: RemenueType[];
  statisticalData?: StatisticalType;
  loadingBanner: boolean;
  loadingCustomer: boolean;
};
export type StatisticalType = {
  total_products: number;
  total_pending_orders: number;
  total_customers: number;
  total_monthly_revenue: number;
};
export type BannerCreateType = {
  image: any;
  path?: string;
  createAt?: any;
  callBack?: any;
};
export type DetailsImportType = {
  id_product: number;
  quantity: number;
  unit_price: number;
  provider_id: number | null;
};
export type CreateImportType = {
  total_cost: number;
  note: string;
  details: DetailsImportType[];
};
