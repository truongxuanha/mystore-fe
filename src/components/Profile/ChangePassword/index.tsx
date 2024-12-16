import { Input } from "@headlessui/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingMini from "customs/LoadingMini";
import TitleProfile from "customs/TitleProfile";
import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import { texts } from "libs/contains/texts";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { authChangePassThunk } from "redux/auth/authThunk";
import { schemaChangePassword } from "utils/schema";

type FormChangePassType = {
  newpass: string;
  password: string;
  confirm_password: string;
};

const ChangePasswordProfile = () => {
  const { loadingChangePass } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormChangePassType>({
    resolver: yupResolver(schemaChangePassword),
    defaultValues: {
      newpass: "",
      password: "",
      confirm_password: "",
    },
  });
  const [show, setShow] = useState<boolean>(false);
  const [showComfirm, setShowComfirm] = useState<boolean>(false);
  function handleShowPass() {
    setShow((show) => !show);
  }
  const handleOnSubmit = (value: FormChangePassType) => {
    dispatch(authChangePassThunk({ newpass: value.newpass, password: value.password }));
    reset();
  };
  return (
    <div className="bg-white p-6">
      <TitleProfile title={texts.account.CHANGEPASSWORD} subTitle="Thay đổi mật khẩu để bảo mật tài khoản" />
      <form onSubmit={handleSubmit(handleOnSubmit)} className="space-y-3 mt-5">
        <div className="mx-3">
          <label htmlFor="value" className="block text-sm mb-1 mx-1 font-medium leading-6 text-gray-900">
            Mật khẩu cũ
          </label>
          <div className="flex relative">
            <Input
              id="password"
              type="text"
              className={`flex-1 h-full px-4 py-4 w-full border rounded-md  ${errors.password && "border-red-500"}`}
              placeholder="Mật khẩu cũ *"
              {...register("password")}
            />
          </div>
          {errors.password && <p className="text-red-500 text-sm mt-1 mx-1">{errors.password.message}</p>}
        </div>
        <div className="mx-3">
          <label htmlFor="value" className="block text-sm font-medium leading-6 text-gray-900 mb-1 mx-1">
            Mật khẩu mới
          </label>
          <div className="relative flex">
            <Input
              id="newpass"
              type={show ? "text" : "password"}
              className={`flex-1 h-full px-4 py-4 w-full border rounded-md  ${errors.newpass && "border-red-500"}`}
              placeholder="Mật khẩu mới *"
              {...register("newpass")}
            />
            <span onClick={handleShowPass}>
              {show ? (
                <EyeIcon className="w-4 h-4 cursor-pointer absolute top-1/2 -translate-y-1/2 right-5" />
              ) : (
                <EyeSlashIcon className="w-4 h-4 cursor-pointer absolute top-1/2 -translate-y-1/2 right-5" />
              )}
            </span>
          </div>
          {errors.newpass && <p className="text-red-500 text-sm mt-1 mx-1">{errors.newpass.message}</p>}
        </div>
        <div className="mx-3">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 mb-1 mx-1">
            Nhập lại mật khẩu
          </label>
          <div className="relative flex">
            <Input
              id="confirm_password"
              type={showComfirm ? "text" : "password"}
              className={`flex-1 h-full px-4 py-4 w-full border rounded-md  ${errors.confirm_password && "border-red-500"}`}
              placeholder="Nhập lại mật khẩu mới *"
              {...register("confirm_password")}
            />
            <span onClick={() => setShowComfirm(!showComfirm)}>
              {showComfirm ? (
                <EyeIcon className="w-4 h-4 cursor-pointer absolute top-1/2 -translate-y-1/2 right-5" />
              ) : (
                <EyeSlashIcon className="w-4 h-4 cursor-pointer absolute top-1/2 -translate-y-1/2 right-5" />
              )}
            </span>
          </div>
          {errors.confirm_password && <p className="text-red-500 text-sm mt-1 mx-1">{errors.confirm_password.message}</p>}
        </div>
        <button
          type="submit"
          className={`${loadingChangePass && "opacity-50"} bg-orange-500  text-white rounded-md h-10 w-32 flex justify-center items-center mx-3`}
        >
          {loadingChangePass ? (
            <>
              <LoadingMini />
              <span className="block pl-2">Loading...</span>
            </>
          ) : (
            texts.common.SAVE
          )}
        </button>
      </form>
    </div>
  );
};
export default ChangePasswordProfile;
