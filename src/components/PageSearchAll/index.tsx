import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import { ContainerSearchAll } from "./styled";
import { useEffect } from "react";
import { searchThunk } from "redux/search/searchThunk";
import useGetSearchParams from "hooks/useGetSearchParams";
import ProductCard from "components/Products/ProductCard";
import RenewBreadcrumb from "customs/RenewBreadcrumb";

const PageSearchAll = () => {
  const dispatch = useAppDispatch();
  const { results } = useAppSelector((state) => state.search);
  const searchParams = useGetSearchParams(["q"]).q;
  useEffect(() => {
    dispatch(searchThunk(searchParams));
  }, [dispatch, searchParams]);
  return (
    <ContainerSearchAll className="container">
      <RenewBreadcrumb breadcrumbs={[{ title: "Trang chủ", urlLink: "/" }]} page="search" />
      <div className="bg-corlorHeader p-3 flex items-center">
        <div className="text-red-500 mr-5 block">Từ khóa tìm kiếm:</div>
        <div className="block">{searchParams}</div>
      </div>
      <div className="text-center uppercase my-5 pb-5 font-medium border-b">Kết quả tìm kiếm</div>
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
        {results.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </ContainerSearchAll>
  );
};

export default PageSearchAll;
