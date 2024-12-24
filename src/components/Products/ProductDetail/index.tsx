import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "redux/store";
import { useAppSelector } from "hooks/useAppDispatch";
import ProductRandom from "ProductRandom";
import { getInFoProducts } from "redux/product/productThunk";
import Loader from "components/Loader";
import { texts } from "libs/contains/texts";
import { createCmtByIdProductThunk, getCommentByIdProductThunk } from "redux/comment/commentThunk";
import RatingComment from "./RatingComment";
import RenewStarRating from "./RenewStarRating";
import LoadingBlock from "customs/LoadingBlock";
import InforProduct from "./InforProduct";

const ProductDetail: React.FC = () => {
  const [rating, setRating] = useState<number>(0);
  const dispatch = useDispatch<AppDispatch>();
  const { infoProduct, loadingProductDetail } = useAppSelector((state) => state.product);
  const { loadingCmt } = useAppSelector((state) => state.comment);
  const [contentComment, setContentComment] = useState<string>("");
  const { id } = useParams();
  useEffect(() => {
    dispatch(getInFoProducts(Number(id)));
    dispatch(getCommentByIdProductThunk({ product_id: Number(id) }));
  }, [dispatch, id]);
  useEffect(() => {}, [dispatch]);
  if (!infoProduct) return <div>{texts.product.PRODUCT_NOT_FOUND}</div>;

  const handleCreateCmt = async () => {
    if (rating < 1) return;
    await dispatch(createCmtByIdProductThunk({ star: rating, id_product: infoProduct.id, content: contentComment }));
    await dispatch(getCommentByIdProductThunk({ product_id: Number(id) }));
    setRating(0);
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
          {loadingCmt ? (
            <div className="relative h-56">
              <LoadingBlock />
            </div>
          ) : (
            <RatingComment setRating={setRating} rating={rating} handleCreateCmt={handleCreateCmt} setContentComment={setContentComment} />
          )}
        </div>
        <ProductRandom />
      </div>
    </div>
  );
};

export default ProductDetail;
