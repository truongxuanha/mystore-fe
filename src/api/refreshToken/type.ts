import { CurrentAccount } from "types";

export interface ResResfreshType {
  status: boolean;
  data: {
    data: RefreshTokenType;
  };
}

export type RefreshTokenType = CurrentAccount["refresh"];
