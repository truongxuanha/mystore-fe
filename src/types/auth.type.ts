export enum AccountTypeEnum {
  EMPLOYEE = "employee",
  CUSTOMER = "customer",
  ADMIN = "admin",
}
export type UserAccount = {
  id?: string;
  account_name: string;
  email: string;
  phone_number?: string;
  full_name?: string | null;
  avatar: string;
  sex?: number;
  birthday: string;
  phone: string;
  permission?: string | number;
  status?: number;
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
export type InfoForPassWordType = {
  token: string;
  email: string;
  status: boolean;
  message: string;
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
  totalPageCustomer: number;
  totalAccount: number;
  addressAcc: AddressAccountType[];
  loadingForpass: boolean;
  dataReqOtp?: {
    message: string;
    status: boolean;
    email: string;
  };
  verifyOtp: {
    message: string;
    status: boolean;
    can_be_reset: boolean;
    token: string;
    email: string;
  } | null;
  infoForPassWord: InfoForPassWordType | object;
  countdown: number;
  loadingChangeProfile: boolean;
  loadingChangePass: boolean;
  loadingGetCustomer: boolean;
  loadingGetAddress: boolean;
};

export enum TabType {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  FORPASSWORD = "FORPASSWORD",
  SENDOTP = "SENDOTP",
  CHANGEPASSWORD = "CHANGEPASSWORD",
}

export enum StatusAccountEnum {}
