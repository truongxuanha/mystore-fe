import ImageLazy from "customs/ImageLazy";
import Albums from "../Albums";
import { isEmpty } from "utils";
import formatVND from "utils/formatVND";
import { MinusIcon, PlusIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Input } from "@headlessui/react";
import { texts } from "libs/contains/texts";
import useAddToCart from "hooks/useAddCart";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch } from "hooks/useAppDispatch";
import { handleOrder } from "redux/order/orderSlice";
import { OrderTypeEnum, ProductOrderType } from "redux/order/type";
import { ProductsType } from "types";
import Button from "customs/Button";
import { cupons } from "libs/contains/coupons";

const InforProduct = ({ infoProduct }: { infoProduct: ProductsType }) => {
  const { addToCart } = useAddToCart();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState<number>(1);
  const dispatch = useAppDispatch();
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((quantity: number) => quantity - 1);
    }
    return;
  };

  const increaseQuantity = () => {
    if (quantity <= infoProduct.remaining_quantity) setQuantity((quantity: number) => quantity + 1);
  };
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!isNaN(Number(value)) && value.trim() !== "") {
      setQuantity(Number(value));
    } else if (value.trim() === "") {
      return;
    }
  };
  const handleOrderNow = () => {
    const products: ProductOrderType[] = [
      {
        ...infoProduct,
      },
    ];
    dispatch(handleOrder({ data: products, typeOrder: OrderTypeEnum.BUYNOW }));

    navigate("/order");
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4  mx-auto overflow-hidden rounded-md bg-white mt-3">
      <div className="p-4 col-span-2 border rounded-2xl m-5 h-full max-h-[500px] flex flex-col">
        <div className="h-[375px]">
          {isEmpty(infoProduct.images) ? (
            <ImageLazy className="w-full" isObjectFitCover="contain" src={infoProduct?.thumbnail} alt={infoProduct?.product_name} />
          ) : (
            <Albums images={infoProduct.images} />
          )}
        </div>
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
        <div className="flex flex-col items-start gap-2 m-2">
          {infoProduct?.remaining_quantity > 0 ? (
            <>
              <div className="flex items-center my-5 gap-5">
                <span>Số lượng:</span>
                <div className="border flex items-center">
                  <Button onClick={decreaseQuantity} className="bg-colorBody px-3 py-2 border-r font-medium text-xl">
                    <MinusIcon width={20} />
                  </Button>
                  <Input name="quantity" disabled className="w-14 text-center" onChange={handleQuantityChange} value={quantity} />
                  <Button onClick={increaseQuantity} className="bg-colorBody border-l px-3 py-2 font-medium text-xl">
                    <PlusIcon width={20} />
                  </Button>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="h-10">
                  <Button
                    className="bg-[#ff57221a] text-center border border-[#ee4d2d] text-[#ee4d2d] px-10 text-xs hover:opacity-70"
                    onClick={() => addToCart(infoProduct?.id_product, quantity)}
                  >
                    <ShoppingCartIcon width={20} className="mr-2" />
                    <span>{texts.common.ADD_TO_CART}</span>
                  </Button>
                </div>
                <div className="h-10">
                  <Button className="bg-[#ee4d2d] px-5 text-center text-white text-xs hover:opacity-70" onClick={handleOrderNow}>
                    {texts.order.ORDER_NOW}
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <span className="px-2 py-[3px] text-white bg-red-500 rounded-md opacity-70 cursor-not-allowed">{texts.product.OUT_OF_STOCK}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default InforProduct;
