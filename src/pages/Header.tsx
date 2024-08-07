import { NavLink, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

import SearchProduct from "../components/search/SearchProduct";

import { useAppDispatch } from "../hooks/useAppDispatch";
import { logout } from "../redux/user/userSlice";

function Header() {
  const storedUser = localStorage.getItem("currentUser");
  const user = storedUser ? JSON.parse(storedUser) : null;
  // console.log(user.user.id);
  const isLoggedIn = !!user;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  function handleLogout() {
    dispatch(logout());
    navigate("/login");
  }

  function handleCart() {
    if (user) {
      navigate("/cart");
    } else {
      alert("Vui lòng đăng nhập");
      navigate("/login");
    }
  }
  return (
    <div className='p-3 h-20 flex-1 items-center'>
      <ul className='flex items-center justify-end gap-5'>
        <li>
          <NavLink to='/'>Trang chủ</NavLink>
        </li>
        <li>
          <NavLink to='/product'>Sản phẩm</NavLink>
        </li>
        <li className='flex items-center gap-3'>
          <SearchProduct />
          <FontAwesomeIcon
            onClick={handleCart}
            icon={faCartShopping}
            className='cursor-pointer'
          />
        </li>
        {!isLoggedIn ? (
          <li className=''>
            <NavLink
              to='/login'
              className='bg-colorPrimary mr-1 p-1 rounded-md text-white font-semibold'
            >
              Đăng nhập
            </NavLink>
            <NavLink
              to='/register'
              className='bg-colorPrimary p-1 rounded-md text-white font-semibold'
            >
              Đăng ký
            </NavLink>
          </li>
        ) : (
          <div>
            <p>{user.user.account_name}</p>
            <span onClick={handleLogout} className='cursor-pointer'>
              LogOut
            </span>
          </div>
        )}
      </ul>
    </div>
  );
}

export default Header;
