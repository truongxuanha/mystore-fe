import queryString from "query-string";
import { useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { buildApiUrl } from "../utils/buildUrl";

const useParams = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname: string = location.pathname;
  const parsed: any = useMemo(() => queryString.parse(location.search), [location.search]);

  const setParams = useCallback(
    (newParams: any, newPath?: string) =>
      navigate(
        `${newPath || pathname}${buildApiUrl({
          ...parsed,
          ...newParams,
        })}`,
      ),
    [navigate, parsed, pathname],
  );

  const getNewParams = (newParams: any, newPath?: string) => {
    return `${newPath || pathname}${buildApiUrl({
      ...parsed,
      ...newParams,
    })}`;
  };

  const clearParams = (clearedParams: string[]) => {
    clearedParams.forEach((key: any) => {
      delete parsed[key];
    });

    navigate(`${pathname}${buildApiUrl(parsed)}`);
  };
  const clearAllParams = () => navigate(pathname);

  const setNewsParams = useCallback((newParams: any) => navigate(`${pathname}${buildApiUrl(newParams)}`), [navigate, pathname]);

  return {
    pathname,
    parsed,
    setParams,
    clearParams,
    clearAllParams,
    setNewsParams,
    getNewParams,
  };
};

export default useParams;
