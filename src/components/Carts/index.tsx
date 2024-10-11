import { useEffect, useMemo } from "react";
import { Button } from "@headlessui/react";
import { MinusIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";

import {
  getProductByAccount,
  removeCartItem,
  updateCartItem,
} from "../../redux/reducer/cartReducer/cartThunk";
import { ProductsType, UpdateItem } from "../../types";
import formatVND from "../../utils/formatVND";
import { toastifyWarning } from "../../utils/toastify";
import Loader from "../../components/Loader";
import ProductRandom from "../../components/ProductRandom";
import CartItem from "./CartItem";

function Cart() {
  const dispatch = useAppDispatch();

  const { cartItems, loadingCart } = useAppSelector((state) => state.cart);
  const { token } = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (token) {
      dispatch(getProductByAccount());
      console.log("shop");
    }
  }, [dispatch, token]);

  function handleDeleteItemCart(id: ProductsType["id"]): void {
    dispatch(removeCartItem(id));
  }

  function handleUpdateQuantity(
    id: ProductsType["id"],
    quantity: UpdateItem["quantity"]
  ): void {
    dispatch(updateCartItem({ id, quantity }));

    if (quantity === 0) dispatch(removeCartItem(id));
  }

  const totalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const priceAfterDiscount =
        item.price - (item.price * item.discount) / 100;
      return total + priceAfterDiscount * item.quantity;
    }, 0);
  }, [cartItems]);
  if (loadingCart) return <Loader />;
  return (
    <div className=''>
      {cartItems.map((cart) => {
        const priceAfterDiscount =
          cart.price - (cart.price * cart.discount) / 100;
        return (
          <CartItem
            idItemCart={cart.id}
            thumbnail={cart.thumbnail}
            priceAfterDiscount={priceAfterDiscount}
            slug={cart.slug}
            product_name={cart.name}
            quantity={cart.quantity}
            updateQuantity={handleUpdateQuantity}
            deleteItemCart={handleDeleteItemCart}
          />
        );
      })}
      <div className='mt-4 w-full h-30 bg-white p-4 rounded-md gap-2 flex flex-col items-end'>
        <div className='flex flex-col w-32 md:w-44 h-full'>
          <span className='text-xs md:text-base font-medium '>
            <strong>Tổng tiền:</strong> {formatVND(totalPrice, 0)}
          </span>
          <span className='text-xs md:text-base font-medium '>
            <strong>Giảm giá:</strong> 0
          </span>
          <span className='text-xs md:text-base font-medium '>
            <strong>Tổng tiền:</strong> {formatVND(totalPrice, 0)}
          </span>
          <Button
            className='bg-red-500 text-white text-xs px-2 py-[4px] rounded-lg hover:bg-red-300 w-24 mt-2 '
            onClick={() => {
              toastifyWarning("Tính năng đặt hàng đang được Update!");
            }}
          >
            Đặt hàng ngay
          </Button>
        </div>
      </div>
      <ProductRandom />
    </div>
  );
}

export default Cart;
