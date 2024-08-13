import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getInFoProduct } from "../../../services/productService";
import formatVND from "../../../utils/formatVND";
import { ProductsType } from "../../../types";
import Loader from "../../Loader";
import { Button } from "@headlessui/react";
import useAddToCart from "../../../hooks/useAddCart";

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<ProductsType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const { addToCart } = useAddToCart();

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      if (slug) {
        try {
          const data = await getInFoProduct(slug);
          if (data?.data.status === true) {
            setProduct(data?.data.data[0]);
          } else {
            setError("Product not found.");
          }
        } catch (err) {
          setError("Failed to fetch product details.");
        } finally {
          setLoading(false);
        }
      }
    }
    fetchProduct();
  }, [slug]);

  if (loading) return <Loader />;
  if (error)
    return (
      <div className='flex flex-col items-center'>
        <div>Error: {error}</div>
        <button
          className='mt-4 bg-red-500 text-white px-4 py-2 rounded-lg'
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  if (!product) return <div>No product found.</div>;

  return (
    <div className='grid grid-cols-1 sm:grid-cols-4 max-w-5xl mx-auto overflow-hidden shadow-lg rounded-md'>
      <div className='p-4 col-span-2'>
        <img
          className='w-full h-full object-cover'
          src={product.thumbnail}
          alt={product.name}
        />
      </div>
      <div className='px-4 py-2 col-span-2 mt-10'>
        <h2 className='text-lg font-semibold text-gray-800'>
          {product.product_name}
        </h2>
        <div className='flex items-baseline mt-2 gap-x-10'>
          <div className='text-red-500 font-bold text-xl'>
            {formatVND(product.price, product.discount)}
          </div>
          <div className='text-gray-500 line-through'>
            {formatVND(product.price, 0)}
          </div>
          <div className='text-colorPrimary text-sm font-semibold'>
            -{product.discount}%
          </div>
        </div>
        <div className='mt-4 grid grid-rows-3 gap-1'>
          <div>
            <span className='text-sm'>Chính hãng</span>
          </div>
          <div>
            <span className='text-sm'>Giao hàng nhanh</span>
          </div>
          <div>
            <span className='text-sm'>Miễn phí ship</span>
          </div>
        </div>

        <div className='mt-4 flex justify-start'>
          <span className='text-sm'>2 màu</span>
          <div className='flex ml-2'>
            <div className='w-6 h-6 bg-black rounded-full mx-1'></div>
            <div className='w-6 h-6 bg-pink-300 border border-gray-300 rounded-full mx-1'></div>
          </div>
        </div>

        <div className='mt-4 flex items-center justify-end gap-x-2'>
          <Button
            className='bg-red-500 text-white px-4 py-2 rounded-lg'
            onClick={() => {
              console.log("Purchase action triggered");
            }}
          >
            Mua ngay
          </Button>
          <button
            className='bg-colorPrimary text-white px-4 py-2 rounded-lg'
            onClick={() => addToCart(product.id)}
          >
            Thêm giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
