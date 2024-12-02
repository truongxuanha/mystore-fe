export interface ResApi<T> {
  status: boolean;
  data: T;
}

export type ResponsePageApi<T> = {
  status: boolean;
  data: T;
  totalPage: number;
  totalItem: number;
};
