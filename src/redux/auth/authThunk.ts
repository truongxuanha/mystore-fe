import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  changePasswordApi,
  changeProfileApi,
  createAddressUser,
  forPassword,
  getAddressUserApi,
  getAllAccount,
  getAllCustomer,
  getInfo,
  loginUser,
  registerUser,
  removeAccountApi,
  resetPassword,
  updateAccountApi,
  verifyOtpApi,
} from "./api";
import { AddressType, CustomerParamsType, InitialLoginState, InitialRegisterState } from "./type";
import { toastifySuccess, toastifyWarning } from "utils/toastify";
import { UserAccount } from "types";
import { texts } from "libs/contains/texts";
import { CallBackType } from "types/redux.type";

export const authRegister = createAsyncThunk("auth/authRegister", async (payload: InitialRegisterState & CallBackType, { rejectWithValue }) => {
  try {
    const data = await registerUser(payload);
    payload.callBack();
    return data;
  } catch (error) {
    let errorMessage = "";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    toastifyWarning(errorMessage);
    return rejectWithValue(errorMessage);
  }
});
export const updateUserThunk = createAsyncThunk("auth/authUpdateUser", async (payload: InitialRegisterState & CallBackType, { rejectWithValue }) => {
  try {
    const data = await updateAccountApi(payload);
    toastifySuccess(texts.errors.EDIT_ACCOUNT_SUCCESS);
    payload.callBack();
    return data;
  } catch (error) {
    let errorMessage = "";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    toastifySuccess(texts.errors.EDIT_ACCOUNT_FAILED);
    return rejectWithValue(errorMessage);
  }
});
export const removeUserThunk = createAsyncThunk("auth/authRemoveUser", async ({ id, callBack }: { id: string } & CallBackType, { rejectWithValue }) => {
  try {
    const data = await removeAccountApi(id);
    callBack();
    return data;
  } catch (error) {
    let errorMessage = "";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return rejectWithValue(errorMessage);
  }
});

export const authUpdate = createAsyncThunk("auth/authUpdate", async (initAccount: InitialRegisterState, { rejectWithValue }) => {
  try {
    const data = await registerUser(initAccount);
    return data;
  } catch (error) {
    let errorMessage = "";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return rejectWithValue(errorMessage);
  }
});
export const authDelete = createAsyncThunk("auth/authDelete", async (initAccount: InitialRegisterState, { rejectWithValue }) => {
  try {
    const data = await registerUser(initAccount);
    if (data.status) {
      return data;
    }
  } catch (error) {
    let errorMessage = "";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return rejectWithValue(errorMessage);
  }
});
export const authLogin = createAsyncThunk("auth/authLogin", async (initAccount: InitialLoginState, { rejectWithValue }) => {
  try {
    const data = await loginUser(initAccount);

    localStorage.setItem("access_token", data.data.token);
    localStorage.setItem("currentUser", JSON.stringify(data.data));
    return data;
  } catch (error) {
    let errorMessage = "";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return rejectWithValue(errorMessage);
  }
});

export const authProfle = createAsyncThunk("auth/profile", async (_, { rejectWithValue }) => {
  try {
    const data = await getInfo();

    return data;
  } catch (error) {
    let errorMessage = "";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return rejectWithValue(errorMessage);
  }
});

export const authGetAllAccount = createAsyncThunk("auth/getAllAccount", async ({ ...params }: CustomerParamsType, { rejectWithValue }) => {
  try {
    const data = await getAllAccount({ ...params });

    return data;
  } catch (errer) {
    rejectWithValue(errer);
  }
});
export const authCustomer = createAsyncThunk("auth/customer", async ({ ...params }: CustomerParamsType, { rejectWithValue }) => {
  try {
    const data = await getAllCustomer({ ...params });

    return data;
  } catch (errer) {
    rejectWithValue(errer);
  }
});
export const authGetAddressAcc = createAsyncThunk("auth/getAddressAcc", async (_, { rejectWithValue }) => {
  try {
    const data = await getAddressUserApi();
    return data;
  } catch (errer) {
    rejectWithValue(errer);
  }
});

export const authCreateAddressThunk = createAsyncThunk("auth/createAddress", async (address: AddressType, { rejectWithValue }) => {
  try {
    const data = await createAddressUser(address);
    toastifySuccess("Thêm địa chỉ thành công!");
    return data;
  } catch (errer) {
    rejectWithValue(errer);
  }
});

// export const authGetInfoUser = createAsyncThunk("auth/inforUser", async (_, { rejectWithValue }) => {
//   try {
//     const data = await getInfoUser();

//     return data;
//   } catch (error) {
//     let errorMessage = "";
//     if (error instanceof Error) {
//       errorMessage = error.message;
//     }
//     return rejectWithValue(errorMessage);
//   }
// });

export const authForPasswordThunk = createAsyncThunk("auth/forPassword", async ({ email, callBack }: { email: any } & CallBackType, { rejectWithValue }) => {
  try {
    const data = await forPassword(email);
    toastifySuccess(data.message);
    callBack();
    return data;
  } catch (errer) {
    rejectWithValue(errer);
  }
});
export const authVerifyOtpThunk = createAsyncThunk(
  "auth/verifyOtp",
  async ({ email, otp, callBack }: { email: string; otp: number } & CallBackType, { rejectWithValue }) => {
    try {
      const data = await verifyOtpApi(email, otp);
      callBack();
      return data;
    } catch (errer) {
      rejectWithValue(errer);
    }
  },
);
export const authResetPasswordThunk = createAsyncThunk(
  "auth/resetPassword",
  async ({ password, token, email }: { password: string; token?: string; email?: string }, { rejectWithValue }) => {
    try {
      const data = await resetPassword(password, token, email);
      return data;
    } catch (errer) {
      rejectWithValue(errer);
    }
  },
);

export const authChangeProfileThunk = createAsyncThunk(
  "auth/changeProfile",
  async ({ account_name, email, phone, full_name, avatar, sex, birthday, callBack }: UserAccount & CallBackType, { rejectWithValue }) => {
    try {
      const data = await changeProfileApi({ account_name, email, phone, full_name, avatar, sex, birthday });
      toastifySuccess("Cập nhật tài khoản thành công!");
      callBack();
      return data;
    } catch (errer) {
      toastifyWarning("Dã có lỗi xảy ra vui lòng thử lại!");
      rejectWithValue(errer);
    }
  },
);

export const authChangePassThunk = createAsyncThunk("auth/changePassword", async ({ password, newpass }: any, { rejectWithValue }) => {
  try {
    const data = await changePasswordApi({ password, newpass });
    toastifySuccess("Đổi mật khẩu thành công!");
    return data;
  } catch (errer: any) {
    toastifyWarning(errer.message as string);
    rejectWithValue(errer);
  }
});
