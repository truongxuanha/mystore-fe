import TitleProfile from "customs/TitleProfile";
import { useAppSelector } from "hooks/useAppDispatch";
import { texts } from "libs/contains/texts";
import { SEX } from "types";

const MeAccountPage = () => {
  const { infoUser } = useAppSelector((state) => state.auth);
  const { account_name, email, phone } = infoUser;

  return (
    <div>
      <TitleProfile title={texts.account.MYPROFILE} subTitle="Quản lý thông tin hồ sơ để bảo mật tài khoản" />
      <form className="space-y-4">
        <div className="flex items-center">
          <label className="w-1/4">{texts.account.NAME_LOGIN}</label>
          <input type="text" value={account_name} className="w-2/4 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
        </div>
        <div className="flex items-center">
          <label className="w-1/4">{texts.account.FULL_NAME}</label>
          <input type="text" className="w-2/4 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
        </div>
        <div className="flex items-center">
          <label className="w-1/4">{texts.account.PHONE_NUMBER}</label>
          <input type="text" value={phone} className="w-2/4 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
        </div>
        <div className="flex items-center">
          <label className="w-1/4">{texts.account.EMAIL}</label>
          <input type="text" value={email} className="w-2/4 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
        </div>
        <div className="flex items-center">
          <label className="w-1/4">{texts.account.SEX}</label>
          <div className="w-2/4 flex space-x-4">
            <label className="flex items-center">
              <input type="radio" name="gender" className="mr-2" />
              {SEX.MALE}
            </label>
            <label className="flex items-center">
              <input type="radio" name="gender" className="mr-2" />
              {SEX.FEMALE}
            </label>
            <label className="flex items-center">
              <input type="radio" name="gender" className="mr-2" />
              {SEX.OTHER}
            </label>
          </div>
        </div>
        <div className="flex items-center">
          <label className="w-1/4">{texts.account.BIRTHDAY}</label>
          <input type="date" placeholder="mm/dd/yyyy" className="w-2/4 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
        </div>
        <button type="submit" className="bg-orange-500 flex justify-end text-white px-6 py-2 rounded-md">
          {texts.common.SAVE}
        </button>
      </form>
    </div>
  );
};

export default MeAccountPage;
