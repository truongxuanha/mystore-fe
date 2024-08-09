export type InputEvent = React.ChangeEvent<HTMLInputElement>;
export type FormEvent = React.FormEvent<HTMLFormElement>;

export type LoadingState = "idle" | "pending" | "succeeded" | "failed";

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
  token: string;
  refresh: string;
}

export interface Account {
  id: string;
  account_name: string;
  permission: number;
  status: number;
  avatar: null;
  type: number;
}

export interface ProductsType {
  id: number;
  name: string;
  id_account: string;
  id_product: number;
  createAt: string;
  updateAt: string;
  quantity: number;
  pd_id: number;
  id_manu: string;
  thumbnail: string;
  product_name: string;
  price: number;
  slug: string;
  discount: number;
  other_discount: number;
  description: string;
  total_quantity: number;
  product_slug: string;
  remaining_quantity: string;
  website: string;
  img: string;
}

export interface IAuthState {
  loading: LoadingState;
  error: string | null;
  isLogin: boolean;
  currentUser: CurrentAccount | null;
  token: string | null;
}
