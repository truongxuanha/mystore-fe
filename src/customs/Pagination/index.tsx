import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import Button from "../Button";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

type Props = {
  currentPage: number;
  totalPage: number;
};
function Pagination({ currentPage, totalPage }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [thisPage, setThisPage] = useState(currentPage);
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPage) {
      setSearchParams({ page: newPage.toString() });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  
  return (
    <div className="flex justify-center mt-8">
      <Button
        className={`px-3 py-1 mx-1 border rounded ${thisPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
        width="40px"
        height="32px"
        onClick={() => handlePageChange(thisPage - 1)}
        disabled={thisPage === 1}
      >
        <ChevronDoubleLeftIcon className="w-3 h-3" />
      </Button>

      {Array.from({ length: totalPage }, (_, i) => i + 1).map((_, index) => (
        <Button
          key={index}
          width="40px"
          height="32px"
          background={`${thisPage === index + 1 ? "colorPrimary" : "white"}`}
          styles={`border ${thisPage === index + 1 ? "bg-colorPrimary text-white" : "bg-white text-black"}`}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </Button>
      ))}

      <Button
        className={`px-3 py-1 mx-1 border rounded ${thisPage === totalPage ? "opacity-50 cursor-not-allowed" : ""}`}
        width="40px"
        height="32px"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={thisPage === totalPage}
      >
        <ChevronDoubleRightIcon className="w-3 h-3" />
      </Button>
    </div>
  );
}

export default Pagination;
