import { useAppSelector } from "hooks/useAppDispatch";
import { StarIcon } from "lucide-react";
const filterOptions = [
  { id: "all", label: "Tất cả", count: null, type: "", value: "" },
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
  {
    id: "isReview",
    label: "Có bình luận",
    count: "1",
    type: "nonempty",
    value: "review",
  },
  {
    id: "isImage",
    label: "Có hình ảnh",
    count: "1",
    type: "empty",
    value: "images",
  },
];
const RenewStarRating = () => {
  const { dataRatingProduct } = useAppSelector((state) => state.comment);
  return (
    <div className="bg-[#fffbf8] border border-[#f9ede5] p-7">
      <div className="flex items-center gap-5 mb-2">
        <div className="flex flex-col items-center">
          <div className="text-red-500 text-lg text-nowrap">
            <span>{dataRatingProduct?.totalRatings} / 5</span>
            <StarIcon className="block md:hidden" width={30} height={30} color="red" fill="red" />
          </div>
          <div className="hidden md:flex">
            {Array.from({ length: dataRatingProduct.averageRating }, (_, index) => (
              <StarIcon key={index} width={30} height={30} color="red" fill="red" />
            ))}
          </div>
        </div>
        <div className="flex gap-5 overflow-x-auto py-2">
          {filterOptions.map((option) => (
            <div className="flex items-center border px-3 py-2 cursor-pointer" key={option.id}>
              <span className="text-nowrap">{option.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RenewStarRating;
