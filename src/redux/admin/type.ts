export type RemenueType = {
  date: string;
  total: number;
};
export type InitialStateAdminType = {
  loadingRemenue: boolean;
  remenueData: RemenueType[];
  statisticalData?: StatisticalType;
};
export type StatisticalType = {
  total_products: number;
  total_pending_orders: number;
  total_customers: number;
  total_monthly_revenue: number;
};
