import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import formatVND from "../../../utils/formatVND";

import Loader from "../../Loader";
import { Button } from "@headlessui/react";
import useAddToCart from "../../../hooks/useAddCart";
import { toastifyWarning } from "../../../utils/toastify";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { useAppSelector } from "../../../hooks/useAppDispatch";
import { getInFoProducts } from "../../../redux/reducer/productReducer/productThunk";
import ProductRandom from "../../../components/ProductRandom";

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const { addToCart } = useAddToCart();
  const dispatch = useDispatch<AppDispatch>();
  const { infoProduct, isLoading } = useAppSelector((state) => state.product);
  useEffect(() => {
    if (infoProduct?.slug !== slug) {
      dispatch(getInFoProducts(slug)).unwrap();
    }
  }, [slug]);
  if (isLoading) return <Loader />;
  if (!infoProduct) return <div>Thông tin sản phẩm không tồn tại!</div>;
  return (
    <main>
      <div className='grid grid-cols-1 sm:grid-cols-4  mx-auto overflow-hidden rounded-md py-3 bg-white mt-3'>
        <div className='p-4 col-span-2'>
          <img
            className='w-full h-full object-cover'
            src={infoProduct?.thumbnail}
            alt={infoProduct?.name}
          />
        </div>
        <div className='px-4 py-2 col-span-2 mt-3 flex flex-col justify-between'>
          <div>
            <h2 className='text-lg font-semibold text-gray-800'>
              {infoProduct?.product_name}
            </h2>
            <div className='flex items-baseline mt-2 gap-x-10'>
              <div className='text-red-500 font-bold text-xl'>
                {formatVND(infoProduct?.price, infoProduct?.discount)}
              </div>
              <div className='text-gray-500 line-through'>
                {formatVND(infoProduct?.price, 0)}
              </div>
              <div className='text-colorPrimary text-sm font-semibold'>
                -{infoProduct?.discount}%
              </div>
            </div>
            <div className='mt-4 grid grid-rows-3 gap-1'>
              <div>
                <span className='text-sm'>Chính hãng</span>
              </div>
              <div>
                <span className='text-sm'>Giao hàng nhanh</span>
              </div>
              <div>
                <span className='text-sm'>Miễn phí ship</span>
              </div>
            </div>
            <div className='mt-4 flex justify-start'>
              <span className='text-sm'>2 màu</span>
              <div className='flex ml-2'>
                <div className='w-6 h-6 bg-black rounded-full mx-1'></div>
                <div className='w-6 h-6 bg-pink-300 border border-gray-300 rounded-full mx-1'></div>
              </div>
            </div>
          </div>
          <div className='flex items-center justify-end gap-x-2'>
            {infoProduct?.quantity > 0 ? (
              <>
                <Button
                  className='bg-red-500 text-white text-xs px-2 py-1 rounded-lg hover:bg-red-300'
                  onClick={() => {
                    toastifyWarning("Tính năng đặt hàng đang được Update!");
                  }}
                >
                  Đặt ngay
                </Button>
                <button
                  className='bg-colorPrimary text-white text-xs px-2 py-1 rounded-lg hover:bg-orange-300'
                  onClick={() => addToCart(infoProduct?.product_id)}
                >
                  Thêm giỏ hàng
                </button>
              </>
            ) : (
              <span className='px-2 py-[3px] text-white bg-red-500 rounded-md opacity-70 cursor-not-allowed'>
                Tạm hết hàng
              </span>
            )}
          </div>
        </div>
      </div>
      <ProductRandom />
    </main>
  );
};

export default ProductDetail;
