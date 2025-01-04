import Loader from "customs/Loader";
import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { verifyPaymentThunk } from "redux/order/orderThunk";

const VerifyPayment = () => {
  const params = new URLSearchParams(window.location.search);
  const vnp_ResponseCode = params.get("vnp_ResponseCode") as string;
  const vnp_TxnRef = params.get("vnp_TxnRef") as string;
  const navigate = useNavigate();
  // const orderId = params.get("orderId");
  const dispatch = useAppDispatch();
  const { loadingPayment } = useAppSelector((state) => state.order);
  const callBack = (isSucces: boolean) => {
    if (isSucces) {
      navigate(`/order?bill=${vnp_TxnRef}&&complete=true`);
      return;
    }
    navigate("/order");
  };
  useEffect(() => {
    dispatch(verifyPaymentThunk({ vnp_ResponseCode, orderId: vnp_TxnRef, callBack }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (loadingPayment) return <Loader />;
  return <div></div>;
};

export default VerifyPayment;
