import { memo, useEffect, useRef, useState } from "react";
import { Button, Dialog, DialogPanel } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  ArrowRightStartOnRectangleIcon,
  ShoppingCartIcon,
  UserIcon,
  ArrowsRightLeftIcon,
  ShieldExclamationIcon,
} from "@heroicons/react/24/outline";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { logout } from "../../redux/reducer/userReducer/userSlice";
import logo from "../../assets/logo.png";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { toastifyWarning } from "../../utils/toastify";

import Search from "../Search";

import { getProductByAccount } from "../../redux/reducer/cartReducer/cartThunk";
import { clearCart } from "../../redux/reducer/cartReducer/cartSlice";
import { navLink } from "../../routes/app";

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [openAccount, setOpenAccount] = useState<boolean>(false);
  const accountMenuRef = useRef<HTMLDivElement>(null);

  const closeMobileMenu = (): void => setMobileMenuOpen(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { currentUser } = useAppSelector((state) => state.auth);
  const { cartLength } = useAppSelector((state) => state.cart);

  function handleLogout() {
    dispatch(logout());
    dispatch(clearCart());

    setMobileMenuOpen(false);

    navigate("/dang-nhap");
  }

  useEffect(() => {
    function getProduct() {
      if (currentUser) {
        dispatch(getProductByAccount());
      }
    }
    getProduct();
  }, [dispatch, currentUser]);

  function handleCart() {
    closeMobileMenu();
    if (!currentUser) {
      toastifyWarning("Vui lòng đăng nhập!!!");
    }
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        accountMenuRef.current &&
        !accountMenuRef.current.contains(event.target as Node)
      ) {
        setOpenAccount(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className='bg-white fixed z-50 w-full'>
      <nav
        aria-label='Global'
        className='mx-auto flex max-w-full items-center justify-between p-6 lg:px-8'
      >
        <div>
          <Link to='/'>
            <img className='w-28' src={logo} alt='Logo' />
          </Link>
        </div>
        <div className='flex md:hidden'>
          <Button
            type='button'
            onClick={() => setMobileMenuOpen(true)}
            className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
          >
            <Bars3Icon aria-hidden='true' className='h-6 w-6' />
          </Button>
        </div>
        <div className='hidden md:flex md:gap-x-4 lg:gap-x-12 items-center'>
          {navLink.map((nav) => (
            <NavLink
              key={nav.title}
              to={nav.path}
              className='nav-link text-sm font-medium leading-6 text-gray-900 uppercase'
            >
              {nav.title}
            </NavLink>
          ))}

          <div className='flex items-center gap-4 text-sm font-medium leading-6 text-gray-900'>
            <Search handleCloseNav={closeMobileMenu} />
            <Link to='/gio-hang' className='relative'>
              <ShoppingCartIcon
                onClick={handleCart}
                aria-hidden='true'
                className='h-6 w-6 cursor-pointer'
              />
              {cartLength > 0 && (
                <span className='absolute -top-[6px] -right-[6px] bg-orange-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center'>
                  {cartLength}
                </span>
              )}
            </Link>
          </div>

          <div className='relative' ref={accountMenuRef}>
            <div className='rounded-full bg-orange-100/80 p-2 hover:bg-orange-300 transition-all duration-500'>
              <UserCircleIcon
                onClick={() => setOpenAccount(!openAccount)}
                aria-hidden='true'
                className='h-6 w-6 cursor-pointer'
              />
            </div>
            <div
              className={`absolute w-40 right-0 left-[-120px] bg-white rounded-md shadow-md top-[57px] cursor-pointer transition-all duration-700 transform ${
                openAccount ? "" : "hidden"
              }`}
            >
              {currentUser ? (
                <div className='flex flex-col'>
                  <Link
                    to='/thong-tin-tai-khoan'
                    className='flex p-3 items-center cursor-pointer hover:bg-[#f5f5f5] w-full gap-x-2'
                  >
                    <UserIcon className='w-5 h-5' />
                    <p>Tài khoản</p>
                  </Link>
                  <span
                    className='flex justify-start gap-x-2 p-3 cursor-pointer hover:bg-[#f5f5f5]'
                    onClick={handleLogout}
                  >
                    <ArrowRightStartOnRectangleIcon
                      aria-hidden='true'
                      className='h-5 w-5'
                    />
                    <p>Đăng xuất</p>
                  </span>
                </div>
              ) : (
                <div className='flex flex-col'>
                  <div>
                    <NavLink
                      to='/dang-nhap'
                      className='text-sm font-semibold text-gray-900 p-3 inline-flex gap-2 hover:bg-[#f5f5f5] w-full '
                      onClick={closeMobileMenu}
                    >
                      <ArrowsRightLeftIcon className='w-5 h-6' />
                      Đăng nhập
                    </NavLink>
                  </div>
                  <div>
                    <NavLink
                      to='/dang-ky'
                      className='text-sm font-semibold leading-6 text-gray-900 p-3 inline-flex gap-2 hover:bg-[#f5f5f5] w-full'
                      onClick={closeMobileMenu}
                    >
                      <ShieldExclamationIcon className='w-5 h-6' />
                      Đăng ký
                    </NavLink>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className='md:hidden'
      >
        <div className='fixed inset-0 z-10' />
        <DialogPanel className='fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-8 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
          <div className='flex items-center justify-between'>
            <Link to='/'>
              <img
                className='w-28'
                src={logo}
                alt='Logo'
                onClick={closeMobileMenu}
              />
            </Link>
            <Button
              type='button'
              onClick={() => setMobileMenuOpen(false)}
              className='-m-2.5 rounded-md p-2.5 text-gray-700'
            >
              
              <XMarkIcon aria-hidden='true' className='h-6 w-6' />
            </Button>
          </div>
          <div className='mt-6 flow-root'>
            <div className='-my-6 divide-y divide-gray-500/10'>
              <div className='space-y-2 py-6 flex flex-col '>
                {navLink.map((nav) => (
                  <NavLink
                    key={nav.title}
                    to={nav.path}
                    className='nav-link w-20 text-xs font-semibold leading-6 text-gray-900 uppercase'
                    onClick={closeMobileMenu}
                  >
                    {nav.title}
                  </NavLink>
                ))}

                <div className='flex items-center gap-2'>
                  <Search handleCloseNav={setMobileMenuOpen} />
                  <div className='relative'>
                    <Link to='/gio-hang'>
                      <ShoppingCartIcon
                        onClick={handleCart}
                        aria-hidden='true'
                        className='h-6 w-6 cursor-pointer'
                      />
                      {cartLength > 0 && (
                        <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center'>
                          {cartLength}
                        </span>
                      )}
                    </Link>
                  </div>
                </div>
              </div>
              <div className='py-6'>
                {currentUser ? (
                  <div className='flex flex-col gap-y-3 z-50'>
                    <span
                      className='flex w-32 gap-2 items-center cursor-pointer'
                      onClick={closeMobileMenu}
                    >
                      <UserIcon className='w-5 h-5' />
                      <p>Tài khoản</p>
                    </span>
                    <span
                      className='flex w-32 justify-start gap-2 cursor-pointer'
                      onClick={handleLogout}
                    >
                      <ArrowRightStartOnRectangleIcon
                        aria-hidden='true'
                        className='h-5 w-5'
                      />
                      <p>Đăng xuất</p>
                    </span>
                  </div>
                ) : (
                  <div className='py-1 flex flex-col'>
                    <div>
                      <NavLink
                        to='/dang-nhap'
                        className='text-sm font-semibold text-gray-900 p-2 inline-flex gap-2'
                        onClick={closeMobileMenu}
                      >
                        <ArrowsRightLeftIcon className='w-5 h-6' />
                        Đăng nhập
                      </NavLink>
                    </div>
                    <div>
                      <NavLink
                        to='/dang-ky'
                        className='text-sm font-semibold leading-6 text-gray-900 p-2 inline-flex gap-2'
                        onClick={closeMobileMenu}
                      >
                        <ShieldExclamationIcon className='w-5 h-6' />
                        Đăng ký
                      </NavLink>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}

export default memo(Header);
