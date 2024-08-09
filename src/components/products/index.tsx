import { useEffect, useState } from "react";

import Loader from "../Loader";
import Product from "../../hooks";
import { ProductsType } from "../../types/AllType.type";

function Products() {
  const [products, setProducts] = useState<ProductsType[]>([]);
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
      <h1 className='text-2xl font-bold mb-10'>Danh sách sản phẩm:</h1>
      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 w-full'>
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}

export default Products;
