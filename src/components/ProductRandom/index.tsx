import React, { useState, useEffect } from "react";
import { randomProduct } from "redux/product/api";
import { ProductsType } from "types";
import { texts } from "contains/texts";
import SliderListProduct from "customs/SliderListProduct";

const ProductRandom: React.FC = () => {
  const [productRandom, setProductRandom] = useState<ProductsType[]>([]);

  useEffect(() => {
    async function fetcRandom() {
      const res = await randomProduct();
      setProductRandom(res.data);
    }
    fetcRandom();
  }, []);

  return <SliderListProduct title={texts.product.PRODUCT_NEW} data={productRandom} />;
};

export default ProductRandom;
