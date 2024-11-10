import React, { useState, useEffect } from "react";

import ProductCard from "../Products/ProductCard";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { getHotProducts } from "../../redux/reducer/productReducer/productThunk";
import { texts } from "../../contains/texts";

const HotProducts: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const dispatch = useAppDispatch();
  const { productHots } = useAppSelector((state) => state.product);
  useEffect(() => {
    if (!productHots || productHots.length === 0) {
      dispatch(getHotProducts());
    }
  }, [dispatch, productHots]);
  const handlePrev = () => {
    setActiveIndex((prevIndex) => prevIndex - 1);
  };
  const handleNext = () => {
    setActiveIndex((prevIndex) => prevIndex + 1);
  };
  const totalItems = productHots.length;

  return (
    <div className="my-5 p-5 bg-white rounded-md">
      <div className="relative w-full max-w-5xl mx-auto">
        <h1 className="text xl md:text-2xl mb-5">{texts.product.BEST_SELLER}</h1>
        <div className="relative overflow-hidden w-full min-h-48 sm:min-h-64 md:min-h-96 lg:min-h-96 bg-white rounded-lg">
          <div className="flex">
            {productHots.length > 0 &&
              productHots.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  productCategory={texts.product.HOT}
                  style={{
                    transform: `translateX(-${activeIndex * 100}%)`,
                  }}
                  typeCss="w-1/2 md:w-1/5 flex-shrink-0 p-4 grid md:grid-rows-3 text-xs sm:text-xl lg:text-xl border border-gray-200"
                />
              ))}
          </div>
        </div>
        {activeIndex > 1 && (
          <button
            type="button"
            className="absolute inset-y-0 left-0 flex justify-center items-center w-[46px] h-3 top-1/2 text-gray-800 focus:outline-none"
            onClick={handlePrev}
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
        )}

        {activeIndex <= totalItems - 6 && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex justify-center items-center w-[46px] h-3 top-1/2 text-gray-800 focus:outline-none"
            onClick={handleNext}
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
};

export default HotProducts;
