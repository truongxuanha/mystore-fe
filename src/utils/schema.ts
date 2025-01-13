import { PHONE_REGEX, SPECIAL_CHARACTERS_REGEX, UPPERCASE_LETTER_REGEX } from "libs/contains";
import * as yup from "yup";
const schemaRegister = yup.object().shape({
  account_name: yup.string().required("Vui lòng nhập tên tài khoản.").min(3, "Tên tài khoản phải có ít nhất 3 ký tự."),
  full_name: yup.string().required("Vui lòng nhập họ và tên.").min(3, "Tên phải có ít nhất 3 ký tự."),
  email: yup.string().email("Email không hợp lệ.").required("Vui lòng nhập email."),
  password: yup
    .string()
    .required("Vui lòng nhập mật khẩu.")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự.")
    .matches(UPPERCASE_LETTER_REGEX, "Mật khẩu phải có ít nhất một chữ hoa.")
    .matches(SPECIAL_CHARACTERS_REGEX, "Mật khẩu phải có ít nhất một ký tự đặc biệt."),
  phone: yup.string().required("Vui lòng nhập số điện thoại.").matches(PHONE_REGEX, "Số điện thoại phải có 10 chữ số."),

  birthday: yup
    .date()
    .required("Vui lòng nhập ngày sinh.")
    .max(new Date(), "Ngày sinh không thể là ngày trong tương lai.")
    .test("age", "Bạn phải ít nhất 18 tuổi.", (value) => {
      if (!value) return false;
      const age = new Date().getFullYear() - new Date(value).getFullYear();
      return age >= 18;
    }),
  sex: yup.number().oneOf([0, 1]),
  permission: yup.number().oneOf([0, 2]),
  status: yup.number().oneOf([0, 1]),
});

const schemaLogin = yup.object().shape({
  value: yup.string().required("Vui lòng nhập tên đăng nhập, email hoặc số điện thoại."),
  password: yup.string().required("Vui lòng nhập mật khẩu.").min(6, "Mật khẩu phải có ít nhất 6 ký tự."),
});

const schemaProduct = yup.object().shape({
  product_name: yup.string().required("Tên sản phẩm là bắt buộc").min(3, "Tên sản phẩm phải có ít nhất 3 ký tự"),
  id_manu: yup.string().required("Nhà cung cấp là bắt buộc"),
  price: yup.number().required("Giá là bắt buộc").positive("Giá phải là một số dương").typeError("Giá phải là một số"),
  quantity: yup
    .number()
    .required("Số lượng nhập là bắt buộc")
    .integer("Số lượng phải là một số nguyên")
    .positive("Số lượng phải lớn hơn 0")
    .typeError("Số lượng phải là một số"),
  thumbnail: yup.mixed().nullable(),
  discount: yup.number().nullable().typeError("Chiết khấu phải là một số").min(0, "Chiết khấu khác phải lớn hơn hoặc bằng 0"),
  other_discount: yup.number().nullable().typeError("Chiết khấu khác phải là một số").min(0, "Chiết khấu khác phải lớn hơn hoặc bằng 0"),
  description: yup.string().nullable().min(10, "Mô tả sản phẩm phải có ít nhất 10 ký tự"),
});

const schemaRegisterUser = yup.object().shape({
  account_name: yup.string().required("Vui lòng nhập tên tài khoản.").min(3, "Tên tài khoản phải có ít nhất 3 ký tự."),
  email: yup.string().email("Email không hợp lệ.").required("Vui lòng nhập email."),
  password: yup
    .string()
    .required("Vui lòng nhập mật khẩu.")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự.")
    .matches(UPPERCASE_LETTER_REGEX, "Mật khẩu phải có ít nhất một chữ hoa.")
    .matches(SPECIAL_CHARACTERS_REGEX, "Mật khẩu phải có ít nhất một ký tự đặc biệt."),
  phone: yup.string().required("Vui lòng nhập số điện thoại.").matches(PHONE_REGEX, "Số điện thoại phải có 10 chữ số."),
  confirm_password: yup
    .string()
    .required("Vui lòng nhập lại mật khẩu.")
    .oneOf([yup.ref("password"), ""], "Mật khẩu xác nhận không khớp."),
});

const schemaForpassEmail = yup.object().shape({
  email: yup.string().email("Email không hợp lệ.").required("Vui lòng nhập email."),
});
const schemaOtp = yup.object().shape({
  otp: yup
    .number()
    .transform((value, originalValue) => (originalValue ? Number(originalValue) : undefined))
    .typeError("OTP phải là một số.")
    .required("Vui lòng nhập mã OTP."),
});

const schemaResetPassword = yup.object().shape({
  password: yup.string().required("Vui lòng nhập mật khẩu.").min(6, "Mật khẩu phải có ít nhất 6 ký tự."),
  confirm_password: yup
    .string()
    .required("Vui lòng nhập lại mật khẩu.")
    .oneOf([yup.ref("password"), ""], "Mật khẩu xác nhận không khớp."),
});

export const schemaChangeProfile = yup.object().shape({
  account_name: yup.string().min(3, "Tên tài khoản phải có ít nhất 3 ký tự.").nullable(),
  full_name: yup.string(),
  email: yup.string().required("Email không được bỏ trống").email("Email không hợp lệ."),
  phone: yup.string().matches(PHONE_REGEX, "Số điện thoại phải có 10 chữ số.").nullable(),
  birthday: yup
    .date()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .nullable()
    .max(new Date(), "Ngày sinh không thể là ngày trong tương lai.")
    .test("age", "Bạn phải ít nhất 18 tuổi.", (value) => {
      if (!value) return true;
      const age = new Date().getFullYear() - new Date(value).getFullYear();
      return age >= 18;
    }),
  sex: yup
    .number()
    .transform((value, originalValue) => (originalValue === "" ? null : Number(originalValue)))
    .nullable()
    .oneOf([0, 1, 3], "Giới tính không hợp lệ."),
});

const schemaChangePassword = yup.object().shape({
  password: yup.string().required("Vui lòng nhập mật khẩu.").min(6, "Mật khẩu phải có ít nhất 6 ký tự."),
  newpass: yup
    .string()
    .required("Vui lòng nhập mật khẩu.")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự.")
    .notOneOf([yup.ref("password")], "Mật khẩu mới phải khác mật khẩu cũ."),
  confirm_password: yup
    .string()
    .required("Vui lòng nhập lại mật khẩu.")
    .oneOf([yup.ref("newpass"), ""], "Mật khẩu xác nhận không khớp."),
});

const schemaCreateBanner = yup.object().shape({
  path: yup.string(),
});
const schemaCreatePopup = yup.object().shape({
  url_transit: yup.string().required("Vui lòng nhập đường dẫn"),
});
const schemaUserAdmin = yup.object().shape({
  id: yup.string(),
  account_name: yup.string().required("Vui lòng nhập tên tài khoản.").min(3, "Tên tài khoản phải có ít nhất 3 ký tự."),
  full_name: yup.string(),
  email: yup.string().email("Email không hợp lệ.").required("Vui lòng nhập email."),
  password: yup
    .string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự.")
    .matches(UPPERCASE_LETTER_REGEX, "Mật khẩu phải có ít nhất một chữ hoa.")
    .matches(SPECIAL_CHARACTERS_REGEX, "Mật khẩu phải có ít nhất một ký tự đặc biệt."),
  phone: yup.string().required("Vui lòng nhập số điện thoại.").matches(PHONE_REGEX, "Số điện thoại phải có 10 chữ số."),
  birthday: yup
    .date()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .max(new Date(), "Ngày sinh không thể là ngày trong tương lai."),
  createAt: yup
    .date()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .max(new Date(), "Ngày sinh không thể là ngày trong tương lai."),
  sex: yup.number().oneOf([0, 1]),
  permission: yup.number().oneOf([1, 2]),
  status: yup.number().oneOf([0, 1]),
});
const schemaAddAdmin = yup.object().shape({
  id: yup.string(),
  account_name: yup.string().required("Vui lòng nhập tên tài khoản.").min(3, "Tên tài khoản phải có ít nhất 3 ký tự."),
  full_name: yup.string().nullable(),
  email: yup.string().email("Email không hợp lệ.").required("Vui lòng nhập email."),
  password: yup
    .string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự.")
    .matches(UPPERCASE_LETTER_REGEX, "Mật khẩu phải có ít nhất một chữ hoa.")
    .matches(SPECIAL_CHARACTERS_REGEX, "Mật khẩu phải có ít nhất một ký tự đặc biệt."),
  phone: yup.string().required("Vui lòng nhập số điện thoại.").matches(PHONE_REGEX, "Số điện thoại phải có 10 chữ số."),
  birthday: yup
    .date()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .max(new Date(), "Ngày sinh không thể là ngày trong tương lai."),
  sex: yup.number().oneOf([0, 1]),
  permission: yup.number().oneOf([1, 2]),
  status: yup.number().oneOf([0, 1]),
});

const schemaProvider = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên nhà cung cấp.").min(3, "Tên nhà cung cấp phải có ít nhất 3 ký tự."),
  phone: yup.string().required("Vui lòng nhập số điện thoại.").matches(PHONE_REGEX, "Số điện thoại phải có 10 chữ số."),
  website: yup
    .string()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .url("Website phải là một liên kết URL hợp lệ."),
});
const schemaCustomer = yup.object().shape({
  id: yup.string(),
  account_name: yup.string().min(3, "Tên tài khoản phải có ít nhất 3 ký tự."),
  full_name: yup
    .string()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value)),
  email: yup.string().email("Email không hợp lệ.").required("Vui lòng nhập email."),
  phone: yup.string().matches(PHONE_REGEX, "Số điện thoại phải có 10 chữ số."),
  birthday: yup
    .date()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .max(new Date(), "Ngày sinh không thể là ngày trong tương lai."),
  createAt: yup
    .date()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .max(new Date(), "Ngày tạo không thể là ngày trong tương lai."),
  sex: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .oneOf([0, 1, null]),
  status: yup.number().oneOf([0, 1]),
});
const schemaCmt = yup.object().shape({
  content: yup.string().min(3, "Đánh giá ít nhất 5 ký tự."),
});
export {
  schemaRegister,
  schemaCreateBanner,
  schemaLogin,
  schemaProduct,
  schemaRegisterUser,
  schemaForpassEmail,
  schemaOtp,
  schemaChangePassword,
  schemaResetPassword,
  schemaUserAdmin,
  schemaAddAdmin,
  schemaProvider,
  schemaCustomer,
  schemaCmt,
  schemaCreatePopup,
};
