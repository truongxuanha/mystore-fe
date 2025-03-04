import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import { toastifySuccess, toastifyWarning } from "utils/toastify";
import { getProductByAccount, postCreateCart } from "redux/cart/cartThunk";
import { CreateCartType } from "types";

const useAddToCart = () => {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);

  const userLogin = !!currentUser;
  const addToCart = async (product_id: CreateCartType["product_id"], quantity?: number) => {
    if (!userLogin) {
      toastifyWarning("Vui lòng đăng nhập!");
      return;
    }
    try {
      const result = await dispatch(postCreateCart({ product_id, quantity }));

      if (!result.payload.success) {
        toastifyWarning("Thêm giỏ hàng thất bại!");
        return;
      }
      dispatch(getProductByAccount());
      toastifySuccess("Thêm giỏ hàng thành công!");
    } catch (error) {
      toastifyWarning("Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng.");
    }
  };

  return { addToCart };
};

export default useAddToCart;
