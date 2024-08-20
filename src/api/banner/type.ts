// export interface BannerType {
//   id: number;
//   image: string;
//   path: string;
//   createAt: string;
//   updateAt: string | null;
// }

// interface BannerResponseData {
//   status: boolean;
//   data: BannerType[];
// }

// export interface ResponseBanner {
//   data: BannerResponseData;
// }

export interface ApiResponse<T> {
  status: boolean;
  data: T;
}

export interface BannerType {
  id: number;
  image: string;
  path: string;
  createAt: string;
  updateAt: string | null;
}

export type BannerResponseData = BannerType[];

export type ResponseBanner = ApiResponse<BannerResponseData>;
