import completeIcon from "assets/complete.svg";
// import useGetSearchParams from "hooks/useGetSearchParams";
import { Link } from "react-router-dom";
const OrderComplete = () => {
  // const param = useGetSearchParams(["bill"]).bill;
  return (
    <div className="flex justify-center bg-gray-100">
      <div className="w-[90%] max-w-2xl relative bg-white  flex flex-col items-center shadow-[0_0_25px_#ccc] rounded-lg  p-10 pt-3 after:content[''] after:absolute after:inset-x-0 after:top-0 after:rounded-se-md after:rounded-ss-md after:h-1 after:bg-[#ee4d2d]">
        <div className="w-56">
          <img src="/images/success-payment.png" alt="" className="w-full h-auto object-cover" />
        </div>
        <div className="flex flex-col items-center justify-center gap-10">
          <div className="flex flex-col items-center justify-center gap-2">
            <h3 className="text-2xl font-semibold text-[#2f2f2f]">Cảm ơn bạn đã đặt hàng!</h3>
            <img src={completeIcon} />
            <p className="w-4/5 text-xs text-[#cecece]">
              Đơn hàng của bạn đã được xác nhận và đang được xử lý. Bạn có thể kiểm tra lại thông tin đơn hàng và trạng thái của nó trong phần &apos;Đơn
              mua&apos; của tài khoản của bạn. Cảm ơn bạn đã mua sắm từ chúng tôi!
            </p>
            {/* <Invoice order={order as IOrderPayment} /> */}
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="*:py-2 *:px-5 *:rounded *:uppercase space-x-5">
              <Link to={"/account/purchase?type=wait_approval"} className="bg-gray-100">
                Đơn mua
              </Link>
              <Link to={"/product?manufacture=all"} className=" bg-[#ee4d2d] text-white">
                Tiếp tục mua sắm
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderComplete;
