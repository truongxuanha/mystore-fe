import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import useGetSearchParams from "hooks/useGetSearchParams";
import useParams from "hooks/useParams";
import { StarIcon } from "lucide-react";
import { useEffect } from "react";
import { getCommentByIdProductThunk } from "redux/comment/commentThunk";
const filterOptions: { id: string; label: string; type: number | string; count: string | null; value: string }[] = [
  { id: "all", label: "Tất cả", count: null, type: "all", value: "" },
  {
    id: "5rate",
    label: "5 sao",
    count: "1",
    type: 5,
    value: "rating",
  },
  {
    id: "4rate",
    label: "4 sao",
    count: "1",
    type: 4,
    value: "rating",
  },
  {
    id: "3rate",
    label: "3 sao",
    count: "1",
    type: 3,
    value: "rating",
  },
  {
    id: "2rate",
    label: "2 sao",
    count: "1",
    type: 2,
    value: "rating",
  },
  {
    id: "1rate",
    label: "1 sao",
    count: "1",
    type: 1,
    value: "rating",
  },
];
const RenewStarRating = ({ id_product }: { id_product: number }) => {
  const { dataRatingProduct } = useAppSelector((state) => state.comment);
  const { currentUser } = useAppSelector((state) => state.auth);

  const { setParams } = useParams();
  const starCmt = useGetSearchParams(["star"]).star || "all";
  const dispatch = useAppDispatch();
  const hanldeGetCommentByStar = (star: number | string) => {
    dispatch(getCommentByIdProductThunk({ product_id: id_product, star: star, id_account: currentUser?.user.id }));
    setParams({ star: star });
  };
  useEffect(() => {
    setParams({ star: starCmt });
  }, [setParams, starCmt]);
  return (
    <div className="bg-[#fffbf8] border border-[#f9ede5] p-7">
      <div className="flex items-center gap-5 mb-2">
        <div className="flex flex-col items-center">
          <div className="text-red-500 text-lg text-nowrap">
            <span>{dataRatingProduct?.averageRating} / 5</span>
            <StarIcon className="block md:hidden" width={30} height={30} color="red" fill="red" />
          </div>
          <div className="hidden md:flex">
            {Array.from({ length: dataRatingProduct.averageRating }, (_, index) => (
              <StarIcon key={`star-${index}`} width={30} height={30} color="red" fill="red" />
            ))}
          </div>
        </div>
        <div className="flex gap-5 overflow-x-auto py-2">
          {filterOptions.map((option) => (
            <div
              className={`flex items-center border px-3 py-2 cursor-pointer ${starCmt === option.type.toString() && "border-red-500"}`}
              key={option.id}
              onClick={() => hanldeGetCommentByStar(option.type)}
            >
              <span className="text-nowrap">{option.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RenewStarRating;
