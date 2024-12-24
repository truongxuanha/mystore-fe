import { useMemo, useState } from "react";
import { Button } from "@headlessui/react";
import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import { removeCartItem, updateCartItem } from "redux/cart/cartThunk";
import formatVND from "utils/formatVND";
import Loader from "components/Loader";
import ProductRandom from "ProductRandom";
import CartItem from "./CartItem";
import { handleOrder } from "redux/order/orderSlice";
import { Link, useNavigate } from "react-router-dom";
import { PAGE } from "libs/contains";
import { texts } from "libs/contains/texts";
import { OrderTypeEnum, ProductOrderType } from "redux/order/type";
import Input from "customs/Input";
import Breadcrumd from "customs/Breacrumb";
import noCartItem from "assets/no-order.png";
import { isEmpty } from "utils";
function Cart() {
  document.title = "Giỏ hàng";
  const dispatch = useAppDispatch();
  const { cartItems, loadingCart } = useAppSelector((state) => state.cart);
  const [selected, setSelected] = useState<ProductOrderType[]>([]);
  const navigate = useNavigate();
  function handleDeleteItemCart(id: number): void {
    dispatch(removeCartItem(id));
  }

  function handleUpdateQuantity(id: number, quantity: number, isUpdate: boolean = true): void {
    if (!isUpdate) return;
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
    <div className="bg-[#f7f7f7]">
      <Breadcrumd
        breadcrumbs={[
          { urlLink: "/", title: "Trang chủ" },
          { urlLink: "/product?manufacture=all", title: "Sản phẩm" },
        ]}
        page="Giỏ hàng"
      />
      <div className="container pt-5">
        {isEmpty(cartItems) ? (
          <div className="flex flex-col items-center justify-center bg-white py-10">
            <img className="w-40" src={noCartItem} />
            <Link to="/product?manufacture=all" className="bg-colorPrimary px-3 py-1 hover:opacity-80 rounded-sm text-white my-4">
              Mua ngay
            </Link>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto md:overflow-hidden w-full">
              <div className="grid grid-cols-12 mt-5 py-2 px-5 min-w-[1200px] place-items-center bg-white">
                <div className="col-span-1">
                  <Input type="checkbox" checked={selected.length === cartItems.length && cartItems.length > 0} onChange={handleSelectedAll} />
                </div>
                <div className="col-span-1">Sản phẩm</div>
                <div className="col-span-4"></div>
                <div className="col-span-1">Đơn giá</div>
                <div className="col-span-2">Số lượng</div>
                <div className="col-span-1">Số tiền</div>
                <div className="col-span-2">Thao tác</div>
              </div>
              {cartItems &&
                cartItems.length > 0 &&
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
                })}
            </div>
            <div className="my-10 w-full bg-white p-4 rounded-md gap-2 flex justify-between items-center">
              <div className="flex flex-col h-full">
                <span className="text-xs md:text-base">
                  <span className="pr-2">{texts.common.TOTAL_PRODUCT}:</span>
                  <span>{cartItems.length} (sản phẩm)</span>
                </span>
                <span className="text-xs md:text-base">
                  <span className="pr-2">{texts.common.TOTAL_AMOUNT}:</span>
                  <span className="text-red-500">{formatVND(totalPrice, 0)}</span>
                </span>
              </div>
              <div>
                <Button className="bg-[#ee4d2d] px-10 py-2 md:mr-10 rounded-md text-center text-white text-xs hover:opacity-70" onClick={handleOrderNow}>
                  {texts.order.ORDER_NOW}
                </Button>
              </div>
            </div>
          </>
        )}
        <ProductRandom />
      </div>
    </div>
  );
}

export default Cart;
