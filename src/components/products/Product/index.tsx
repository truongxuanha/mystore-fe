import React, { memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getInFoProduct } from "../../../services/productService";
import { CreateCartType, ProductsType } from "types";
import formatVND from "../../../utils/formatVND";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "../../../hooks/useAppDispatch";
import { toastifySuccess, toastifyWarning } from "../../../utils/toastify";
import { postCreateCart } from "../../../services/cartService";

export interface ProductsProp {
  product: ProductsType;
  typeCss: string;
  style?: React.CSSProperties;
}

const Product: React.FC<ProductsProp> = ({ product, typeCss, style }) => {
  const dispatch = useAppDispatch();
  const { currentUser, token } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const userLogin = !!currentUser;

  const handleCart = async (id_product: CreateCartType["id_product"]) => {
    if (userLogin) {
      try {
        const result = await dispatch(
          postCreateCart({ token, id_product, quantity: 1 })
        );
        if (result.payload.success) {
          toastifySuccess("Thêm giỏ hàng thành công!");
        } else {
          toastifyWarning("Thêm giỏ hàng thất bại!");
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    } else {
      navigate("/dang-nhap");
      toastifyWarning("Vui lòng đăng nhập!");
    }
  };

  const handleInfo = async (slug: string) => {
    await getInFoProduct(slug);
  };

  return (
    <div
      className={`${typeCss} bg-white transition-transform duration-500`}
      style={style}
    >
      <div className='row-span-3 sm:row-span-2 md:row-span-5 w-full flex items-center'>
        <img
          className='rounded-md object-cover hover:translate-y-[-10px] duration-500'
          src={product.thumbnail}
          alt={product.name}
        />
      </div>
      <p className='multiline-truncate h-9 sm:h-28 row-span-2 sm:row-span-1 md:row-span-5 mt-2'>
        {product.name}
      </p>
      <div className='row-span-1 sm:row-span-1 md:row-span-2 my-auto'>
        <span className='text-xs sm:text-base md:text-[18px] flex flex-wrap justify-between'>
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
            className='nav-link text-xs md:text-sm cursor-pointer'
          >
            Thông tin
          </Link>
          <span
            className='cursor-pointer'
            onClick={() => handleCart(product.id)}
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
