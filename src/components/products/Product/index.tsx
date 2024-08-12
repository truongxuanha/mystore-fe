import { Link } from "react-router-dom";
import { getInFoProduct } from "../../../services/productService";
import { ProductsType } from "types";
import formatVND from "../../../utils/formatVND";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export interface ProductsProp {
  product: ProductsType;
  typeCss: string;
  key: string | number;
}

function Product({ product, typeCss }: ProductsProp) {
  async function handleInfo(slug: string) {
    getInFoProduct(slug);
  }

  return (
    <div key={product.id} className={`${typeCss} bg-white`}>
      <div className='row-span-3 sm:row-span-2 md:row-span-5 w-full flex items-center'>
        <img
          className='rounded-md object-cover hover:translate-y-[-10px] duration-500'
          src={product.thumbnail}
          alt={product.name}
        />
      </div>
      <p className='multiline-truncate h-9 sm:h-28 row-span-2 sm:row-span-1 md:row-span-5 mt-2'>
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
        <div className='flex justify-between items-center gap-3 mt-5 mx-2'>
          <Link
            to={`/san-pham/${product.slug}`}
            onClick={() => handleInfo(product.slug)}
            className='nav-link text-sm cursor-pointer'
          >
            Thông tin
          </Link>
          <span className='cursor-pointer'>
            <ShoppingCartIcon aria-hidden='true' className='h-6 w-6' />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Product;
