import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import formatVND from "../../../utils/formatVND";

import Loader from "../../Loader";
import { Button, Input } from "@headlessui/react";
import useAddToCart from "../../../hooks/useAddCart";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { useAppSelector } from "../../../hooks/useAppDispatch";
import { getInFoProducts } from "../../../redux/reducer/productReducer/productThunk";
import ProductRandom from "../../../components/ProductRandom";
import { assets } from "../../../assets";
import { texts } from "../../../contains/texts";
import { handleOrder } from "../../../redux/reducer/orderReducer/orderSlice";

export interface ProductOrderType {
  id_product: string | number;
  thumbnail: string;
  product_name: string;
  quantity: number;
  price: number;
  discount: number;
}
const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart } = useAddToCart();
  const [quantity, setQuantity] = useState<number>(1);
  const dispatch = useDispatch<AppDispatch>();
  const { infoProduct, isLoading } = useAppSelector((state) => state.product);
  const navigate = useNavigate();
  useEffect(() => {
    if (infoProduct?.slug !== slug) {
      dispatch(getInFoProducts(slug)).unwrap();
    }
  }, [slug]);
  if (isLoading) return <Loader />;
  if (!infoProduct) return <div>{texts.product.PRODUCT_NOT_FOUND}</div>;
  const cupons = [
    {
      id: 1,
      title: texts.product.AUTHENTIC,
      image: assets.tick,
    },
    {
      id: 2,
      title: texts.order.FREE_SHIP,
      image: assets.freeShip,
    },
    {
      id: 3,
      title: texts.order.FLAS_SHIP,
      image: assets.iConShip,
    },
  ];

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((quantity: number) => quantity - 1);
    }
    return;
  };

  const increaseQuantity = () => {
    setQuantity((quantity: number) => quantity + 1);
  };
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!isNaN(Number(value)) && value.trim() !== "") {
      setQuantity(Number(value));
    } else if (value.trim() === "") {
      return;
    }
  };
  console.log(infoProduct);

  const handleOrderNow = () => {
    const products: ProductOrderType[] = [
      {
        id_product: infoProduct.id_product,
        thumbnail: infoProduct.thumbnail,
        product_name: infoProduct?.product_name,
        quantity,
        price: infoProduct?.price,
        discount: infoProduct.discount,
      },
    ];
    dispatch(handleOrder(products));
    navigate("/dat-hang");
  };
  return (
    <main>
      <div className="grid grid-cols-1 sm:grid-cols-4  mx-auto overflow-hidden rounded-md bg-white mt-3">
        <div className="p-4 col-span-2 border rounded-2xl m-5">
          <img className="w-full h-full object-cover" src={infoProduct?.thumbnail} alt={infoProduct?.product_name} />
        </div>
        <div className="mx-4 py-2 col-span-2 mt-3 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">{infoProduct?.product_name}</h2>
            <div className="flex items-baseline mt-2 gap-x-5">
              <div className="text-red-500 font-bold text-xl">{formatVND(infoProduct?.price, infoProduct?.discount)}</div>
              <div className="text-gray-500 line-through">{formatVND(infoProduct?.price, 0)}</div>
              <div className="text-colorPrimary text-sm font-semibold">-{infoProduct?.discount}%</div>
            </div>
            <div className="mt-4 grid grid-rows-3 gap-1">
              {cupons.map((cupon) => {
                return (
                  <div key={cupon.title} className="flex items-center gap-3">
                    <img className="w-5 h-5" src={cupon.image} alt="" />
                    <span className="text-sm">{cupon.title}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 m-2">
            {infoProduct?.quantity > 0 ? (
              <>
                <div className="flex items-center w-24 border">
                  <Button onClick={decreaseQuantity} className="bg-colorBody border-r w-7 px-2 font-medium text-xl">
                    -
                  </Button>
                  <Input name="quantity" className="w-10 text-center" min={1} type="number" onChange={handleQuantityChange} value={quantity} />
                  <Button onClick={increaseQuantity} className="bg-colorBody border-l w-7 px-2 font-medium text-xl">
                    +
                  </Button>
                </div>
                <span className="font-bold">{formatVND(infoProduct.price * quantity, infoProduct.discount)}</span>
                <div className="flex gap-3">
                  <Button className="bg-red-500 text-white text-xs px-2 py-1 rounded-lg hover:bg-red-300" onClick={handleOrderNow}>
                    {texts.order.ORDER_NOW}
                  </Button>

                  <button
                    className="bg-colorPrimary text-white text-xs px-2 py-1 rounded-lg hover:bg-orange-300"
                    onClick={() => addToCart(infoProduct?.product_id, quantity)}
                  >
                    {texts.common.ADD_TO_CART}
                  </button>
                </div>
              </>
            ) : (
              <span className="px-2 py-[3px] text-white bg-red-500 rounded-md opacity-70 cursor-not-allowed">{texts.product.OUT_OF_STOCK}</span>
            )}
          </div>
        </div>
      </div>

      <ProductRandom />
    </main>
  );
};

export default ProductDetail;
