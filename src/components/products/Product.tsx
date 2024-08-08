import { ProductsType } from "../../types/ProductType.type";
import formatVND from "../../utils/formatVND";

interface ProductsProp {
  product: ProductsType;
}

function Product({ product }: ProductsProp) {
  return (
    <div
      key={product.id}
      className='grid grid-col-1 grid-rows-12 justify-between px-5 pt-2 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out'
    >
      <img
        className='row-span-5 h-48 rounded-md object-cover'
        src={product.thumbnail}
        alt={product.name}
      />
      <p className='row-span-5 text-lg mt-2'>{product.name}</p>
      <div className='row-span-2'>
        <span className='text-red-600 text-xl'>
          <p>{formatVND(product.price)}</p>
        </span>
        <div className='flex gap-1 mt-2'>
          <button className='btn-product'>Thông tin</button>
          <button className='btn-product'>Thêm giỏ hàng</button>
        </div>
      </div>
    </div>
  );
}

export default Product;
