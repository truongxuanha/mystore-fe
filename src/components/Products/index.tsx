import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Loader from "../Loader";
import Product from "./Product";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@headlessui/react";
import { useAppSelector } from "../../hooks/useAppDispatch";
import { getProducts } from "../../redux/reducer/productReducer/productThunk";
import { AppDispatch } from "../../redux/store";
import { TOTAL_ITEM_PRODUCT } from "../../contains";
const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage: number = parseInt(searchParams.get("page") || "1");
  const itemsPerPage: number = TOTAL_ITEM_PRODUCT;

  const { products, totalPage, isLoading } = useAppSelector(
    (state) => state.product
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const para = { currentPage, itemsPerPage };
    dispatch(getProducts(para)).unwrap();
  }, [currentPage, itemsPerPage, searchParams, setSearchParams, dispatch]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPage) {
      setSearchParams({ page: newPage.toString() });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  if (!products) return <Loader />;
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1 className='text-2xl mb-10'>Danh sách sản phẩm:</h1>
          <div className='grid grid-cols-2 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full'>
            {products.map((product) => (
              <Product
                key={product.id}
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
                currentPage === totalPage ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPage}
            >
              <ChevronDoubleRightIcon className='w-3 h-3' />
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default Products;
