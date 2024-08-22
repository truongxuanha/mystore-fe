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
import { Link } from "react-router-dom";

function Cart() {
  const dispatch = useAppDispatch();

  const { cartItems } = useAppSelector((state) => state.cart);
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

  return (
    <div className=''>
      {cartItems.map((item) => {
        const priceAfterDiscount =
          item.price - (item.price * item.discount) / 100;
        return (
          <div
            key={item.id}
            className='relative grid grid-cols-1 sm:grid-cols-8 bg-white shadow-sm mt-3 p-5 rounded-md gap-x-3'
          >
            <div className='col-span-2'>
              <img src={item.thumbnail} className='border rounded-md' />
            </div>
            <div className='col-span-4'>
              <Link
                to={`/san-pham/${item.slug}`}
                className='text-xs sm:text-sm hover:underline'
              >
                {item.name}
              </Link>
            </div>
            <div className='col-span-1 mx-auto flex items-center'>
              <Button
                type='button'
                className='h-4 w-4 md:h-5 md:w-5 rounded-md border bg-gray-100 hover:bg-gray-200'
                onClick={() =>
                  handleUpdateQuantity(
                    item.id,
                    item.quantity > 0 ? item.quantity - 1 : item.quantity
                  )
                }
              >
                <MinusIcon className='w-3 h-3 md:w-5 md:h-3' />
              </Button>
              <input
                type='text'
                disabled
                value={item.quantity}
                className='w-10 text-center bg-transparent text-xs md:text-sm font-medium text-gray-900 outline-none'
              />
              <Button
                type='button'
                className='h-4 w-4 md:h-5 md:w-5 rounded-md border bg-gray-100 hover:bg-gray-200'
                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
              >
                <PlusIcon className='w-3 h-3 md:w-5 md:h-3' />
              </Button>
            </div>
            <div className='col-span-1 mx-auto flex flex-col '>
              <span className='text-[11px] sm:text-xs md:text-sm w-[115px] md:w-[150px] sm:absolute sm:top-2 sm:right-1'>
                Giá: {formatVND(priceAfterDiscount, 0)}
              </span>
              <span
                className='block w-9 cursor-pointer'
                onClick={() => handleDeleteItemCart(item.id)}
              >
                <XMarkIcon className='w-6 text-colorPrimary absolute top-2 right-2 text-center' />
              </span>
              <span className='text-[11px] sm:text-xs md:text-sm w-[115px] md:w-[150px] sm:absolute sm:bottom-2 sm:right-1'>
                Tạm tính: {formatVND(priceAfterDiscount * item.quantity, 0)}
              </span>
            </div>
          </div>
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
    </div>
  );
}

export default Cart;
