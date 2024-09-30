import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Loader from "../Loader";
import Product from "./ProductCard";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@headlessui/react";
import { useAppSelector } from "../../hooks/useAppDispatch";
import { getProducts } from "../../redux/reducer/productReducer/productThunk";
import { AppDispatch } from "../../redux/store";
import { TOTAL_ITEM_PRODUCT } from "../../contains";
import { getManuThunk } from "../../redux/reducer/manuReducer/manuThunk";

const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeIndex, setActiveIndex] = useState<number>(0); // Luôn chọn "Tất cả" ban đầu
  const currentPage: number = parseInt(searchParams.get("page") || "1");
  const itemsPerPage: number = TOTAL_ITEM_PRODUCT;
  const [manufacturer, setManufacturer] = useState<string>("all");

  const { products, totalPage, isLoading } = useAppSelector(
    (state) => state.product
  );
  const { manuItems } = useAppSelector((state) => state.manufacturer);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const para = { currentPage, itemsPerPage, manufacturer };
    dispatch(getProducts(para)).unwrap();
    dispatch(getManuThunk());
  }, [
    currentPage,
    itemsPerPage,
    searchParams,
    manufacturer,
    setSearchParams,
    dispatch,
  ]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPage) {
      setSearchParams({ page: newPage.toString() });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleItemClick = (index: number, manufacturer: string) => {
    setActiveIndex(index);
    setManufacturer(manufacturer);
    setSearchParams({ hang_san_xuat: manufacturer.toString() });
  };

  if (!products) return <Loader />;
  console.log(manuItems);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div>
            <h1 className='text-center my-5 p-5 border uppercase bg-white'>
              Danh sách sản phẩm
            </h1>
          </div>
          <div className='flex gap-5'>
            <div className='w-[200px]'>
              <ul className='bg-white flex flex-col cursor-pointer'>
                <li
                  className={`border-t border-l border-r pl-5 py-2 ${
                    activeIndex === 0 ? "bg-black  text-white" : ""
                  }`}
                  onClick={() => handleItemClick(0, "all")}
                >
                  Tất cả
                </li>
                {manuItems.map((item, index) => (
                  <li
                    key={index}
                    className={`border-l border-r border-b pl-5 py-2 flex justify-between ${
                      index + 1 === activeIndex ? "bg-black text-white" : ""
                    } ${index === manuItems.length - 1 ? "border-b" : ""}`}
                    onClick={() => handleItemClick(index + 1, item.slug)}
                  >
                    <span>{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className='flex-1'>
              <div className='grid grid-cols-2 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full'>
                {products.map((product) => (
                  <Product
                    key={product.product_name}
                    product={product}
                    typeCss='grid grid-rows-3 gap-2 h-full w-full p-2 md:px-5 pt-2 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out text-xs sm:text-base hover:transform hover:scale-105 duration-300'
                  />
                ))}
              </div>

              <div className='flex justify-center mt-8'>
                <button
                  className={`px-3 py-1 mx-1 border rounded ${
                    currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronDoubleLeftIcon className='w-3 h-3' />
                </button>

                {Array.from({ length: totalPage }, (_, i) => i + 1).map(
                  (_, index) => (
                    <button
                      key={index}
                      className={`px-3 py-1 mx-1 border rounded ${
                        currentPage === index + 1
                          ? "bg-colorPrimary text-white"
                          : "bg-white text-black"
                      }`}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  )
                )}

                <Button
                  className={`px-3 py-1 mx-1 border rounded ${
                    currentPage === totalPage
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPage}
                >
                  <ChevronDoubleRightIcon className='w-3 h-3' />
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Products;
