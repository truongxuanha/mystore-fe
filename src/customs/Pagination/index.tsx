import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import Button from "../Button";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

type Props = {
  currentPage: number;
  totalPage: number;
};

function Pagination({ currentPage, totalPage }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [thisPage, setThisPage] = useState<number>(currentPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPage) {
      searchParams.set("page", newPage.toString());
      setSearchParams(searchParams);
      setThisPage(newPage);
    }
  };

  useEffect(() => {
    const page = Number(searchParams.get("page")) || currentPage;
    setThisPage(page);
  }, [searchParams, currentPage]);

  return (
    <div className="flex justify-center mt-8 gap-2">
      <Button
        className={` ${thisPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
        width="30px"
        height="30px"
        onClick={() => handlePageChange(thisPage - 1)}
        disabled={thisPage === 1}
      >
        <ChevronDoubleLeftIcon className="w-3 h-3" />
      </Button>

      {Array.from({ length: totalPage }, (_, i) => i + 1).map((pageNum) => (
        <Button
          key={pageNum}
          width="30px"
          height="30px"
          className={`border rounded-full ${thisPage === pageNum ? "bg-colorPrimary text-white" : "bg-white text-black"}`}
          onClick={() => handlePageChange(pageNum)}
        >
          {pageNum}
        </Button>
      ))}

      <Button
        className={`rounded-full ${thisPage === totalPage ? "opacity-50 cursor-not-allowed" : ""}`}
        width="30px"
        height="30px"
        onClick={() => handlePageChange(thisPage + 1)}
        disabled={thisPage === totalPage}
      >
        <ChevronDoubleRightIcon className="w-3 h-3" />
      </Button>
    </div>
  );
}

export default Pagination;
