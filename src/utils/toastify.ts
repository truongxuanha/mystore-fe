import {
  Bounce,
  Flip,
  Slide,
  Zoom,
  toast,
  ToastPosition,
} from "react-toastify";

type ToastTransitionType =
  | typeof Bounce
  | typeof Flip
  | typeof Slide
  | typeof Zoom;

const toastOptions = {
  position: "top-right" as ToastPosition,
  autoClose: 2000,
  hideProgressBar: true,
  pauseOnHover: false,
  closeOnClick: true,
  progress: undefined,
  theme: "light",
  transition: Bounce as ToastTransitionType,
};

const toastifySuccess = function (txt: string | null) {
  return toast.success(txt, toastOptions);
};

const toastifyWarning = function (txt: string | null) {
  return toast.warning(txt, toastOptions);
};

export { toastifySuccess, toastifyWarning };
