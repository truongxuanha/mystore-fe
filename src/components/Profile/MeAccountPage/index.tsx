import { yupResolver } from "@hookform/resolvers/yup";
import TitleProfile from "customs/TitleProfile";
import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import { texts } from "libs/contains/texts";
import { useForm } from "react-hook-form";
import { authChangeProfileThunk, authProfle } from "redux/auth/authThunk";
import { SEX, UserAccount } from "types";
import { schemaChangeProfile } from "utils/schema";
import LoadingMini from "customs/LoadingMini";

const MeAccountPage = () => {
  const { infoUser, loadingChangeProfile } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<any>({
    resolver: yupResolver(schemaChangeProfile),
    defaultValues: {
      account_name: infoUser.account_name || "",
      full_name: infoUser.full_name || "",
      phone: infoUser.phone || "",
      email: infoUser.email || "",
      sex: infoUser.sex ?? 0,
      birthday: infoUser.birthday || "",
    },
  });

  const onSubmit = async (formValue: UserAccount) => {
    const callBack = () => {
      dispatch(authProfle());
    };
    dispatch(authChangeProfileThunk({ ...formValue, callBack }));
  };
  return (
    <div className="bg-white p-6">
      <TitleProfile title={texts.account.MYPROFILE} subTitle="Quản lý thông tin hồ sơ để bảo mật tài khoản" />
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center">
          <label className="w-1/4">{texts.account.NAME_LOGIN}</label>
          <input
            id="account_name"
            {...register("account_name")}
            type="text"
            className="w-2/4 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div className="flex items-center">
          <label className="w-1/4">{texts.account.FULL_NAME}</label>
          <input
            id="full_name"
            {...register("full_name")}
            type="text"
            className="w-2/4 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div className="flex items-center">
          <label className="w-1/4">{texts.account.PHONE_NUMBER}</label>
          <input
            id="phone"
            {...register("phone")}
            type="text"
            className="w-2/4 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div className="flex items-center">
          <label className="w-1/4">{texts.account.EMAIL}</label>
          <input {...register("email")} type="text" className="w-2/4 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
        </div>
        <div className="flex items-center">
          <label className="w-1/4">{texts.account.SEX}</label>
          <div className="w-2/4 flex space-x-4">
            <label>{SEX.MALE}</label>
            <input value={0} {...register("sex")} type="radio" name="sex" className="mr-2" defaultChecked={infoUser.sex === 0} />
            <label>{SEX.FEMALE}</label>
            <input value={1} {...register("sex")} type="radio" name="sex" className="mr-2" defaultChecked={infoUser.sex === 1} />
            <label>{SEX.OTHER}</label>
            <input value={3} {...register("sex")} type="radio" name="sex" className="mr-2" defaultChecked={infoUser.sex === 3} />
          </div>
        </div>
        <div className="flex items-center">
          <label className="w-1/4">{texts.account.BIRTHDAY}</label>
          <input {...register("birthday")} type="date" className="w-2/4 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
        </div>
        <button
          type="submit"
          className={`${loadingChangeProfile && "opacity-50"} bg-orange-500  text-white rounded-md h-10 w-32 flex justify-center items-center`}
        >
          {loadingChangeProfile ? (
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

export default MeAccountPage;
