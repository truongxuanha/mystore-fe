import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Loader from "../Loader";
import ProductCard from "./ProductCard";
import { useAppSelector } from "../../hooks/useAppDispatch";
import { AppDispatch } from "../../redux/store";
import { PAGE } from "../../types/contain.type";
import Pagination from "../../customs/Pagination";
import { isEmpty } from "../../utils";
import Nodata from "../../customs/Nodata";
import { getProducts } from "../../redux/product/productThunk";
import { getManuThunk } from "../../redux/manufacture/manuThunk";
import { TOTAL_ITEM_PRODUCT } from "libs/contains";
import { texts } from "libs/contains/texts";

const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeIndex, setActiveIndex] = useState<any>("all");
  const currentPage: number = parseInt(searchParams.get(PAGE.page) || "1");
  const itemsPerPage: number = TOTAL_ITEM_PRODUCT;
  const [manufacturer, setManufacturer] = useState<string | number>(PAGE.all);
  const [sortOf, setSortOf] = useState<string>("");
  const { products, totalPage, isLoading } = useAppSelector((state) => state.product);
  const { manuItems } = useAppSelector((state) => state.manufacturer);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const params = searchParams.get("manufacture") as string;
    const para = { currentPage, itemsPerPage, sort: sortOf, manufacturer: params };
    dispatch(getProducts(para)).unwrap();
    if (manuItems.length === 0) {
      dispatch(getManuThunk());
    }
  }, [currentPage, itemsPerPage, searchParams, manufacturer, setSearchParams, dispatch, sortOf, manuItems]);

  const handleItemClick = (manufacturer: string | number) => {
    setManufacturer(manufacturer);
    setSearchParams({ manufacture: manufacturer.toString() });
  };

  useEffect(() => {
    const param = searchParams.get("manufacture");
    setActiveIndex(param);
  }, [searchParams]);

  const handleSort = (value: string) => {
    setSortOf(value);
    searchParams.set("sort", value);
    setSearchParams(searchParams);
  };
  document.title = "Sản phẩm";
  if (!products) return <Loader />;

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between mt-5 mb-3">
        <div className="pl-4 py-2 nav-item font-medium text-xl border-b">Thương Hiệu</div>
        <div className="flex">
          <div className="m-2">{texts.common.SORT}</div>
          <select value={sortOf} onChange={(e) => handleSort(e.target.value)} className="bg-white rounded-md text-sm p-2 border border-gray-300">
            <option value="">{texts.common.DEFAULT}</option>
            <option value="ASC">{texts.common.ASCENDING}</option>
            <option value="DESC">{texts.common.DECREASING}</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-5 md:flex-row">
        <div className="w-full md:w-[200px]">
          <ul className="bg-white w-full grid grid-cols-2 md:grid-cols-1 cursor-pointer">
            <li className={`pl-5 py-2 ${activeIndex === "all" ? "acitve-nav" : "nav-link"}`} onClick={() => handleItemClick("all")}>
              {texts.product.ALL}
            </li>
            {!isEmpty(manuItems) &&
              manuItems.map((item, index) => (
                <li
                  key={index}
                  className={`pl-5 py-2 flex justify-between ${
                    item.id.toString() === activeIndex ? "acitve-nav" : "nav-link"
                  } ${index === manuItems.length - 1 ? "border-b" : ""}`}
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
                      typeCss="gap-2 h-full w-full p-2 md:px-5 pt-2 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out text-xs sm:text-base hover:transform hover:scale-105 duration-300"
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
