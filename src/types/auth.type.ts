export interface InitialRegisterState {
  account_name: string;
  phone: string;
  email: string;
  password: string;
}

export interface InitialLoginState {
  value: string;
  password: string;
}

export interface UserAccount {
  id: string;
  account_name: string;
  phone_number: number;
  email: string;
  avatar: string | null;
  full_name: string | null;
  sex: string | null;
  birth_day: string;
  permission: number;
  status: number;
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
}
