import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Loader from "../Loader";
import ProductCard from "./ProductCard";

import { useAppSelector } from "../../hooks/useAppDispatch";
import { getProducts } from "../../redux/reducer/productReducer/productThunk";
import { AppDispatch } from "../../redux/store";
import { TOTAL_ITEM_PRODUCT } from "../../contains";
import { getManuThunk } from "../../redux/reducer/manuReducer/manuThunk";
import { PAGE } from "../../types/contain.type";
import { texts } from "../../contains/texts";
import Pagination from "../../customs/Pagination";
import { isEmpty } from "../../utils";
import Nodata from "../../customs/Nodata";
import Button from "../../customs/Button";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline";

const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeIndex, setActiveIndex] = useState<any>("all");
  const currentPage: number = parseInt(searchParams.get(PAGE.page) || "1");
  const itemsPerPage: number = TOTAL_ITEM_PRODUCT;
  const [manufacturer, setManufacturer] = useState<string | number>(PAGE.all);
  const [sortOf, setSortOf] = useState<string>(searchParams.get(PAGE.page) || "");
  const { products, totalPage, isLoading } = useAppSelector((state) => state.product);
  const { manuItems } = useAppSelector((state) => state.manufacturer);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const params = searchParams.get("hang_san_xuat") as string;
    const para = { currentPage, itemsPerPage, sort: sortOf, manufacturer: params };
    dispatch(getProducts(para)).unwrap();
    if (manuItems.length === 0) {
      dispatch(getManuThunk());
    }
  }, [currentPage, itemsPerPage, searchParams, manufacturer, setSearchParams, dispatch, sortOf, manuItems]);

  const handleItemClick = (manufacturer: string | number) => {
    setManufacturer(manufacturer);
    setSearchParams({ hang_san_xuat: manufacturer.toString() });
  };

  useEffect(() => {
    const param = searchParams.get("hang_san_xuat");
    setActiveIndex(param);
  }, [searchParams]);
  if (!products) return <Loader />;
  const handleSort = (value: string) => {
    setSortOf(value);
    searchParams.set("sort", value);
    setSearchParams(searchParams);
  };
  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between  my-5">
        <div className="">
          <div className="my-2 ">{texts.common.SORT}</div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => handleSort("ASC")}
              img={<ArrowUpIcon className="w-4 h-4" />}
              styles={`bg-white shadow-md rounded-md text-sm  ${sortOf === "ASC" ? "bg-red-100 border border-red-600" : ""}`}
              width="165px"
              height="40px"
            >
              {texts.common.ASCENDING}
            </Button>
            <Button
              onClick={() => handleSort("DESC")}
              img={<ArrowDownIcon className="w-4 h-4" />}
              styles={`bg-white shadow-md rounded-md text-sm  ${sortOf === "DESC" ? "bg-red-100 border border-red-600" : ""}`}
              width="165px"
              height="40px"
            >
              {texts.common.DECREASING}
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col  gap-5  md:flex-row">
        <div className="w-full md:w-[200px]">
          <ul className="bg-white w-full grid grid-cols-2 md:grid-cols-1 cursor-pointer">
            <li
              className={`border-t border-l border-r pl-5 py-2 ${activeIndex === "all" ? "bg-black  text-white" : ""}`}
              onClick={() => handleItemClick("all")}
            >
              {texts.product.ALL}
            </li>
            {!isEmpty(manuItems) &&
              manuItems.map((item, index) => (
                <li
                  key={index}
                  className={`border-l border-r border-b pl-5 py-2 flex justify-between ${item.id.toString() === activeIndex ? "bg-black text-white" : ""} ${
                    index === manuItems.length - 1 ? "border-b" : ""
                  }`}
                  onClick={() => handleItemClick(item.id)}
                >
                  <span>{item.name}</span>
                </li>
              ))}
          </ul>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="flex-1">
            {!isEmpty(products) ? (
              <>
                <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
                  {products.map((product) => (
                    <ProductCard
                      key={product.product_name}
                      product={product}
                      typeCss=" gap-2 h-full w-full p-2 md:px-5 pt-2 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out text-xs sm:text-base hover:transform hover:scale-105 duration-300"
                    />
                  ))}
                </div>
                {totalPage > 1 && <Pagination currentPage={currentPage} totalPage={totalPage} />}
              </>
            ) : (
              <Nodata>{texts.product.NO_PRODUCT}</Nodata>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Products;
