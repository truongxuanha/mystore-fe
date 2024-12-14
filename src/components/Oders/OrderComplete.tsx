import completeIcon from "assets/complete.svg";
import useGetSearchParams from "hooks/useGetSearchParams";
import { Link } from "react-router-dom";
const OrderComplete = () => {
  const param = useGetSearchParams(["bill"]).bill;
  return (
    <div className="text-center mt-14 flex flex-col items-center justify-center col-span-2">
      <img src={completeIcon} alt="complete" />
      <div className="my-2">Đặt hàng thành công.</div>
      <div className="my-2">Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</div>
      <div>ID đơn hàng: {param}</div>
      <div>
        <Link to="/product?manufacture=all" className="py-2 mt-2 block bg-colorPrimary px-3 text-white rounded-sm">
          Tiếp tục mua sắp
        </Link>
      </div>
    </div>
  );
};

export default OrderComplete;
