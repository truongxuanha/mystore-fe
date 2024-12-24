import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const useSearchParamsPageAndQuery = () => {
  const [searchParams] = useSearchParams();

  const currentPage = useMemo(() => {
    const page = searchParams.get("page");
    return page ? parseInt(page, 10) : 1;
  }, [searchParams]);

  const searchQuery = useMemo(() => {
    return searchParams.get("query") || "";
  }, [searchParams]);

  return { currentPage, searchQuery };
};

export default useSearchParamsPageAndQuery;
