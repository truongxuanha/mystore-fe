const INTERVAL_DURATION = 3000;
const SPECIAL_CHARACTERS_REGEX = /[!@#$%^&*(),.?":{}|<>]/;
const UPPERCASE_LETTER_REGEX = /[A-Z]/;
const PHONE_REGEX = /^[0-9]{10}$/;
const TOTAL_ITEM_PRODUCT = 8;
export const ITEM_IN_PAGE = 20;
const PAGE = {
  HOME: "/",
  PRODUCT: "/product",
  ORDER: "/order",
};
const REGEX = {
  PASSWORD: /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*(),.?":{}|<>~`[\]\\\\;'/+=_－＠]).+$/,
  ONLY_NUMBER: /^[0-9]*$/,
  CLEAR_SLASH: /\//g,
  PHONE: /^0\d{7,10}$/,
  EMAIL: /^([A-Za-z0-9+_-]+)(\.[A-Za-z0-9+_-]+)*@[A-Za-z0-9][A-Za-z0-9\-.]+(?:\.[A-Za-z0-9-]+)*[A-Za-z0-9]$/,
  IS_URL: /^(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=,\[\]]*)|\s)$/,
  YOUTUBE: /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))((\w|-){11})(?:\S+)?$/,
  CHECK_URL: "https?://\\S+",
  CHECK_SPECIAL_CHARACTERS: /^[a-zA-Z0-9]*$/,
  FIND_ALL_URL: /(https?:\/\/\S+)/g,
  IS_LATIN: /^[a-zA-Z0-9\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]+$/,
};
const CODE_FILE_TOO_LARGE = "file-too-large";
const CODE_FILE_INVALID_TYPE = "file-invalid-type";

const MAX_SIZE = 10;
export {
  PHONE_REGEX,
  INTERVAL_DURATION,
  SPECIAL_CHARACTERS_REGEX,
  UPPERCASE_LETTER_REGEX,
  TOTAL_ITEM_PRODUCT,
  PAGE,
  REGEX,
  CODE_FILE_TOO_LARGE,
  CODE_FILE_INVALID_TYPE,
  MAX_SIZE,
};
