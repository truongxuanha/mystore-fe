import { Button, Input } from "@headlessui/react";
import { ArrowLeftIcon, UserIcon } from "@heroicons/react/24/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import { useForm } from "react-hook-form";
import { authForPasswordThunk, authVerifyOtpThunk } from "redux/auth/authThunk";
import { TabType } from "types";
import { schemaOtp } from "utils/schema";
import loadingMin from "assets/loading_min.svg";
import { useEffect } from "react";
import { decrementCountdown, startCountdown } from "redux/auth/authSlice";
type InputOtpType = {
  otp: number;
};
type Props = {
  tab: TabType;
  setTab: (tab: TabType) => void;
};
function FormOtp({ tab, setTab }: Props) {
  const dispatch = useAppDispatch();
  const { verifyOtp, loadingForpass, countdown, dataReqOtp } = useAppSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InputOtpType>({
    resolver: yupResolver(schemaOtp),
  });
  const onSubmit = (formValues: any) => {
    dispatch(authVerifyOtpThunk({ ...formValues, email: dataReqOtp?.email }));
  };
  useEffect(() => {
    if (verifyOtp?.can_be_reset) {
      setTab(TabType.CHANGEPASSWORD);
    }
  }, [loadingForpass, setTab, verifyOtp?.can_be_reset]);
  const gotoForPassword = () => {
    setTab(TabType.FORPASSWORD);
    reset();
  };
  const handleResend = () => {
    if (countdown === 0) {
      dispatch(startCountdown(60));
      dispatch(authForPasswordThunk({ email: dataReqOtp?.email }));
    }
  };
  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        dispatch(decrementCountdown());
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown, dispatch]);
  return (
    <div
      style={{ transition: "transform 0.3s ease-in-out", transform: `translateX(${tab === TabType.SENDOTP ? "0%" : "200%"})` }}
      className="bg-white shadow-xl h-full absolute right-0 px-5 w-full"
    >
      <div className="mt-5">
        <ArrowLeftIcon onClick={gotoForPassword} width={20} height={20} />
      </div>
      <div className="flex flex-col justify-center h-2/3">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-xl font-bold leading-9 tracking-tight text-gray-900">Quên mật khẩu</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
          <div className="mx-3">
            <label htmlFor="value" className="block text-sm font-medium leading-6 text-gray-900">
              Nhập OTP
            </label>
            <div className="h-10">
              <div className="input-global flex">
                <div className="bg-slate-300 h-full flex items-center px-3">
                  <UserIcon width={20} height={20} className="" />
                </div>
                <Input id="value" type="text" className="flex-1 h-full px-2 border" placeholder="Vui lòng nhập mã otp" {...register("otp")} />
              </div>
              {errors.otp && <p className="text-red-500 text-sm mt-1 text-nowrap">{errors.otp.message}</p>}
            </div>
          </div>

          <div className="flex justify-center items-center mr-2 gap-3">
            <Button
              type="submit"
              className="text-center flex items-center justify-center rounded-md bg-orange-600 w-32 h-9 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
            >
              {loadingForpass ? <img className="h-full w-5" src={loadingMin} alt="loading" /> : <span>Tiếp tục</span>}
            </Button>
            <span className="cursor-pointer underline" onClick={handleResend}>{`Gửi lại ${countdown > 0 ? countdown : ""}`}</span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormOtp;
