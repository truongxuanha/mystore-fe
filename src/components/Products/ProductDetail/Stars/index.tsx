import { useAppSelector } from "hooks/useAppDispatch";
import { StarIcon } from "lucide-react";

const StarRating = () => {
  const { dataRatingProduct } = useAppSelector((state) => state.comment);
  const stars = [1, 2, 3, 4, 5];
  return (
    <div>
      <div className="flex items-center gap-5 mb-2">
        <div className="flex items-center gap-1">
          <span className="text-colorPrimary text-xl">{dataRatingProduct?.averageRating ?? 0}</span>
          <StarIcon color="#ff8f26" fill="#ff8f26" width={22} height={22} />
        </div>
        <div>{dataRatingProduct?.totalRatings} đánh giá</div>
      </div>
      {stars.map((star, index) => (
        <div className="flex items-center" key={index}>
          <span className="text-base">{stars.length - index}</span>
          <div
            key={star}
            style={{
              display: "grid",
              gridTemplateColumns: "20px 250px 20px",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <StarIcon color="#333" fill="#333" width={20} height={20} />
            <div className="w-[250px] bg-slate-200  h-[5px]">
              <div
                className="bg-colorPrimary h-full transition-all duration-1000"
                style={{
                  width: `${dataRatingProduct?.stars?.[stars.length - index]?.percentage * 2.5}px`,
                }}
              ></div>
            </div>
            <span>{dataRatingProduct?.stars?.[stars.length - index]?.percentage}%</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StarRating;
