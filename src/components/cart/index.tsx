// src/components/Cart.tsx

import { useEffect } from "react";
import { Button } from "@headlessui/react";
import {
  HeartIcon,
  MinusIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";

import {
  getProductByAccount,
  removeCartItem,
} from "../../services/cartService";
import { ProductsType } from "types";
import formatVND from "../../utils/formatVND";

function Cart() {
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector((state) => state.cart);
  const { token } = useAppSelector((state) => state.auth);
  console.log(token);
  useEffect(() => {
    if (token) {
      dispatch(getProductByAccount({ token }));
    }
  }, [dispatch, token]);
  async function handleDeleteItemCart(id: ProductsType["id"]) {
    await dispatch(removeCartItem({ id, token }));
    await dispatch(getProductByAccount({ token }));
  }
  // function handleUpdateQuantity() {
  //   setItemQuantity((itemQuantity) => itemQuantity + 1);
  // }
  return (
    <>
      {cartItems.map((item) => (
        <div
          key={item.id}
          className='rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6'
        >
          <div className='md:flex md:items-center md:justify-between md:gap-6'>
            <div className='shrink-0'>
              <img
                className='h-20 w-auto dark:hidden'
                src={item.thumbnail}
                alt='item image'
              />
            </div>

            <div className='w-full min-w-0 flex-1 md:max-w-md'>
              <span className='text-base font-medium text-gray-900 hover:underline dark:text-white'>
                {item.name}
              </span>

              <div className='flex items-center justify-end gap-4 mt-2'>
                <Button
                  type='button'
                  className='inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white'
                >
                  <HeartIcon className='w-5 h-5' />
                  Add to Favorites
                </Button>
                <Button
                  type='button'
                  className='inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500'
                  onClick={() => handleDeleteItemCart(item.id)}
                >
                  <XMarkIcon className='w-5 h-6 text-colorPrimary' />
                  Remove
                </Button>
              </div>
            </div>

            <div className='flex items-center justify-between md:justify-end'>
              <div className='flex items-center'>
                <Button
                  type='button'
                  className='h-5 w-5 rounded-md border bg-gray-100 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600'
                >
                  <MinusIcon className='w-5 h-3' />
                </Button>
                <input
                  type='text'
                  className='w-10 text-center bg-transparent text-sm font-medium text-gray-900 outline-none'
                  value={item.quantity}
                />
                <Button
                  type='button'
                  className='h-5 w-5 rounded-md border bg-gray-100 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600'
                >
                  <PlusIcon className='w-5 h-3' />
                </Button>
              </div>
              <p className='text-base font-bold text-gray-900 dark:text-white md:w-32 text-end'>
                ${formatVND(item.price, item.discount)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Cart;
