import { ArrowTurnDownLeftIcon } from "@heroicons/react/24/outline";
import { useAppSelector } from "../../../../../../hooks/useAppDispatch";

import { Link } from "react-router-dom";

function HeaderAdmin() {
  const { currentUser } = useAppSelector((state) => state.auth);
  return (
    <div className="flex justify-between items-center w-full bg-white h-20 px-5">
      <div>
        <Link to="/" className="flex items-center gap-2 text-blue-600">
          <ArrowTurnDownLeftIcon className="w-5 h-5 mt-1" />
          <p>Về trang chủ</p>
        </Link>
      </div>
      <div className="flex justify-between items-center gap-2">
        <div className="rounded-full w-10 h-10 border ">
          <img className="rounded-full w-full h-full object-cover" src={currentUser?.user.avatar} alt="" />
        </div>
        <p>{currentUser?.user.account_name}</p>
      </div>
    </div>
  );
}

export default HeaderAdmin;
