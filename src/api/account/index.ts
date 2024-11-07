import { axiosInstance } from "../../utils/axiosConfig";
import { AddressType, CustomerParamsType } from "./type";

export async function getAllAccount({ ...params }: CustomerParamsType) {
  const { query = "", sex = "", page = 1, item = 10, permission = "all" } = params;
  try {
    const res = await axiosInstance.get("account/get-all", {
      params: { query, sex, page, item, permission },
    });

    return res.data;
  } catch (err) {
    console.error("Error fetching customers:", err);
    throw err;
  }
}
export async function getAllCustomer({ ...params }: CustomerParamsType) {
  const { query = "", sex = "", page = 1, item = 10 } = params;
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
  } catch (err) {
    throw new Error("Error creating address");
  }
}

export async function getInfoUser(id: string) {
  try {
    const res = await axiosInstance.get(`/address/${id}/get-by-account`);
    return res.data.data;
  } catch (err) {
    return err;
  }
}
