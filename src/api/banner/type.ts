import { ApiResponseType } from "types";

export interface BannerType {
  id: number;
  image: string;
  path: string;
  createAt: string;
  updateAt: string | null;
}

interface BannerResponseData {
  status: boolean;
  data: BannerType[];
}

export interface ResponseBanner extends ApiResponseType {
  data: BannerResponseData;
}
