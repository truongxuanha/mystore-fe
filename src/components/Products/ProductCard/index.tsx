import React, { memo } from "react";
import { Link } from "react-router-dom";
import { IsListType, ProductsType } from "types";
import formatVND from "utils/formatVND";
import { assets } from "assets";
import ImageLazy from "customs/ImageLazy";
import { PAGE } from "libs/contains";

export type ProductsProp = {
  product: ProductsType;
  typeCss?: string;
  style?: React.CSSProperties;
  isList?: IsListType;
};

const ProductCard: React.FC<ProductsProp> = ({ product, isList }) => {
  // const { addToCart } = useAddToCart();
  return (
    <Link
      to={`${PAGE.PRODUCT}/product-detail/${product.product_id}`}
      className="bg-white px-2 rounded-md min-h-[300px] relative transition-all duration-300 block"
    >
      <div className="pt-2 md:row-span-3 w-full h-[200px] flex items-center mb-4">
        <ImageLazy
          className="rounded-md w-full h-full hover:translate-y-[-10px] duration-500"
          isObjectFitCover="contain"
          src={product.thumbnail}
          alt={product.product_name}
        />
      </div>
      <p className="uppercase multiline-truncate font-medium h-8 sm:h-[42px] row-span-1 sm:row-span-1 md:row-span-5 text-xs sm:text-sm">
        {product.product_name}
      </p>
      <div className="row-span-1 sm:row-span-1 md:row-span-2 my-auto pt-5">
        <span className="text-xs sm:text-base md:text-[16px] flex flex-wrap justify-between">
          <p className="text-red-600">{formatVND(product.price, product.discount)}</p>
          <p className="line-through text-gray-500">{formatVND(product.price, 0)}</p>
        </span>
        {/* <div className="flex justify-between items-center gap-3 mt-5 mx-2">
          <Link
            to={`${PAGE.PRODUCT}/product-detail/${product.product_id}`}
            className="text-xs md:text-sm cursor-pointer rounded-md underline hover:text-red-500"
          >
            {texts.common.INFORMATION}
          </Link>
          {product.quantity > 0 ? (
            <span className="cursor-pointer rounded-full bg-colorRed hover:bg-red-400 p-1" onClick={() => addToCart(product.product_id, 1)}>
              <ShoppingCartIcon aria-hidden="true" className="h-4 w-4 md:h-5 md:w-5 text-white" />
            </span>
          ) : (
            <span className="text-xs md:text-sm text-red-500 line-through cursor-pointer">{texts.product.SOLD_OUT}</span>
          )}
        </div> */}
      </div>
      {(isList === IsListType.LIST_NEW || isList === IsListType.LIST_HOT) && (
        <div className="absolute top-1 left-0 text-white w-12 h-5 rounded-sm">
          <img className="w-14 h-6 rounded-sm" src={assets.tag} alt="" />
          <p className="absolute inset-0 text-xs flex items-center ml-2 z-10">{isList}</p>
        </div>
      )}

      {!isList && (
        <div className="absolute top-1 left-0 text-white w-16 h-5 rounded-sm">
          <img className="w-14 h-6 rounded-sm" src={assets.tag} alt="" />
          <p className="absolute inset-0 text-[11px] flex items-center px-1 z-10">Giảm {product.discount}%</p>
        </div>
      )}
    </Link>
  );
};

export default memo(ProductCard);
