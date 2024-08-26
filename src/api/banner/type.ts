import { ResApi } from "types/api.type";

export interface BannerType {
  id: number;
  image: string;
  path: string;
  createAt: string;
  updateAt: string | null;
}

export type BannerResponseData = BannerType[];

export type ApiResponse = ResApi<BannerResponseData>;
