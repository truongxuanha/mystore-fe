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
  useEffect(function () {
    async function fetchProduct() {
      setIsLoading(true);
      try {
        const res = await fetch(
          "https://mystore-api-v1.onrender.com/v1/product"
        );
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
      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-5 items-center'>
        {products.map((product) => (
          <div
            key={product.id}
            className='p-5 border rounded-lg mx-auto cursor-pointer shadow-md hover:translate-y-[-5px] transition-transform'
          >
            <img
              className='w-[200px] hover:translate-y-[-5px] transition-transform'
              src={product.thumbnail}
            />
            <p className='font-semibold '>{product.name}</p>
            <span className='text-red-600 font-bold'>
              {formatVND(product.price)}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

export default Products;
