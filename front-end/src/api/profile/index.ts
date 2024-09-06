import { axiosInstance } from "../../utils/axiosConfig";

export async function getInfo() {
  try {
    const res = await axiosInstance.get("account/info");

    return res.data.data[0];
  } catch (err) {
    throw err;
  }
}
