import { UserAccount } from "types";
import { axiosInstance } from "../../utils/axiosConfig";
import { AddressType, CustomerParamsType, ForPassword, InitialLoginState, InitialRegisterState, RefreshTokenType, ResResfreshType } from "./type";
import dayjs from "dayjs";

export async function registerUser(initAccount: InitialRegisterState) {
  try {
    const res = await axiosInstance.post(`account/register`, { ...initAccount, createAt: dayjs() });

    if (!res.data.status) throw new Error(res.data.data);
    return res.data;
  } catch (err) {
    throw err;
  }
}
export async function updateAccountApi(initAccount: InitialRegisterState) {
  try {
    const res = await axiosInstance.put(`account/${initAccount.id}/update-by-id`, initAccount);

    if (!res.data.status) throw new Error(res.data.data);
    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function removeAccountApi(id: string) {
  try {
    const res = await axiosInstance.delete(`account/${id}/remove`);

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
    if (!res.data.status) throw new Error("Có lỗi xảy ra");
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
    if (!res.data.status) throw new Error("Có lỗi xảy ra");

    return res.data;
  } catch (err) {
    throw err;
  }
}
export async function getAddressUserApi() {
  try {
    const res = await axiosInstance.get("/address/address-by-user");
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
    const res = await axiosInstance.post("/account/send-otp", email, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (err) {
    throw new Error("Error creating address");
  }
}
export async function verifyOtpApi(email: string, otp: number) {
  try {
    const res = await axiosInstance.post(
      "/account/verify-otp",
      { email, otp },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return res.data;
  } catch (err) {
    throw new Error("Error creating address");
  }
}
// reset-password

export async function resetPassword(password: string, token?: string, email?: string) {
  try {
    const res = await axiosInstance.post(
      "/account/reset-password",
      { password, email },
      {
        headers: {
          "Content-Type": "application/json",
          token,
        },
      },
    );
    if (!res.data.status) {
      throw new Error("Đã có lỗi xảy ra vui lòng thử lại!");
    }
    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function changeProfileApi({ account_name, email, phone, full_name, avatar, sex, birthday }: UserAccount) {
  try {
    const res = await axiosInstance.put("/account/update", { account_name, email, phone, full_name, avatar, sex, birthday });
    if (!res.data.status) {
      throw new Error("Đã có lỗi xảy ra vui lòng thử lại!");
    }
    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function changePasswordApi({ password, newpass, createAt = dayjs() }: any) {
  try {
    const res = await axiosInstance.patch("/account/change-pass", { password, newpass, createAt });
    if (!res.data.status) {
      throw new Error(res.data.data);
    }
    return res.data.data;
  } catch (err) {
    throw err;
  }
}
