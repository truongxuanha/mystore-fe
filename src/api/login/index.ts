import { axiosInstance } from "../../utils/axiosConfig";
import { InitialLoginState } from "./type";

async function loginUser(initAccount: InitialLoginState) {
  try {
    const res = await axiosInstance.post("account/login", initAccount);

    if (res.status !== 200 || !res.data.status) {
      throw new Error(res.data.data || "Login failed");
    }

    return res.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}

export { loginUser };
