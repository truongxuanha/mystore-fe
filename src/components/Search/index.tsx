import { memo, useEffect, useRef, useState } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Input } from "@headlessui/react";
import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import { searchThunk } from "redux/search/searchThunk";
import SearchResults from "components/Search/SearchResult";
import { texts } from "libs/contains/texts";
import useDebounce from "hooks/useDebouncs";
import { useNavigate } from "react-router-dom";

export type SearchProps = {
  handleCloseNav?: (open: boolean) => void;
};

function Search({ handleCloseNav }: SearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { results, isLoading } = useAppSelector((state) => state.search);
  const debounce = useDebounce({ value: searchQuery, delay: 500 });

  useEffect(() => {
    if (debounce.trim()) {
      dispatch(searchThunk(debounce));
      setIsDropdownOpen(true);
    }
  }, [dispatch, debounce]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const handleDeleteText = () => {
    setSearchQuery("");
    inputRef.current?.focus();
    setIsDropdownOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  const handleFocus = () => {
    if (searchQuery.trim() && results.length > 0) {
      setIsDropdownOpen(true);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const handleNextPageAll = () => {
    setIsDropdownOpen(false);
    navigate(`/search?q=${searchQuery}`);
  };
  return (
    <div className="relative w-full max-w-xs" ref={containerRef}>
      <form className="form w-52 md:w-60 lg:w-72 border border-orange-300">
        <button>
          <MagnifyingGlassIcon className="w-6 h-6" />
        </button>
        <Input
          ref={inputRef}
          onChange={handleChange}
          onFocus={handleFocus}
          value={searchQuery}
          type="text"
          placeholder="Tìm kiếm..."
          className="input outline-none px-2 py-1 w-full border-r mr-2"
        />
        {searchQuery && !isLoading && (
          <button className="reset" type="reset" onClick={handleDeleteText}>
            <XMarkIcon className="w-6 h-6" />
          </button>
        )}
      </form>

      {isDropdownOpen && !!searchQuery && results.length > 0 && (
        <div className="absolute top-full left-0 w-[110%] sm:w-[120%] md:w-[130%] bg-white border border-t-0 rounded-b-md shadow-lg z-10 transition-all duration-500">
          <div className="flex justify-between py-1 px-3 text-gray-500">
            <span>{texts.search.RESULTS}:</span>
            <span onClick={handleNextPageAll} className="hover:text-blue-500 cursor-pointer">
              Xem tất cả
            </span>
          </div>
          <SearchResults products={results} setSearchQuery={setSearchQuery} handleCloseNav={handleCloseNav} />
        </div>
      )}

      {isDropdownOpen && !!searchQuery && results.length === 0 && !isLoading && debounce && (
        <div className="absolute top-full left-0 w-[130%] h-24 bg-white border border-t-0 rounded-b-md rounded-r-md shadow-lg z-10 transition-all duration-500">
          <span>{texts.search.RESULTS}:</span>
          <span className="block text-center my-auto">{texts.search.NO_RESULTS}</span>
        </div>
      )}
    </div>
  );
}

export default memo(Search);
