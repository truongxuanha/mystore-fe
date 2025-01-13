export type BannerType = {
  id: number;
  image: string;
  path: string;
  createAt: string;
  updateAt: string | null;
};
export type SalePopupType = {
  popup_id: number;
  popup_img: string;
  url_transit: string;
};
export type SalePopupReduxType = {
  popup_img: any;
  url_transit?: string;
};
