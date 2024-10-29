import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import Button from "../Button";

type Props = {
  currentPage: number;
  totalPage: number;
  onClick: (page: number) => void;
};
function Pagination({ currentPage, onClick, totalPage }: Props) {
  return (
    <div className="flex justify-center mt-8">
      <Button
        className={`px-3 py-1 mx-1 border rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
        width="40px"
        height="32px"
        onClick={() => onClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronDoubleLeftIcon className="w-3 h-3" />
      </Button>

      {Array.from({ length: totalPage }, (_, i) => i + 1).map((_, index) => (
        <Button
          key={index}
          width="40px"
          height="32px"
          background={`${currentPage === index + 1 ? "colorPrimary" : "white"}`}
          styles={`border ${currentPage === index + 1 ? "bg-colorPrimary text-white" : "bg-white text-black"}`}
          onClick={() => onClick(index + 1)}
        >
          {index + 1}
        </Button>
      ))}

      <Button
        className={`px-3 py-1 mx-1 border rounded ${currentPage === totalPage ? "opacity-50 cursor-not-allowed" : ""}`}
        width="40px"
        height="32px"
        onClick={() => onClick(currentPage + 1)}
        disabled={currentPage === totalPage}
      >
        <ChevronDoubleRightIcon className="w-3 h-3" />
      </Button>
    </div>
  );
}

export default Pagination;
