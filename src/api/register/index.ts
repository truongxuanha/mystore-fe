import { axiosInstance } from "../../utils/axiosConfig";
import { InitialRegisterState } from "./type";

async function registerUser(initAccount: InitialRegisterState) {
  try {
    const res = await axiosInstance.post(`account/register`, initAccount);

    if (!res.data.status) throw new Error(res.data.data);
    return res.data;
  } catch (err) {
    throw err;
  }
}

export { registerUser };
