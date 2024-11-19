import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";

import { texts } from "contains/texts";
import { getHotProducts } from "redux/product/productThunk";
import SliderListProduct from "customs/SliderListProduct";
import { IsListType } from "types";

const HotProducts: React.FC = () => {
  const dispatch = useAppDispatch();
  const { productHots, loadingProductHot } = useAppSelector((state) => state.product);
  useEffect(() => {
    dispatch(getHotProducts());
  }, [dispatch]);

  return <SliderListProduct isList={IsListType.LIST_HOT} title={texts.product.BEST_SELLER} data={productHots} loading={loadingProductHot} />;
};

export default HotProducts;
