import { useMemo } from "react";
import useParams from "./useParams";

import { useSearchParams } from "react-router-dom";

const useGetSearchParams = (searchString: string[]) => {
  const [searchParams] = useSearchParams();
  const { clearParams } = useParams();

  const res = useMemo(() => {
    return searchString.reduce(
      (acc: any | object, search) => ({
        ...acc,
        [search]: searchParams.get(search) ?? "",
      }),
      {},
    );
  }, [searchParams, searchString]);
  if (res.firebase_token !== "" && searchString[0] === "firebase_token") {
    clearParams(["firebase_token", "from_app", "id"]);
  }
  return res;
};

export default useGetSearchParams;
