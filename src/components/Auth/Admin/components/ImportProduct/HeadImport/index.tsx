import Button from "customs/Button";
import { PlusIcon, SearchIcon } from "lucide-react";
import { ProductsType } from "types";
import { isEmpty } from "utils";
type Props = {
  containerRef: any;
  handleFocus: any;
  searchQuery: any;
  isDropdownOpen: any;
  products: ProductsType[];
  handleClickItemSearch: any;
  selectedProduct: any;
  setSearchQuery: any;
  setSelectedProduct: any;
  handleAddProduct: any;
};
const HeadImport = ({
  containerRef,
  handleFocus,
  searchQuery,
  isDropdownOpen,
  products,
  handleClickItemSearch,
  selectedProduct,
  setSearchQuery,
  setSelectedProduct,
  handleAddProduct,
}: Props) => {
  return (
    <div className="flex p-2 gap-5">
      <div className="flex items-center h-10 flex-1 relative" ref={containerRef}>
        <input
          type="search"
          className="border h-full flex-1 px-2 focus:border-red-200"
          placeholder="Tìm kiếm..."
          onFocus={handleFocus}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="h-full flex items-center bg-colorPrimary px-3">
          <SearchIcon color="white" />
        </div>
        {isDropdownOpen && !!searchQuery && (
          <ul className="max-h-80 overflow-y-auto bar transition-all absolute top-10 scrollbar">
            {!isEmpty(products) &&
              products.map((product) => (
                <li
                  key={product.id}
                  className="p-2 hover:bg-orange-100 cursor-pointer border-b last:border-none bg-gray-100"
                  onClick={() => handleClickItemSearch(product.product_id)}
                >
                  <div className="text-sm cursor-pointer">
                    <span className="flex items-center">
                      <p className="ml-2">
                        {product?.product_name} - {product?.price?.toLocaleString()} VND
                      </p>
                    </span>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </div>
      <div>
        <select value={selectedProduct || ""} onChange={(e) => setSelectedProduct(Number(e.target.value))} className="border h-10 mb-2">
          <option value="" disabled>
            Chọn sản phẩm
          </option>
          {products.map((product) => (
            <option key={product.product_id} value={product.product_id}>
              {product.product_name}
            </option>
          ))}
        </select>
      </div>
      <Button width="80px" height="40px" className="bg-blue-500 text-white" onClick={handleAddProduct}>
        <PlusIcon />
      </Button>
    </div>
  );
};

export default HeadImport;
