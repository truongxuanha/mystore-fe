import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import logo from "../assets/logo.png";
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  ArrowRightStartOnRectangleIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { logout } from "../redux/user/userSlice";
import SearchProduct from "../components/search/SearchProduct";
import { useAppDispatch, useAppSelector } from "../hooks/useAppDispatch";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const isLoggedIn = currentUser ? currentUser.id : null;

  function handleLogout() {
    dispatch(logout());
    localStorage.removeItem("currentUser");
    navigate("/login");
    setMobileMenuOpen(false);
  }

  function handleCart() {
    if (isLoggedIn) {
      navigate("/cart");
    } else {
      alert("Vui lòng đăng nhập");
      navigate("/login");
    }
  }

  return (
    <header className='bg-white'>
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
          <button
            type='button'
            onClick={() => setMobileMenuOpen(true)}
            className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
          >
            <Bars3Icon aria-hidden='true' className='h-6 w-6' />
          </button>
        </div>
        <div className='hidden md:flex md:gap-x-4 lg:gap-x-12 items-center'>
          <NavLink
            to='/'
            className='text-sm font-semibold leading-6 text-gray-900'
          >
            Trang chủ
          </NavLink>
          <NavLink
            to='/product'
            className='text-sm font-semibold leading-6 text-gray-900'
          >
            Sản phẩm
          </NavLink>
          <NavLink
            to='/product'
            className='text-sm font-semibold leading-6 text-gray-900'
          >
            Tính năng
          </NavLink>
          <div className='flex items-center gap-4 text-sm font-semibold leading-6 text-gray-900'>
            <SearchProduct />
            <ShoppingCartIcon
              onClick={handleCart}
              aria-hidden='true'
              className='h-6 w-6'
            />
          </div>

          <Menu as='div' className='relative'>
            <div>
              <MenuButton className='inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'>
                <UserCircleIcon aria-hidden='true' className='h-6 w-6' />
              </MenuButton>
            </div>

            <MenuItems
              transition
              className='absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in cursor-pointer'
            >
              {!isLoggedIn ? (
                <div className='py-1 flex flex-col'>
                  <MenuItem>
                    <NavLink
                      to='/login'
                      className='text-sm font-semibold text-gray-900 p-2'
                      onClick={closeMobileMenu}
                    >
                      Đăng nhập
                    </NavLink>
                  </MenuItem>
                  <MenuItem>
                    <NavLink
                      to='/register'
                      className='text-sm font-semibold leading-6 text-gray-900 p-2'
                      onClick={closeMobileMenu}
                    >
                      Đăng ký
                    </NavLink>
                  </MenuItem>
                </div>
              ) : (
                <div className='p-3 flex flex-col'>
                  <MenuItem>
                    <span>User: {currentUser?.account_name}</span>
                  </MenuItem>
                  <MenuItem>
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
                  </MenuItem>
                </div>
              )}
            </MenuItems>
          </Menu>
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className='md:hidden'
      >
        <div className='fixed inset-0 z-10' />
        <DialogPanel className='fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
          <div className='flex items-center justify-between'>
            <Link to='/'>
              <img
                className='w-28'
                src={logo}
                alt='Logo'
                onClick={closeMobileMenu}
              />
            </Link>
            <button
              type='button'
              onClick={() => setMobileMenuOpen(false)}
              className='-m-2.5 rounded-md p-2.5 text-gray-700'
            >
              <span className='sr-only'>Close menu</span>
              <XMarkIcon aria-hidden='true' className='h-6 w-6' />
            </button>
          </div>
          <div className='mt-6 flow-root'>
            <div className='-my-6 divide-y divide-gray-500/10'>
              <div className='space-y-2 py-6 flex flex-col'>
                <NavLink
                  to='/'
                  className='text-sm font-semibold leading-6 text-gray-900'
                  onClick={closeMobileMenu}
                >
                  Trang chủ
                </NavLink>
                <NavLink
                  to='/product'
                  className='text-sm font-semibold leading-6 text-gray-900'
                  onClick={closeMobileMenu}
                >
                  Sản phẩm
                </NavLink>
                <NavLink
                  to='/product'
                  className='text-sm font-semibold leading-6 text-gray-900'
                  onClick={closeMobileMenu}
                >
                  Tính năng
                </NavLink>
                <div className='flex items-center justify-between'>
                  <SearchProduct />
                  <div className='text-xl mr-5 font-semibold leading-6 text-gray-900'>
                    <ShoppingCartIcon
                      onClick={handleCart}
                      aria-hidden='true'
                      className='h-6 w-6'
                    />
                  </div>
                </div>
              </div>
              <div className='py-6'>
                {!isLoggedIn ? (
                  <div className='flex gap-2'>
                    <NavLink
                      to='/login'
                      className='text-sm font-semibold leading-6 text-gray-900'
                      onClick={closeMobileMenu}
                    >
                      Đăng nhập
                    </NavLink>
                    <span> / </span>
                    <NavLink
                      to='/register'
                      className='text-sm font-semibold leading-6 text-gray-900'
                      onClick={closeMobileMenu}
                    >
                      Đăng ký
                    </NavLink>
                  </div>
                ) : (
                  <div className='p-3 flex flex-col'>
                    <div>
                      <span>User: {currentUser?.account_name}</span>
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
