import { useEffect, useMemo } from "react";
import { Button } from "@headlessui/react";
import { MinusIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";

import {
  getProductByAccount,
  removeCartItem,
  updateCartItem,
  UpdateItem,
} from "../../services/cartService";
import { ProductsType } from "../../types";
import formatVND from "../../utils/formatVND";
import { toastifyWarning } from "../../utils/toastify";

function Cart() {
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector((state) => state.cart);
  const { token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(getProductByAccount({ token }));
    }
  }, [dispatch, token]);

  async function handleDeleteItemCart(id: ProductsType["id"]) {
    await dispatch(removeCartItem({ id, token }));
    await dispatch(getProductByAccount({ token }));
  }

  async function handleUpdateQuantity(
    id: ProductsType["id"],
    quantity: UpdateItem["quantity"]
  ) {
    await dispatch(updateCartItem({ id, token, quantity }));
    if (quantity === 0) {
      await dispatch(removeCartItem({ id, token }));
    }
    await dispatch(getProductByAccount({ token }));
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
            className='relative grid grid-cols-7 items-center bg-white shadow-sm mt-3 p-5 rounded-md gap-x-3'
          >
            <div className='col-span-1'>
              <img
                src={item.thumbnail}
                className='object-cover border rounded-md'
              />
            </div>
            <div className='col-span-4'>
              <span className='text-[11px] sm:text-sm'>{item.name}</span>
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
            <div className='col-span-1 mx-auto flex flex-col'>
              <span className='text-[11px] sm:text-xs md:text-sm w-[115px] md:w-[150px] absolute top-2 right-1'>
                Giá: {formatVND(priceAfterDiscount, 0)}
              </span>
              <span
                className='block w-9 cursor-pointer'
                onClick={() => handleDeleteItemCart(item.id)}
              >
                <XMarkIcon className='w-6 text-colorPrimary absolute top-2 right-2 text-center' />
              </span>
              <span className='text-[11px] sm:text-xs md:text-sm w-[115px] md:w-[150px] absolute bottom-2 right-1'>
                Tạm tính: {formatVND(priceAfterDiscount * item.quantity, 0)}
              </span>
            </div>
          </div>
        );
      })}
      <div className='mt-4 p-4 bg-gray-100 rounded-md flex justify-end items-center gap-2'>
        <span className='text-sm md:text-lg font-medium text-colorPrimary'>
          <strong>Tổng tiền:</strong> {formatVND(totalPrice, 0)}
        </span>
        <Button
          className='bg-colorPrimary text-white px-4 py-2 rounded-lg'
          onClick={() => {
            toastifyWarning("Tính năng đặt hàng đang được Update!");
          }}
        >
          Đặt hàng ngay
        </Button>
      </div>
    </div>
  );
}

export default Cart;
