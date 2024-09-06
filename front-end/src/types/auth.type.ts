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
  phone: number;
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
}
