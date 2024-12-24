export type ManufactureType = {
  id: number;
  img: string;
  name: string;
  slug: string;
  phone: number;
  website: string;
};
export type ResMunufacture = {
  data: ManufactureType[];
  status: boolean;
};

export type ParamsManuApiType = {
  query: string;
  item: number;
  page: number;
};

export type ResAllMunufacture = {
  data: ManufactureType[];
  totalPage: number;
  totalItem: number;
  status: boolean;
};
export type ProviderType = {
  name: string;
  phone: string;
  website?: string;
  img: any;
};
