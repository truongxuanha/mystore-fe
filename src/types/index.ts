export type InputEvent = React.ChangeEvent<HTMLInputElement>;
export type FormEvent = React.FormEvent<HTMLFormElement>;

export type LoadingState = "idle" | "pending" | "succeeded" | "failed";

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
export interface InputProps {
  placeholder: string;
  typeInput: string;
  valueBtn: string;
  className: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
  user: {
    id: string;
    account_name: string;
    permission: number;
    status: number;
    avatar: null;
    type: number;
  };
  token: string | null;
  refresh: string;
}

export interface ProductsType {
  id: number | string;
  name: string;
  id_account: string;
  id_product: number | string;
  product_id: number | string;
  createAt: string;
  updateAt: string;
  quantity: number;
  pd_id: number;
  id_manu: number;
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
  totalStar: number;
  screen_size: null;
  ram: null;
  point: number;
  parent_id: null;
  cpu: null;
  content: string;
  hard_disk: null;
  startType: number;
  final_price: number;
  mn_name: string;
  starType: number;
  totalPage: number;
}

export interface IAuthState {
  loading: boolean;
  error: string | null;
  isLogin: boolean;
  currentUser: Account | null;
  token: string | null;
}

export interface CreateCartType {
  token: string;
  id_product?: string | number;
  quantity?: number;
}

export interface CartState {
  cartItems: ProductsType[];
  loadingCart: boolean;
  error: string | null;
}

export interface InitialTokenRefresh {
  refresh: string;
}
