import { axiosInstance } from "../../utils/axiosConfig";

export async function getAllCustomer(query = "", sex = "all", page = 1, item = 5) {
  try {
    const res = await axiosInstance.get("account/get-all-customer", {
      params: { query, sex, page, item },
    });

    return res.data;
  } catch (err) {
    console.error("Error fetching customers:", err);
    throw err;
  }
}
