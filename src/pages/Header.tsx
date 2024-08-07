import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import SearchProduct from "../components/search/SearchProduct";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { logout } from "../redux/user/userSlice";

function Header() {
  const storedUser = localStorage.getItem("currentUser");
  const user = storedUser ? JSON.parse(storedUser) : null;
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
    <header className='p-3 h-20 flex flex-col justify-between items-center'>
      <div className='flex justify-between items-center w-full md:w-auto'>
        <ul className='flex items-center gap-3 text-[12px] font-bold md:text-base'>
          <li>
            <NavLink to='/'>Trang chủ</NavLink>
          </li>
          <li>
            <NavLink to='/product'>Sản phẩm</NavLink>
          </li>
        </ul>
        <div className='flex items-center gap-3'>
          <SearchProduct />
          <FontAwesomeIcon
            onClick={handleCart}
            icon={faCartShopping}
            className='cursor-pointer'
          />
          {!isLoggedIn ? (
            <div className='hidden md:flex gap-2'>
              <NavLink
                to='/login'
                className='bg-colorPrimary p-1 rounded-md text-white font-semibold'
              >
                Đăng nhập
              </NavLink>
              <NavLink
                to='/register'
                className='bg-colorPrimary p-1 rounded-md text-white font-semibold'
              >
                Đăng ký
              </NavLink>
            </div>
          ) : (
            <FontAwesomeIcon icon={faRightFromBracket} onClick={handleLogout} />
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
