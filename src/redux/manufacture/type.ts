export type ManufactureType = {
  id: number;
  img: string;
  name: string;
  slug: string;
};
export type ResMunufacture = {
  data: ManufactureType[];
  status: boolean;
};
