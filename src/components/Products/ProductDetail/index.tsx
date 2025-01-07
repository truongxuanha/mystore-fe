import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "redux/store";
import { useAppSelector } from "hooks/useAppDispatch";
import ProductRandom from "ProductRandom";
import { getInFoProducts } from "redux/product/productThunk";
import Loader from "customs/Loader";
import { texts } from "libs/contains/texts";
import { createCmtByIdProductThunk, getCommentByIdProductThunk } from "redux/comment/commentThunk";
import RatingComment from "./RatingComment";
import RenewStarRating from "./RenewStarRating";
import InforProduct from "./InforProduct";

const ProductDetail: React.FC = () => {
  const [rating, setRating] = useState<number>(0);
  const dispatch = useDispatch<AppDispatch>();
  const { infoProduct, loadingProductDetail } = useAppSelector((state) => state.product);
  const [contentComment, setContentComment] = useState<any>("");
  const { id } = useParams();
  useEffect(() => {
    dispatch(getInFoProducts(Number(id)));
    dispatch(getCommentByIdProductThunk({ product_id: Number(id) }));
  }, [dispatch, id]);
  useEffect(() => {}, [dispatch]);
  if (!infoProduct) return <div>{texts.product.PRODUCT_NOT_FOUND}</div>;

  const handleCreateCmt = async (parent_id?: number, isAnswer?: boolean) => {
    if ((rating < 1 && !isAnswer) || contentComment === "") return;
    const callBack = () => {
      dispatch(getCommentByIdProductThunk({ product_id: Number(id) }));
      setContentComment("");
      setRating(0);
    };
    dispatch(createCmtByIdProductThunk({ star: rating === 0 ? undefined : rating, id_product: infoProduct.id, content: contentComment, parent_id, callBack }));
  };
  if (loadingProductDetail && !infoProduct) return <Loader />;
  // const breadcrumbs = [
  //   {
  //     urlLink: "/",
  //     title: "Trang chủ",
  //   },
  //   {
  //     urlLink: "/",
  //     title: "Sản phẩm",
  //   },
  // ];
  return (
    <div className="bg-linear mx-auto">
      <div className="container">
        <InforProduct infoProduct={infoProduct} />
        <div className="bg-white p-5 mt-5 ">
          <RenewStarRating id_product={infoProduct.id} />
          <RatingComment
            setRating={setRating}
            rating={rating}
            handleCreateCmt={handleCreateCmt}
            setContentComment={setContentComment}
            contentComment={contentComment}
          />
        </div>
        <ProductRandom />
      </div>
    </div>
  );
};

export default ProductDetail;
