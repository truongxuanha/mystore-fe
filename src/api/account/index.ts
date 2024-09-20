import { axiosInstance } from "../../utils/axiosConfig";

export async function getAllCustomer() {
  try {
    const res = await axiosInstance.get("account/get-all-customer", {
      params: {
        query: "",
        sex: "all",
        page: 1,
        item: 5,
      },
    });

    return res.data;
  } catch (err) {
    throw err;
  }
}
