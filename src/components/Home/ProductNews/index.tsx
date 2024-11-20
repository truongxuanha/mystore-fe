import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import { getProductNews } from "redux/product/productThunk";
import SliderListProduct from "customs/SliderListProduct";
import { IsListType } from "types";
import { texts } from "libs/contains/texts";

const ProductNews: React.FC = () => {
  const dispatch = useAppDispatch();
  const { productNews, loadingProductNew } = useAppSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProductNews());
  }, [dispatch]);

  return <SliderListProduct isList={IsListType.LIST_NEW} title={texts.product.PRODUCT_NEW} data={productNews} loading={loadingProductNew} />;
};

export default ProductNews;
