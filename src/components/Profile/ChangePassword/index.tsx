import TitleProfile from "customs/TitleProfile";
import { texts } from "libs/contains/texts";

const ChangePasswordProfile = () => {
  return (
    <div>
      <TitleProfile title={texts.account.CHANGEPASSWORD} subTitle="Thay đổi mật khẩu để bảo mật tài khoản" />
    </div>
  );
};
export default ChangePasswordProfile;
