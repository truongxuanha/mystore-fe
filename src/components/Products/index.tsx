import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Loader from "../Loader";
import Product from "./ProductCard";
import { useAppSelector } from "../../hooks/useAppDispatch";
import { getProducts } from "../../redux/reducer/productReducer/productThunk";
import { AppDispatch } from "../../redux/store";
import { TOTAL_ITEM_PRODUCT } from "../../contains";
import { getManuThunk } from "../../redux/reducer/manuReducer/manuThunk";
import { PAGE } from "../../types/contain.type";
import { texts } from "../../contains/texts";
import Pagination from "../../customs/Pagination";
import { isEmpty } from "../../utils";

const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const currentPage: number = parseInt(searchParams.get(PAGE.page) || "1");
  const itemsPerPage: number = TOTAL_ITEM_PRODUCT;
  const [manufacturer, setManufacturer] = useState<string | number>(PAGE.all);
  const [sortOf, setSortOf] = useState<string>("");
  const { products, totalPage, isLoading } = useAppSelector((state) => state.product);
  const { manuItems } = useAppSelector((state) => state.manufacturer);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const para = { currentPage, itemsPerPage, sort: sortOf, manufacturer };
    dispatch(getProducts(para)).unwrap();
    if (manuItems.length === 0) {
      dispatch(getManuThunk());
    }
  }, [currentPage, itemsPerPage, searchParams, manufacturer, setSearchParams, dispatch, sortOf, manuItems]);
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPage) {
      setSearchParams({ page: newPage.toString() });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleItemClick = (index: number, manufacturer: string | number) => {
    setActiveIndex(index);
    setManufacturer(manufacturer);
    setSearchParams({ hang_san_xuat: manufacturer.toString() });
  };

  if (!products) return <Loader />;
  return (
    <>
      <div className="bg-white flex border items-center justify-between  my-5 p-5">
        <h1 className="text-center uppercase ">{texts.product.PRODUCT_LIST}</h1>
        <div className="flex gap-3 items-center">
          <span>{texts.common.SORT}: </span>
          <select className="border pr-5 py-2 rounded-md" onChange={(e) => setSortOf(e.target.value)}>
            <option value=""></option>
            <option value="ASC">{texts.common.ASCENDING}</option>
            <option value="DESC">{texts.common.DECREASING}</option>
          </select>
        </div>
      </div>
      <div className="flex gap-5">
        <div className="w-[200px]">
          <ul className="bg-white flex flex-col cursor-pointer">
            <li className={`border-t border-l border-r pl-5 py-2 ${activeIndex === 0 ? "bg-black  text-white" : ""}`} onClick={() => handleItemClick(0, "all")}>
              {texts.product.ALL}
            </li>
            {!isEmpty(manuItems) &&
              manuItems.map((item, index) => (
                <li
                  key={index}
                  className={`border-l border-r border-b pl-5 py-2 flex justify-between ${index + 1 === activeIndex ? "bg-black text-white" : ""} ${
                    index === manuItems.length - 1 ? "border-b" : ""
                  }`}
                  onClick={() => handleItemClick(index + 1, item.id)}
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
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
              {!isEmpty(products) ? (
                products.map((product) => (
                  <Product
                    key={product.product_name}
                    product={product}
                    typeCss="grid grid-rows-3 gap-2 h-full w-full p-2 md:px-5 pt-2 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out text-xs sm:text-base hover:transform hover:scale-105 duration-300"
                  />
                ))
              ) : (
                <div>{texts.product.NO_PRODUCT}</div>
              )}
            </div>
            {totalPage > 1 && <Pagination currentPage={currentPage} totalPage={totalPage} onClick={handlePageChange} />}
          </div>
        )}
      </div>
    </>
  );
};

export default Products;
