import { assets } from "assets/index";
import { BannerLeft, BannerRight, Container } from "./styled";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Banner from "components/Home/Banners";
import HotProducts from "components/Home/HotProducts";
import ProductNews from "components/Home/ProductNews";
import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import { getPopupThunk } from "redux/home/homeThunk";
import Benefit from "./Benefit";

function Home() {
  const [isShow, setIsShow] = useState(false);
  const { salePopup, loadingPopup } = useAppSelector((state) => state.home);
  document.title = "MyStore With Love";
  useEffect(() => {
    const hasPopup = sessionStorage.getItem("hasVisited");
    if (hasPopup === "true" || !hasPopup) {
      setIsShow(true);
    }
  }, []);
  const handleClose = () => {
    sessionStorage.setItem("hasVisited", "false");
    setIsShow(false);
  };
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getPopupThunk());
  }, [dispatch]);
  return (
    <Container className="mx-auto container">
      <Banner />
      <HotProducts />
      <ProductNews />
      <BannerLeft>
        <img src={assets.bannerLeft} alt="" />
      </BannerLeft>
      <BannerRight>
        <img src={assets.bannerRight} alt="" />
      </BannerRight>
      {isShow && !!salePopup?.length && !loadingPopup && (
        <div className="popup fixed inset-0 z-50 flex items-center justify-center w-full h-screen bg-[rgba(0,0,0,0.5)]">
          <div className="mx-10 w-96 md:w-[450px] relative flex flex-col">
            <Link to={salePopup[0].url_transit}>
              <img src={salePopup[0].popup_img} alt="popup" />
            </Link>
            <XMarkIcon onClick={handleClose} className="w-10 h-10 text-white -top-8 -right-8 absolute cursor-pointer" width={40} height={40} />
          </div>
        </div>
      )}
      <Benefit />
    </Container>
  );
}

export default Home;
