import { Link } from "react-router-dom";
import { ContainerHeader } from "./styled";
import { ChevronLeft } from "lucide-react";

function HeaderAdmin() {
  return (
    <ContainerHeader>
      <Link to="/" className="flex items-center cursor-pointer">
        <ChevronLeft className="w-5 h-5" />
        <span>Về trang chủ</span>
      </Link>
    </ContainerHeader>
  );
}

export default HeaderAdmin;
