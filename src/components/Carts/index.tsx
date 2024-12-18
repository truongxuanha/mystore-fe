import { useEffect, useMemo, useState } from "react";
import { Button } from "@headlessui/react";
import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import { getProductByAccount, removeCartItem, updateCartItem } from "redux/cart/cartThunk";
import formatVND from "utils/formatVND";
import Loader from "components/Loader";
import ProductRandom from "ProductRandom";
import CartItem from "./CartItem";
import { handleOrder } from "redux/order/orderSlice";
import { useNavigate } from "react-router-dom";
import Nodata from "customs/Nodata";
import { PAGE } from "libs/contains";
import { texts } from "libs/contains/texts";
import { OrderTypeEnum, ProductOrderType } from "redux/order/type";
import Input from "customs/Input";
import Breadcrumd from "customs/Breacrumb";

function Cart() {
  const dispatch = useAppDispatch();
  document.title = "Giỏ hàng";
  const { cartItems, loadingCart } = useAppSelector((state) => state.cart);
  const [selected, setSelected] = useState<ProductOrderType[]>([]);
  const navigate = useNavigate();
  const { token } = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (token) {
      dispatch(getProductByAccount());
    }
  }, [dispatch, token]);

  function handleDeleteItemCart(id: number): void {
    dispatch(removeCartItem(id));
  }

  function handleUpdateQuantity(id: number, quantity: number): void {
    dispatch(updateCartItem({ id, quantity }));
    if (quantity === 0) dispatch(removeCartItem(id));
  }
  const handleOrderNow = () => {
    dispatch(handleOrder({ data: cartItems, typeOrder: OrderTypeEnum.BUYFROMCART }));
    navigate(PAGE.ORDER);
  };
  const totalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const priceAfterDiscount = item.price - (item.price * item.discount) / 100;
      return total + priceAfterDiscount * item.quantity;
    }, 0);
  }, [cartItems]);

  const handleSelectedAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelected(cartItems);
    } else {
      setSelected([]);
    }
  };
  const handleSelectItem = (item: ProductOrderType, isSelected: boolean) => {
    if (isSelected) {
      setSelected((prev) => [...prev, item]);
    } else {
      setSelected((prev) => prev.filter((selectedItem) => selectedItem.id !== item.id));
    }
  };
  if (loadingCart) return <Loader />;
  return (
    <>
      <Breadcrumd breadcrumbs={[{ urlLink: "/", title: "Trang chủ" }]} page="Giỏ hàng" />
      <div className="w-full container pt-5">
        <div className="overflow-x-auto md:overflow-x-hidden border-b">
          <div className="grid grid-cols-12 min-w-[1200px] mt-5 pb-2 px-5 place-items-center gap-x-3 border-b">
            <div className="col-span-1">
              <Input type="checkbox" checked={selected.length === cartItems.length && cartItems.length > 0} onChange={handleSelectedAll} />
            </div>
            <div className="col-span-2">Sản phẩm</div>
            <div className="col-span-3"></div>
            <div className="col-span-1">Đơn giá</div>
            <div className="col-span-2">Số lượng</div>
            <div className="col-span-1">Số tiền</div>
            <div className="col-span-1">Thao tác</div>
          </div>
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((cart) => {
              const priceAfterDiscount = cart.price - (cart.price * cart.discount) / 100;
              return (
                <CartItem
                  key={cart.id}
                  idItemCart={cart.id}
                  priceAfterDiscount={priceAfterDiscount}
                  updateQuantity={handleUpdateQuantity}
                  deleteItemCart={handleDeleteItemCart}
                  handleSelectItem={handleSelectItem}
                  isSelected={selected.some((item) => item.id === cart.id)}
                  {...cart}
                />
              );
            })
          ) : (
            <Nodata>Không có sản phẩm nào!</Nodata>
          )}
        </div>
        <div className="mt-4 w-full bg-white p-4 rounded-md gap-2 flex justify-between items-center">
          <div className="flex flex-col h-full">
            <span className="text-xs md:text-base">
              <strong>{texts.common.TOTAL_PRODUCT}: </strong>
              <span>{cartItems.length} (sản phẩm)</span>
            </span>
            {/* <span className="text-xs md:text-base">
            <strong>{texts.common.DISCOUNT}:</strong> 0
          </span> */}
            <span className="text-xs md:text-base">
              <strong>{texts.common.TOTAL_AMOUNT}:</strong>
              <span className="text-red-500">{formatVND(totalPrice, 0)}</span>
            </span>
          </div>
          <div>
            <Button className="bg-[#ee4d2d] px-10 py-3 md:mr-10 text-center text-white text-xs hover:opacity-70" onClick={handleOrderNow}>
              {texts.order.ORDER_NOW}
            </Button>
          </div>
        </div>
        <ProductRandom />
      </div>
    </>
  );
}

export default Cart;
