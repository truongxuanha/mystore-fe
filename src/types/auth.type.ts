export type UserAccount = {
  id: string;
  account_name: string;
  phone_number: number;
  email: string;
  avatar: string;
  full_name: string | null;
  sex: string | number | null;
  birth_day: string;
  permission: number;
  status: number;
  phone: number;
};
export type AddressAccountType = {
  createAt: string;
  detail_address: string;
  district: string;
  full_name: string;
  id: number;
  id_account: string;
  phone: string;
  province: string;
  updateAt: string | null;
  wards: string;
};
export type CurrentAccount = {
  user: UserAccount;
  token: string | null;
  refresh: string;
};

export type IAuthState = {
  loading: boolean;
  error: string | null;
  currentUser: CurrentAccount | null;
  token: string | null;
  infoUser: UserAccount;
  all_customers: UserAccount[];
  all_accounts: UserAccount[];
  totalCustomer: number;
  totalAccount: number;
  addressAcc: AddressAccountType[];
  loadingForpass: boolean;
};

export enum TabType {
  LOGIN = "login",
  REGISTER = "register",
  FORPASSWORD = "forpassword",
}
