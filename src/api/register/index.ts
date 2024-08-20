import { axiosInstance } from "../../utils/axiosConfig";
import { InitialRegisterState } from "./type";

async function registerUser(initAccount: InitialRegisterState) {
  try {
    const res = await axiosInstance.post(`account/register`, initAccount);
    return res.data;
  } catch (err) {
    return err;
  }
}

export { registerUser };
