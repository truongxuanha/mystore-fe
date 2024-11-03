export interface AddressType {
  createAt: string;
  detail_address: string;
  district: string;
  full_name: string;
  phone: string;
  province: string;
  wards: string;
}
interface District {
  code: number | string;
  name: string;
}

export interface AddressStateType {
  createAt: string;
  detail_address: string;
  district: District;
  full_name: string;
  phone: string;
  province: District;
  wards: District;
}

export type CustomerParamsType = {
  query?: string;
  sex?: string;
  page?: number;
  item?: number;
};
