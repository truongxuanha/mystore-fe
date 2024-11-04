export interface UserAccount {
  id: string;
  account_name: string;
  phone_number: number;
  email: string;
  avatar: string | undefined;
  full_name: string | null;
  sex: string | number | null;
  birth_day: string;
  permission: number;
  status: number;
  phone: number;
}
export interface AddressAccountType {
  createAt: string;
  detail_address: string;
  district: string;
  full_name: string;
  id: 37;
  id_account: string;
  phone: string;
  province: string;
  updateAt: string | null;
  wards: string;
}
export interface CurrentAccount {
  user: UserAccount;
  token: string | null;
  refresh: string;
}

export interface IAuthState {
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
}
