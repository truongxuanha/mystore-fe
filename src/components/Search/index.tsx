import { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ProductsType } from "../../types";
import SearchResults from "../SearchResult";
import { getResultSearch } from "../../services/searchService";
import Loader from "../../components/Loader";
import useDebounce from "../../hooks/useDebouncs";

export interface SearchProps {
  handleCloseNav?: (open: boolean) => void;
}
function Search({ handleCloseNav }: SearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [resultSearch, setResultSearch] = useState<ProductsType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const debounce = useDebounce({ value: searchQuery, delay: 500 });
  useEffect(
    function () {
      if (!debounce.trim()) {
        setResultSearch([]);
        return;
      }

      setIsLoading(true);
      async function fetchData() {
        try {
          const data = await getResultSearch(debounce);
          console.log(data);
          setResultSearch(data?.data.data);
          setIsLoading(false);
        } catch (err) {
          console.log(err);
        } finally {
          setIsLoading(false);
        }
      }
      fetchData();
    },
    [debounce]
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  return (
    <div className='relative w-full max-w-xs'>
      <div className='flex items-center gap-1 border p-1 rounded-md'>
        <input
          onChange={handleChange}
          value={searchQuery}
          type='search'
          placeholder='Tìm kiếm...'
          className='outline-none px-2 py-1 w-full'
        />
        <MagnifyingGlassIcon className='w-6 h-6 cursor-pointer' />
      </div>

      {searchQuery && resultSearch.length > 0 && (
        <div className='absolute top-full left-0 w-[120%] bg-white border border-t-0 rounded-b-md shadow-lg z-50'>
          {isLoading ? (
            <Loader />
          ) : (
            <SearchResults
              products={resultSearch}
              setSearchQuery={setSearchQuery}
              handleCloseNav={handleCloseNav}
            />
          )}
        </div>
      )}
      {searchQuery && resultSearch.length <= 0 && (
        <div className='absolute top-full left-0 w-[120%] bg-white border border-t-0 rounded-b-md shadow-lg z-50'>
          {isLoading ? <Loader /> : <div>Không tìm thấy sản phẩm!!!</div>}
        </div>
      )}
    </div>
  );
}

export default Search;
