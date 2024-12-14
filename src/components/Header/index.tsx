import { memo, useEffect, useRef, useState } from "react";
import { Button } from "@headlessui/react";
import { Bars3Icon, ArrowRightStartOnRectangleIcon, ShoppingCartIcon, UserIcon, GlobeAltIcon } from "@heroicons/react/24/outline";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "redux/auth/authSlice";
import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import { toastifyWarning } from "utils/toastify";
import Search from "../Search";
import { getProductByAccount } from "redux/cart/cartThunk";
import { clearCart } from "redux/cart/cartSlice";
import { navLink } from "routes/app";
import HeaderMobile from "./HeaderMobile";
import { texts } from "libs/contains/texts";
import useAuthenticated from "hooks/useAuthenticated";
import { assets } from "assets";

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement>(null);
  const headerMenu = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const { isAdmin } = useAuthenticated();
  const { cartLength } = useAppSelector((state) => state.cart);
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    setMobileMenuOpen(false);
    navigate("/login");
  };
  useEffect(() => {
    if (currentUser) {
      dispatch(getProductByAccount());
    }
  }, [dispatch, currentUser]);
  const handleCart = () => {
    setMobileMenuOpen(false);
    if (!currentUser) {
      toastifyWarning("Vui lòng đăng nhập!!!");
    }
  };
  useEffect(() => {
    if (window.location.pathname !== "/order") {
      sessionStorage.removeItem("orderItems");
    }
  }, []);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
        setOpenAccount(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleOpenAcc = () => {
    if (currentUser) {
      setOpenAccount(!openAccount);
      return;
    }
    navigate("/login");
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScrollMenu);
    return () => {
      window.removeEventListener("scroll", handleScrollMenu);
    };
  });
  const handleScrollMenu = () => {
    const headerMain = headerMenu.current as HTMLElement;
    if (window.scrollY > 100) {
      headerMain.classList.add("fixed");
    } else {
      headerMain.classList.remove("fixed");
    }
  };
  return (
    <header ref={headerMenu} className="header-menu relative bg-linear w-full top-0 h-header">
      <nav className="mx-auto absolute top-0 right-0 left-0 container flex items-center justify-between h-full px-2">
        <Link to="/">
          <span className="heading4">MyStore</span>
        </Link>
        <div className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <Button className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
            <Bars3Icon aria-hidden="true" className="h-7 w-7" />
          </Button>
        </div>
        <div className="hidden md:flex md:gap-x-4 lg:gap-x-12 items-center">
          {navLink.map((nav) => (
            <NavLink key={nav.title} to={nav.path} className="nav-link__header text-lg font-light leading-6 text-gray-900 uppercase">
              {nav.title}
            </NavLink>
          ))}
          <div className="flex items-center gap-4 text-sm font-medium leading-6 text-gray-900">
            <Search handleCloseNav={() => setMobileMenuOpen(false)} />
            <Link to="/cart" className="relative">
              <ShoppingCartIcon onClick={handleCart} aria-hidden="true" className="h-6 w-6 cursor-pointer" />
              <span className="absolute -top-[6px] -right-[6px] bg-orange-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {cartLength > 0 ? cartLength : 0}
              </span>
            </Link>
          </div>

          <div className="relative" ref={accountMenuRef}>
            <div className="rounded-full transition-all duration-500 cursor-pointer" onClick={handleOpenAcc}>
              <img src={assets.noAvatar} className="w-9 h-9 rounded-full" />
            </div>
            {openAccount && (
              <div className="absolute w-40 right-0 left-[-120px] bg-white rounded-md shadow-md top-[57px] cursor-pointer transition-all duration-700">
                {currentUser && (
                  <div className="flex flex-col">
                    <Link to="/account/profile" className="flex p-3 items-center gap-x-2 hover:bg-[#f5f5f5]">
                      <UserIcon className="w-5 h-5" />
                      <p>{texts.header.ACCOUNT}</p>
                    </Link>
                    {isAdmin && (
                      <Link to="/admin" className="flex p-3 items-center gap-x-2 hover:bg-[#f5f5f5]">
                        <GlobeAltIcon className="w-5 h-6" />
                        <p>Quản trị</p>
                      </Link>
                    )}
                    <span onClick={handleLogout} className="flex justify-start gap-x-2 p-3 hover:bg-[#f5f5f5]">
                      <ArrowRightStartOnRectangleIcon className="h-5 w-5" />
                      <p>{texts.header.LOGOUT}</p>
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
      {mobileMenuOpen && <HeaderMobile setMobileMenuOpen={setMobileMenuOpen} handleCart={handleCart} handleLogout={handleLogout} />}
    </header>
  );
}

export default memo(Header);
