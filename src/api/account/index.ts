import dayjs from "dayjs";
import { axiosInstance } from "../../utils/axiosConfig";
import { AddressType } from "./type";

export async function getAllCustomer(
  query = "",
  sex = "all",
  page = 1,
  item = 5
) {
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

export async function getAddressUser() {
  try {
    const res = await axiosInstance.get("/address/get-by-account");
    return res.data.data;
  } catch (err) {
    return err;
  }
}

export async function createAddressUser(address: AddressType) {
  try {
    const addressData: AddressType = {
      ...address,
    };

    const res = await axiosInstance.post("/address/create", addressData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.data.data;
  } catch (err: any) {
    console.error(
      "Error creating address:",
      err.response ? err.response.data : err.message
    );
    throw new Error("Error creating address");
  }
}
