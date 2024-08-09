import { Link } from "react-router-dom";
import { getInFoProduct } from "../services/productService";
import { ProductsType } from "types/AllType.type";
import formatVND from "../utils/formatVND";

interface ProductsProp {
  product: ProductsType;
}

function Product({ product }: ProductsProp) {
  async function handleInfo(slug: string) {
    getInFoProduct(slug);
  }

  return (
    <div
      key={product.id}
      className='grid grid-rows-6 sm:grid-rows-4 md:grid-rows-12 gap-2 h-full w-full p-2 md:px-5 pt-2 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out'
    >
      <div className='row-span-3 sm:row-span-2 md:row-span-5 w-full flex items-center'>
        <img
          className='rounded-md object-cover'
          src={product.thumbnail}
          alt={product.name}
        />
      </div>
      <p className='row-span-2 sm:row-span-1 md:row-span-5 text-xl sm:text-xl lg:text-xl mt-2'>
        {product.name}
      </p>
      <div className='row-span-1 sm:row-span-1 md:row-span-2 my-auto'>
        <span className='text-xs sm:text-base md:text-[18px] flex justify-between'>
          <p className='text-red-600'>
            {formatVND(product.price, product.discount)}
          </p>
          <p className='line-through text-gray-500'>
            {formatVND(product.price, 0)}
          </p>
        </span>
        <div className='flex justify-end gap-2 mt-5'>
          <Link
            to={`/san-pham/${product.slug}`}
            onClick={() => handleInfo(product.slug)}
          >
            <button className='btn-product'>Thông tin</button>
          </Link>
          <button className='btn-product'>Thêm giỏ hàng</button>
        </div>
      </div>
    </div>
  );
}

export default Product;
