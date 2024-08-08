import { Bounce, toast } from "react-toastify";

const toastifySuccess = function (txt: string) {
  return toast.success(txt, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};
const toastifyWarning = function (txt: string) {
  return toast.warning(txt, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};
export { toastifySuccess, toastifyWarning };
