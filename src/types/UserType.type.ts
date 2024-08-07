export interface InitialRegisterState {
  account_name: string;
  phone: number | string;
  email: string;
  password: string;
  permission: number;
  createAt: string;
}

export interface InitialLoginState {
  value: string;
  password: string;
}

export interface UserAccount {
  account_id: string;
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
