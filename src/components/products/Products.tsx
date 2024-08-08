import { useEffect, useState } from "react";
import formatVND from "../../utils/formatVND";
import Loader from "../../pages/Loader";

export interface Products {
  id: number;
  id_account: string;
  id_product: number;
  createAt: string;
  updateAt: string;
  quantity: number;
  pd_id: number;
  name: string;
  id_manu: string;
  thumbnail: string;
  price: number;
  discount: number;
  other_discount: number;
  description: string;
  total_quantity: number;
}

function Products() {
  const [products, setProducts] = useState<Products[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      setIsLoading(true);
      try {
        const res = await fetch(
          "https://mystore-api-v1.onrender.com/v1/product"
        );
        if (!res.ok) return;
        const data = await res.json();
        setProducts(data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProduct();
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <h1 className='text-2xl font-medium mb-10'>Danh sách sản phẩm:</h1>
      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2'>
        {products.length > 0
          ? products.map((product) => (
              <div
                key={product.id}
                className='flex flex-col justify-between p-5 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out'
              >
                <img
                  className='h-48 rounded-md mb-4 object-cover'
                  src={product.thumbnail}
                  alt={product.name}
                />
                <p className='font-semibold text-lg mb-2'>{product.name}</p>
                <span className='text-red-600 font-bold text-xl mb-4'>
                  <p>{formatVND(product.price)}</p>
                </span>
                <div className='flex justify-end gap-1 md:gap-2'>
                  <button className='btn-product'>Thông tin</button>
                  <button className='btn-product'>Thêm giỏ hàng</button>
                </div>
              </div>
            ))
          : ""}
      </div>
    </>
  );
}

export default Products;
