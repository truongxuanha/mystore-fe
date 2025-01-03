import { assets } from "assets/index";
import { BannerLeft, BannerRight } from "./styled";
import ImageLazy from "customs/ImageLazy";
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
  const [isShow, setIsShow] = useState(true);
  const { salePopup } = useAppSelector((state) => state.home);
  document.title = "MyStore With Love";
  // useEffect(() => {
  //   const hasPopup = sessionStorage.getItem("hasVisited");
  //   if (hasPopup === "true" || !hasPopup) {
  //     setIsShow(true);
  //   }
  // }, []);
  const handleClose = () => {
    // sessionStorage.setItem("hasVisited", "false");
    setIsShow(false);
  };
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getPopupThunk());
  }, [dispatch]);
  return (
    <div className="mx-auto container relative">
      <Banner />
      <HotProducts />
      <ProductNews />
      <BannerLeft>
        <img src={assets.bannerLeft} alt="" />
      </BannerLeft>
      <BannerRight>
        <img src={assets.bannerRight} alt="" />
      </BannerRight>
      {isShow && !!salePopup?.length && (
        <div className="fixed top-0 right-0 left-0 z-50 flex items-center justify-center w-full h-full bg-[rgba(0,0,0,0.5)]">
          <div className="w-full mx-10 md:w-96 relative flex flex-col">
            <Link to={salePopup[0].url_transit}>
              <ImageLazy isObjectFitCover="cover" src={salePopup[0].popup_img} alt="popup" />
            </Link>
            <XMarkIcon onClick={handleClose} className="w-10 h-10 text-white -top-8 -right-8 absolute cursor-pointer" width={40} height={40} />
          </div>
        </div>
      )}
      <Benefit />
    </div>
  );
}

export default Home;
