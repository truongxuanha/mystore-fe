import { memo, useEffect, useState } from "react";
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

import { logout } from "../../redux/userSlice";
import logo from "../../assets/logo.png";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { toastifyWarning } from "../../utils/toastify";

import Search from "../Search";

import { getProductByAccount } from "../../services/cartService";

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);
  const [cartLength, setCartLength] = useState(0);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentUser, token } = useAppSelector((state) => state.auth);
  const { cartItems } = useAppSelector((state) => state.cart);

  const userLogin = !!currentUser;

  function handleLogout() {
    dispatch(logout());
    setCartLength(0);
    navigate("/dang-nhap");
    setMobileMenuOpen(false);
  }
  useEffect(() => {
    async function getProduct() {
      if (token) {
        await dispatch(getProductByAccount({ token }));
      }
    }
    getProduct();
  }, [dispatch, token]);

  useEffect(() => {
    setCartLength(() => {
      return cartItems.reduce((total, item) => total + item.quantity, 0);
    });
  }, [cartItems]);

  async function handleCart() {
    if (currentUser) {
      navigate("/gio-hang");
    } else {
      toastifyWarning("Vui lòng đăng nhập!!!");
      navigate("/dang-nhap");
    }
  }

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
          <NavLink
            to='/'
            className='nav-link text-sm font-medium leading-6 text-gray-900 uppercase'
          >
            Trang chủ
          </NavLink>
          <NavLink
            to='/san-pham'
            className='nav-link text-sm font-medium leading-6 text-gray-900 uppercase'
          >
            Sản phẩm
          </NavLink>
          <NavLink
            to='/lien-he'
            className='nav-link text-sm font-medium leading-6 text-gray-900 uppercase'
          >
            Liên hệ
          </NavLink>
          <div className='flex items-center gap-4 text-sm font-medium leading-6 text-gray-900'>
            <Search handleCloseNav={closeMobileMenu} />
            <div className='relative'>
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
            </div>
          </div>

          <div className='relative'>
            <div className='rounded-full bg-orange-100/80 p-2'>
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
              {!userLogin ? (
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
              ) : (
                <div className='p-3 flex flex-col gap-y-3 z-50'>
                  <span className='flex gap-2 items-center cursor-pointer'>
                    <UserIcon className='w-5 h-5' />
                    <p>Tài khoản</p>
                  </span>
                  <span
                    className='flex justify-start gap-2 cursor-pointer'
                    onClick={handleLogout}
                  >
                    <ArrowRightStartOnRectangleIcon
                      aria-hidden='true'
                      className='h-5 w-5'
                    />
                    <p>Đăng xuất</p>
                  </span>
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
              <span className='sr-only'>Close menu</span>
              <XMarkIcon aria-hidden='true' className='h-6 w-6' />
            </Button>
          </div>
          <div className='mt-6 flow-root'>
            <div className='-my-6 divide-y divide-gray-500/10'>
              <div className='space-y-2 py-6 flex flex-col'>
                <NavLink
                  to='/'
                  className='nav-link w-16 text-xs font-semibold leading-6 text-gray-900'
                  onClick={closeMobileMenu}
                >
                  Trang chủ
                </NavLink>
                <NavLink
                  to='/san-pham'
                  className='nav-link w-16 text-xs font-semibold leading-6 text-gray-900'
                  onClick={closeMobileMenu}
                >
                  Sản phẩm
                </NavLink>
                <NavLink
                  to='/lien-he'
                  className='nav-link w-12 text-xs font-semibold leading-6 text-gray-900'
                  onClick={closeMobileMenu}
                >
                  Liên hệ
                </NavLink>
                <div className='flex items-center gap-2'>
                  <Search handleCloseNav={setMobileMenuOpen} />
                  <div className='relative'>
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
                  </div>
                </div>
              </div>
              <div className='py-6'>
                {!currentUser ? (
                  <div className='flex gap-2'>
                    <NavLink
                      to='/dang-nhap'
                      className='nav-link text-xs font-semibold leading-6 text-gray-900'
                      onClick={closeMobileMenu}
                    >
                      Đăng nhập
                    </NavLink>
                    <span> / </span>
                    <NavLink
                      to='/dang-ky'
                      className='nav-link text-xs font-semibold leading-6 text-gray-900'
                      onClick={closeMobileMenu}
                    >
                      Đăng ký
                    </NavLink>
                  </div>
                ) : (
                  <div className='p-3 flex flex-col'>
                    <div>
                      <span>User: {currentUser?.user?.account_name}</span>
                    </div>
                    <div>
                      <span
                        className='flex justify-start gap-2 cursor-pointer'
                        onClick={handleLogout}
                      >
                        Đăng xuất
                        <ArrowRightStartOnRectangleIcon
                          aria-hidden='true'
                          className='h-6 w-6'
                        />
                      </span>
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
