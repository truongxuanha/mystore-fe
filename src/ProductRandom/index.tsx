import React, { useEffect } from "react";

import SliderListProduct from "customs/SliderListProduct";
import { texts } from "libs/contains/texts";
import { isEmpty } from "../utils/index";
import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import { getProductRandom } from "redux/product/productThunk";

const ProductRandom: React.FC = () => {
  const { productRandom } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isEmpty(productRandom)) {
      dispatch(getProductRandom());
    }
  }, [dispatch, productRandom]);

  return <SliderListProduct title={texts.product.PRODUCT_OTHER} data={productRandom} />;
};

export default ProductRandom;
