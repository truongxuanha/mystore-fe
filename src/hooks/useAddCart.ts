import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useAppDispatch";
import { toastifySuccess, toastifyWarning } from "../utils/toastify";
import {
  getProductByAccount,
  postCreateCart,
} from "../redux/reducer/cartReducer/cartThunk";
import { CreateCartType } from "types";

const useAddToCart = () => {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const userLogin = !!currentUser;
  const addToCart = async (id_product: CreateCartType["id_product"]) => {
    if (userLogin) {
      try {
        const result = await dispatch(
          postCreateCart({ id_product, quantity: 1 })
        );

        if (result.payload.success) {
          await dispatch(getProductByAccount());
          toastifySuccess("Thêm giỏ hàng thành công!");
        } else {
          toastifyWarning("Thêm giỏ hàng thất bại!");
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
        toastifyWarning("Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng.");
      }
    } else {
      navigate("/dang-nhap");
      toastifyWarning("Vui lòng đăng nhập!");
    }
  };

  return { addToCart };
};

export default useAddToCart;
