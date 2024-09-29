import React, { memo } from "react";
import { Link } from "react-router-dom";

import { ProductsType } from "types";
import formatVND from "../../../utils/formatVND";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import useAddToCart from "../../../hooks/useAddCart";
import { texts } from "../../../contains/texts";
import { assets } from "../../../assets";

export interface ProductsProp {
  product: ProductsType;
  typeCss: string;
  style?: React.CSSProperties;
  productCategory?: string;
}

const Product: React.FC<ProductsProp> = ({
  product,
  typeCss,
  style,
  productCategory,
}) => {
  const { addToCart } = useAddToCart();

  return (
    <div
      className={`${typeCss} bg-white transition-transform duration-500`}
      style={style}
    >
      <div className='row-span-3 sm:row-span-2 pt-2 md:row-span-3 w-full flex items-center'>
        <img
          className='rounded-md object-cover h-full hover:translate-y-[-10px] duration-500'
          src={product.thumbnail}
          alt={product.name}
        />
      </div>
      <p className='multiline-truncate font-medium h-8 sm:h-[43px] row-span-1 sm:row-span-1 md:row-span-5 mt-2 text-xs sm:text-sm'>
        {product.name}
      </p>
      <div className='row-span-1 sm:row-span-1 md:row-span-2 my-auto pt-5'>
        <span className='text-xs sm:text-base md:text-[16px] flex flex-wrap justify-between'>
          <p className='text-red-600'>
            {formatVND(product.price, product.discount)}
          </p>
          <p className='line-through text-gray-500'>
            {formatVND(product.price, 0)}
          </p>
        </span>
        <div className='flex flex-wrap justify-between items-center gap-3 mt-5 mx-2'>
          <Link
            to={`/san-pham/${product.product_slug}`}
            className='text-xs md:text-sm cursor-pointer px-2 rounded-md underline hover:text-red-500'
          >
            Thông tin
          </Link>
          {product.quantity > 0 ? (
            <span
              className='cursor-pointer rounded-full bg-colorRed hover:bg-red-400 p-1'
              onClick={() => addToCart(product.id)}
            >
              <ShoppingCartIcon
                aria-hidden='true'
                className='h-4 w-4 md:h-5 md:w-5 text-white'
              />
            </span>
          ) : (
            <span className='text-xs md:text-sm text-red-500 line-through cursor-pointer'>
              Hết hàng
            </span>
          )}
        </div>
      </div>
      {(productCategory === texts.NEW || productCategory === texts.HOT) && (
        <div className='absolute top-1 left-0 text-white w-12 h-5 rounded-sm'>
          <img className='w-14 h-6 rounded-sm' src={assets.tag} alt='' />
          <p className='absolute inset-0 text-xs flex items-center ml-2 z-10'>
            {productCategory}
          </p>
        </div>
      )}

      <div className='absolute top-1 right-1 text-white px-2 rounded-sm'>
        {product.discount}
      </div>
    </div>
  );
};

export default memo(Product);
