import { ArrowRightStartOnRectangleIcon, ShoppingCartIcon, UserIcon, XMarkIcon } from "@heroicons/react/24/outline";

import Search from "components/Search";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { navLink } from "routes/app";
import logo from "assets/logo.png";
import { useAppSelector } from "hooks/useAppDispatch";
import { texts } from "libs/contains/texts";
type Props = {
  setMobileMenuOpen: (openMenu: boolean) => void;
  handleCart: () => void;
  handleLogout: () => void;
};
function HeaderMobile({ setMobileMenuOpen, handleCart, handleLogout }: Props) {
  const { cartLength } = useAppSelector((state) => state.cart);
  const { currentUser } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleClickIcon = () => {
    navigate("/profile");
    setMobileMenuOpen(false);
  };
  return (
    <div className="fixed inset-0 z-20 bg-black bg-opacity-25 md:hidden">
      <div className="absolute inset-y-0 right-0 w-full bg-white px-8 py-6 max-w-sm">
        <button onClick={() => setMobileMenuOpen(false)} className="-m-2.5 p-2.5 text-gray-700 absolute top-4 right-4">
          <XMarkIcon className="h-6 w-6" />
        </button>

        <Link to="/" onClick={() => setMobileMenuOpen(false)}>
          <img className="w-28 mb-6" src={logo} alt="Logo" />
        </Link>

        <div className="space-y-2">
          {navLink.map((nav) => (
            <NavLink
              key={nav.title}
              to={nav.path}
              className="block text-xs font-semibold text-gray-900 p-3 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              {nav.title}
            </NavLink>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-4">
          <Search handleCloseNav={setMobileMenuOpen} />
          <Link to="/cart" onClick={handleCart}>
            <div className="relative">
              <ShoppingCartIcon className="h-6 w-6 cursor-pointer" />
              {cartLength > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {cartLength}
                </span>
              )}
            </div>
          </Link>
        </div>

        <div className="mt-6">
          {currentUser ? (
            <div className="flex flex-col gap-3">
              <span className="flex items-center gap-2 cursor-pointer p-3 hover:bg-gray-100" onClick={handleClickIcon}>
                <UserIcon className="w-5 h-5" />
                <p>{texts.header.ACCOUNT}</p>
              </span>
              <span className="flex items-center gap-2 cursor-pointer p-3 hover:bg-gray-100" onClick={handleLogout}>
                <ArrowRightStartOnRectangleIcon className="w-5 h-5" />
                <p>{texts.header.LOGOUT}</p>
              </span>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <NavLink to="/login" className="block text-xs font-semibold text-gray-900 p-3 hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>
                {texts.header.LOGIN}
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default HeaderMobile;
