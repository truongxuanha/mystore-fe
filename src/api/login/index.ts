import { axiosInstance } from "../../utils/axiosConfig";
import { InitialLoginState } from "./type";

async function loginUser(initAccount: InitialLoginState) {
  try {
    const res = await axiosInstance.post("account/login", initAccount);

    if (!res.data.status) {
      throw new Error(res.data.data);
    }
    return res.data;
  } catch (error) {
    throw error;
  }
}

export { loginUser };
