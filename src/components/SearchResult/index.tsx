import React from "react";
import { ProductsType } from "../../types";
import { getInFoProduct } from "../../services/productService";
import { Link } from "react-router-dom";

interface SearchResultsProps {
  products: ProductsType[];
  setSearchQuery: (query: string) => void;
  handleCloseNav?: (open: boolean) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  products,
  setSearchQuery,
  handleCloseNav,
}) => {
  async function handleInfo(slug: string) {
    getInFoProduct(slug);
    setSearchQuery("");
    if (handleCloseNav) {
      handleCloseNav(false);
    }
  }
  return (
    <ul className='max-h-60 overflow-y-auto transition-all'>
      
      {products.map((product) => (
        <li
          key={product.id}
          className='p-2 hover:bg-gray-200 cursor-pointer border-b last:border-none'
          onClick={() => handleInfo(product.slug)}
        >
          <Link
            to={`/san-pham/${product.slug}`}
            onClick={() => handleInfo(product.slug)}
            className='nav-link text-sm cursor-pointer'
          >
            <span className='flex'>
              <img className='w-10 rounded-full' src={product.thumbnail} />
              <p>
                {product.name} - {product.price.toLocaleString()} VND
              </p>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;
