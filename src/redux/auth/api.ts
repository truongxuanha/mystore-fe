import { axiosInstance } from "../../utils/axiosConfig";
import { AddressType, CustomerParamsType, ForPassword, InitialLoginState, InitialRegisterState, RefreshTokenType, ResResfreshType } from "./type";

export async function registerUser(initAccount: InitialRegisterState) {
  try {
    const res = await axiosInstance.post(`account/register`, initAccount);

    if (!res.data.status) throw new Error(res.data.data);
    return res.data;
  } catch (err) {
    throw err;
  }
}
export async function loginUser(initAccount: InitialLoginState) {
  try {
    const res = await axiosInstance.post("account/login", initAccount);

    if (res.status !== 200 || !res.data.status) {
      throw new Error(res.data.data || "Login failed");
    }

    return res.data;
  } catch (error) {
    throw error;
  }
}
export async function getAllAccount({ ...params }: CustomerParamsType) {
  const { query = "", sex = "", page = 1, item = 5, permission = "all" } = params;
  try {
    const res = await axiosInstance.get("account/get-all", {
      params: { query, sex, page, item, permission },
    });

    return res.data;
  } catch (err) {
    throw err;
  }
}
export async function refreshToken(refresh: RefreshTokenType) {
  try {
    const res: ResResfreshType = await axiosInstance.post("account/refresh", {
      refresh: refresh,
    });

    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getAllCustomer({ ...params }: CustomerParamsType) {
  const { query = "", sex = "", page = 1, item = 5 } = params;
  try {
    const res = await axiosInstance.get("account/get-all-customer", {
      params: { query, sex, page, item },
    });

    return res.data;
  } catch (err) {
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
export async function getInfo() {
  try {
    const res = await axiosInstance.get("account/info");

    return res.data.data[0];
  } catch (err) {
    throw err;
  }
}

export async function forPassword(email: ForPassword) {
  try {
    const res = await axiosInstance.post("/account/forgot-password", email, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.data.data;
  } catch (err) {
    throw new Error("Error creating address");
  }
}
