import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import formatVND from "../../../utils/formatVND";

import Loader from "../../Loader";
import { Button } from "@headlessui/react";
import useAddToCart from "../../../hooks/useAddCart";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { useAppSelector } from "../../../hooks/useAppDispatch";
import { getInFoProducts } from "../../../redux/reducer/productReducer/productThunk";
import ProductRandom from "../../../components/ProductRandom";
import { assets } from "../../../assets";

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [quantity, setQuantity] = useState<number>(1);
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
  const cupons = [
    {
      id: 1,
      title: "Chính hãng",
      image: assets.tick,
    },
    {
      id: 2,
      title: "Miễn phí ship",
      image: assets.freeShip,
    },
    {
      id: 3,
      title: "Giao hàng nhanh",
      image: assets.iConShip,
    },
  ];
  function handlePreviousQuantity() {
    if (quantity > 1) {
      setQuantity(() => quantity - 1);
    }
    return;
  }
  return (
    <main>
      <div className='grid grid-cols-1 sm:grid-cols-4  mx-auto overflow-hidden rounded-md bg-white mt-3'>
        <div className='p-4 col-span-2 border rounded-2xl m-5'>
          <img
            className='w-full h-full object-cover'
            src={infoProduct?.thumbnail}
            alt={infoProduct?.name}
          />
        </div>
        <div className='mx-4 py-2 col-span-2 mt-3 flex flex-col justify-between'>
          <div>
            <h2 className='text-lg font-semibold text-gray-800'>
              {infoProduct?.product_name}
            </h2>
            <div className='flex items-baseline mt-2 gap-x-5'>
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
              {cupons.map((cupon) => {
                return (
                  <div key={cupon.title} className='flex items-center gap-3'>
                    <img className='w-5 h-5' src={cupon.image} alt='' />
                    <span className='text-sm'>{cupon.title}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className='flex flex-col items-end gap-2 m-2'>
            {infoProduct?.quantity > 0 ? (
              <>
                <div className='flex items-center w-24 border'>
                  <Button
                    onClick={() => handlePreviousQuantity()}
                    className='bg-colorBody border-r w-7 px-2 font-medium text-xl'
                  >
                    -
                  </Button>
                  <input
                    className='w-10 text-center'
                    type='text'
                    value={quantity}
                  />
                  <Button
                    onClick={() => setQuantity((quantity) => quantity + 1)}
                    className='bg-colorBody border-l w-7 px-2 font-medium text-xl'
                  >
                    +
                  </Button>
                </div>
                <span className='font-bold'>
                  {formatVND(
                    infoProduct.price * quantity,
                    infoProduct.discount
                  )}
                </span>
                <div className='flex gap-3'>
                  <Link to='/dat-hang'>
                    <Button className='bg-red-500 text-white text-xs px-2 py-1 rounded-lg hover:bg-red-300'>
                      Đặt ngay
                    </Button>
                  </Link>
                  <button
                    className='bg-colorPrimary text-white text-xs px-2 py-1 rounded-lg hover:bg-orange-300'
                    onClick={() => addToCart(infoProduct?.product_id, quantity)}
                  >
                    Thêm giỏ hàng
                  </button>
                </div>
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
