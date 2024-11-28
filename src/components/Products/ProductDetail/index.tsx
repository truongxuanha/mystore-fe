import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import formatVND from "utils/formatVND";

import { Input } from "@headlessui/react";
import useAddToCart from "hooks/useAddCart";
import { useDispatch } from "react-redux";
import { AppDispatch } from "redux/store";
import { useAppSelector } from "hooks/useAppDispatch";
import ProductRandom from "ProductRandom";
import { assets } from "assets";

import ImageLazy from "customs/ImageLazy";
import { ChatBubbleLeftRightIcon, ClockIcon, EllipsisHorizontalIcon, PaperAirplaneIcon, StarIcon } from "@heroicons/react/24/outline";
import { getCommentByIdProductThunk, getInFoProducts } from "redux/product/productThunk";
import { handleOrder } from "redux/order/orderSlice";
import Loader from "components/Loader";
import Button from "customs/Button";
import noAvatar from "assets/no_avatar.jfif";
import Nodata from "customs/Nodata";
import { texts } from "libs/contains/texts";
import { ProductOrderType } from "redux/order/type";

const ProductDetail: React.FC = () => {
  const { addToCart } = useAddToCart();
  const [quantity, setQuantity] = useState<number>(1);
  const [isOpen, setIsOpen] = useState<number | null>(null);
  const [star, setStar] = useState<number>(0);
  const [rating, setRating] = useState<number>(0);
  const [showRating, setShowRating] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { infoProduct, loadingProductDetail, dataCommentById, dataAccountCmts, dataRatingProduct } = useAppSelector((state) => state.product);
  const { currentUser } = useAppSelector((state) => state.auth);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getInFoProducts(Number(id)));
    dispatch(getCommentByIdProductThunk({ product_id: Number(id) }));
  }, [dispatch, id]);
  useEffect(() => {}, [dispatch]);
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
    navigate("/order");
  };
  const ratings: any = {
    1: "Kém",
    2: "Tạm được",
    3: "Trung bình",
    4: "Tốt",
    5: "Rất Tốt",
  };

  if (loadingProductDetail && !infoProduct) return <Loader />;
  const productDescription = () => {
    if (!!infoProduct.description) {
      const paragraphs = infoProduct.description?.split(".");
      const firstParagraph = paragraphs[0] || "";
      return (
        <div>
          <p style={{ fontWeight: "bold" }}>{firstParagraph}</p>

          {paragraphs.slice(1).map((para, index) => (
            <p key={index}>{para}</p>
          ))}
        </div>
      );
    }
    return <Nodata>Sản phẩm hiện không có thông tin chính thức nào!!!</Nodata>;
  };
  const stars = [1, 2, 3, 4, 5];
  return (
    <main>
      <div className="grid grid-cols-1 sm:grid-cols-4  mx-auto overflow-hidden rounded-md bg-white mt-3">
        <div className="p-4 col-span-2 border rounded-2xl m-5 h-full max-h-[500px]">
          <ImageLazy className="w-full h-full object-cover" isObjectFitCover="contain" src={infoProduct?.thumbnail} alt={infoProduct?.product_name} />
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
                  <div>
                    <Button className="bg-red-500 text-white text-xs px-2 py-1 rounded-lg hover:bg-red-300" onClick={handleOrderNow}>
                      {texts.order.ORDER_NOW}
                    </Button>
                  </div>
                  <div>
                    <Button
                      className="bg-colorPrimary text-white text-xs px-2 py-1 rounded-lg hover:bg-orange-300"
                      onClick={() => addToCart(infoProduct?.product_id, quantity)}
                    >
                      {texts.common.ADD_TO_CART}
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
      <div className="p-2 mt-2 bg-white">{productDescription()}</div>
      <div className=" bg-white p-2 mt-2">
        <div className="text-xl font-bold mb-2">{infoProduct.name}</div>
        <div className="flex items-center gap-5 mb-2">
          <div className="flex items-center gap-1">
            <span className="text-colorPrimary text-xl">{dataRatingProduct?.averageRating ?? 0}</span>
            <StarIcon color="#ff8f26" fill="#ff8f26" width={22} height={22} />
          </div>
          <div>{dataRatingProduct?.totalRatings} đánh giá</div>
        </div>
        {stars.map((star, index) => (
          <div className="flex items-center" key={index}>
            <span className="text-base">{stars.length - index}</span>
            <div
              key={star}
              style={{
                display: "grid",
                gridTemplateColumns: "20px 250px 20px",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <StarIcon color="#333" fill="#333" width={20} height={20} />
              <div className="w-[250px] bg-slate-200  h-[5px]">
                <div
                  className="bg-colorPrimary h-full transition-all duration-1000"
                  style={{
                    width: `${dataRatingProduct?.stars?.[stars.length - index]?.percentage * 2.5}px`,
                  }}
                ></div>
              </div>
              <span>{dataRatingProduct?.stars?.[stars.length - index]?.percentage}%</span>
            </div>
          </div>
        ))}

        <div className="flex gap-3 mt-10">
          <div className="w-10 h-10 rounded-full">
            <img className="rounded-full" src={currentUser?.user.avatar ?? noAvatar} alt="avatar" />
          </div>
          <div className="bg-blue-600 flex items-center gap-2 px-2 py-1">
            <PaperAirplaneIcon width={20} height={20} className="text-white" />
            <Button onClick={() => setShowRating(true)} width="150px" className="text-white">
              Viết đánh giá ngay
            </Button>
          </div>
        </div>
        {showRating && (
          <div className="flex flex-col gap-3 border-t-2 p-5 mt-5">
            <div className="flex items-center gap-3">
              {stars.map((item, index) => (
                <StarIcon
                  key={index}
                  color="#ff8f26"
                  fill={star >= index + 1 || rating >= index + 1 ? "#ff8f26" : "#fff"}
                  width={30}
                  height={30}
                  onMouseEnter={() => setStar(index + 1)}
                  onMouseLeave={() => setStar(0)}
                  onClick={() => setRating(index + 1)}
                />
              ))}
              <p>
                <p>{ratings[rating] || "Chưa đánh giá"}</p>
              </p>
            </div>
            <div className="flex mt-3 gap-2 w-2/4">
              <textarea className="border rounded-sm px-2 py-2 flex-1" />
              <div className="w-20 h-10">
                <Button className="bg-colorPrimary py-2">Gửi</Button>
              </div>
            </div>
          </div>
        )}
        <div>
          {dataAccountCmts.length > 0 &&
            dataAccountCmts.length > 0 &&
            dataAccountCmts.map((user: any) => {
              const userCmts = dataCommentById?.filter((acc: any) => {
                return user.id_account === acc.id_account && acc.parent_id === null;
              });
              return userCmts.map((userCmt: any, index: any) => (
                <div key={index} className="gap-3 font-bold mt-5 mx-5 pb-5 border-b-2 border-colorPrimary last:border-0">
                  <div className="pb-2">
                    <div className="flex gap-2 relative">
                      <img className="w-12 h-12 rounded-full border border-colorPrimary" alt="avatar" src={userCmt.avatar ? userCmt.avatar : assets.noAvatar} />
                      <div className="">
                        <div>{userCmt.full_name}</div>
                        <div className="flex gap-3 mt-2">
                          <div className="font-thin text-xs text-gray-500 flex gap-1 items-center">
                            <ClockIcon width={13} height={13} />
                            <p>{userCmt.createAt}</p>
                          </div>
                        </div>
                      </div>
                      <div className="absolute right-0 -top-4 z-10">
                        <div className="font-thin text-sm px-2 pt-2 rounded-md relative cursor-pointer">
                          <EllipsisHorizontalIcon width={20} height={20} onClick={() => setIsOpen(userCmts.id)} />
                          <div className={`absolute w-28 ${isOpen === userCmts.id ? "flex" : "hidden"} flex-col bg-white shadow-lg -right-2`}>
                            <Button className="hover:bg-slate-100 p-1">Chỉnh sửa</Button>
                            <Button className="hover:bg-slate-100 p-1">Xóa</Button>
                            <Button className="hover:bg-slate-100 p-[2px]">Ẩn đánh giá</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ml-12">
                      <div className="font-thin text-sm px-2 pt-2 rounded-md relative">
                        <p>{userCmt.content}</p>
                        <button className="absolute bottom-1 right-2 cursor-pointer flex gap-1">
                          <ChatBubbleLeftRightIcon className="w-4 h-4 text-red-500" />
                          <p>Trả lời</p>
                        </button>
                      </div>
                    </div>
                  </div>
                  {dataCommentById
                    .filter((data: any) => {
                      return data.parent_id === userCmt.id;
                    })
                    .map((cmt: any, index: any) => (
                      <div key={index} className="border-t ml-12 gap-3 font-bold mt-5 pt-2">
                        <div className="border-l-4 px-2 pt-2">
                          <div className="flex gap-2 relative">
                            <img className="w-12 h-12 rounded-full border border-colorPrimary" alt="avatar" src={cmt.avatar ? cmt.avatar : assets.noAvatar} />
                            <div>
                              <div>{cmt.full_name}</div>
                              <div className="font-thin text-xs text-gray-500 flex gap-1 items-center">
                                <ClockIcon width={13} height={13} />
                                <p>{cmt.createAt}</p>
                              </div>
                            </div>
                            {user.id_account === cmt.id_account && <div className="text-xs text-blue-500 font-thin leading-5 ">- Tác giả</div>}
                            <div className="absolute right-0 -top-4 z-10">
                              <div className="font-thin text-sm px-2 pt-2 rounded-md relative cursor-pointer" onClick={() => setIsOpen(cmt.id)}>
                                <EllipsisHorizontalIcon width={20} height={20} />
                                <div className={`absolute w-28 ${isOpen === cmt.id ? "flex" : "hidden"} flex-col bg-white shadow-lg -right-2`}>
                                  <Button className="hover:bg-slate-100 p-1">Chỉnh sửa</Button>
                                  <Button className="hover:bg-slate-100 p-1">Xóa</Button>
                                  <Button className="hover:bg-slate-100 p-[2px]">Ẩn đánh giá</Button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="ml-12">
                            <div className="font-thin text-sm px-2 pt-2 rounded-md relative">
                              <p>{cmt.content}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ));
            })}
        </div>
      </div>

      <ProductRandom />
    </main>
  );
};

export default ProductDetail;
