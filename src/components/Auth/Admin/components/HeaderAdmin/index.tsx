import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";

import { Link } from "react-router-dom";

function HeaderAdmin() {
  return (
    <div className="flex justify-between items-center w-full h-20 px-5">
      <div>
        <Link to="/" className="flex items-center gap-2 justify-center">
          <ArrowLeftStartOnRectangleIcon className="w-5 h-5" />
          <div>Trang chủ</div>
        </Link>
      </div>
    </div>
  );
}

export default HeaderAdmin;
