import { Button, Input } from "@headlessui/react";
import { ArrowLeftIcon, UserIcon } from "@heroicons/react/24/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import { useForm } from "react-hook-form";
import { authForPasswordThunk } from "redux/auth/authThunk";
import { TabType } from "types";
import { schemaForpassEmail } from "utils/schema";
type InputEmail = {
  email: string;
};
type Props = {
  setTab: (tab: TabType) => void;
  tab: TabType;
};
function ForPassword({ tab, setTab }: Props) {
  const dispatch = useAppDispatch();
  const { dataReqOtp } = useAppSelector((state) => state.auth);
 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputEmail>({
    resolver: yupResolver(schemaForpassEmail),
  });
  const onSubmit = (formValues: any) => {
    dispatch(authForPasswordThunk(formValues));
  };
  return (
    <div
      style={{ transition: "transform 0.3s ease-in-out", transform: `translateX(${tab === TabType.FORPASSWORD ? "0%" : "200%"})` }}
      className="bg-white shadow-xl h-full absolute right-0 px-5 w-full"
    >
      <div className="mt-5" onClick={() => setTab(TabType.LOGIN)}>
        <ArrowLeftIcon width={20} height={20} />
      </div>
      <div className="flex flex-col justify-center h-2/3">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-xl font-bold leading-9 tracking-tight text-gray-900">Quên mật khẩu</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
          <div className="mx-3">
            <label htmlFor="value" className="block text-sm font-medium leading-6 text-gray-900">
              Email
            </label>
            <div className="h-10">
              <div className="input-global flex">
                <div className="bg-slate-300 h-full flex items-center px-3">
                  <UserIcon width={20} height={20} className="" />
                </div>
                <Input id="value" type="text" className="flex-1 h-full px-2 border" placeholder="Vui lòng nhập Email" {...register("email")} />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1 text-nowrap">{errors.email.message}</p>}
            </div>
          </div>

          <div className="flex justify-center mr-2">
            <Button
              type="submit"
              className="text-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
            >
              Quên mật khẩu
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForPassword;
