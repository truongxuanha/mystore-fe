import { axiosInstance } from "../../utils/axiosConfig";
import { InitialLoginState } from "./type";

async function loginUser(initAccount: InitialLoginState) {
  const res = await axiosInstance.post(`account/login`, initAccount);

  if (!res.data.status) {
    throw new Error(`${res.data.data}`);
  }
  return res.data;
}

export { loginUser };
