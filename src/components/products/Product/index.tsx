import React, { memo } from "react";
import { Link } from "react-router-dom";
import { getInFoProduct } from "../../../services/productService";
import { ProductsType } from "types";
import formatVND from "../../../utils/formatVND";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import useAddToCart from "../../../hooks/useAddCart";

export interface ProductsProp {
  product: ProductsType;
  typeCss: string;
  style?: React.CSSProperties;
}

const Product: React.FC<ProductsProp> = ({ product, typeCss, style }) => {
  const { addToCart } = useAddToCart();

  const handleInfo = async (slug: string) => {
    await getInFoProduct(slug);
  };

  return (
    <div
      className={`${typeCss} bg-white transition-transform duration-500`}
      style={style}
    >
      <div className='row-span-3 sm:row-span-2 pt-2 md:row-span-3 w-full flex items-center'>
        <img
          className='rounded-md object-cover hover:translate-y-[-10px] duration-500'
          src={product.thumbnail}
          alt={product.name}
        />
      </div>
      <p className='multiline-truncate font-medium h-8 sm:h-14 row-span-1 sm:row-span-1 md:row-span-5 mt-2'>
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
            to={`/san-pham/${product.slug}`}
            onClick={() => handleInfo(product.slug)}
            className='text-xs md:text-sm cursor-pointer px-2 rounded-md bg-colorPrimary hover:bg-orange-300 text-gray-100 animate-bounce'
          >
            Thông tin
          </Link>
          <span
            className='cursor-pointer'
            onClick={() => addToCart(product.id)}
          >
            <ShoppingCartIcon
              aria-hidden='true'
              className='h-4 w-4 md:h-6 md:w-6'
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default memo(Product);

("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiODIyZTA3NjQ1NDA5MTFlZjllNjRjZWNkMDJjMjRmMjAiLCJwZXJtaXNzaW9uIjoxLCJzdGF0dXMiOjAsInR5cGUiOjB9LCJpYXQiOjE3MjM1NDEyMTIsImV4cCI6MTcyMzU0NDgxMn0.zh8AoV2bC-18bKp-FiJMlbCC-8yozk64Jlo7NnvwiC0");
