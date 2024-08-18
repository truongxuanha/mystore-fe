import { CurrentAccount } from "types";

export interface ResResfreshType {
  status: boolean;
  data: CurrentAccount["refresh"];
}
