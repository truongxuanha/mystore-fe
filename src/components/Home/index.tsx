import HotProducts from "../HotProducts";
import Banner from "../Banners";

import ProductNews from "../ProductNews";
import Manufacture from "../Manufacture";
import { assets } from "../../assets/index";
import { BannerLeft, BannerRight } from "./styled";

function Home() {
  return (
    <>
      <div className="w-full mx-auto">
        <Manufacture />
        <Banner />
        <HotProducts />
        <ProductNews />
        <BannerLeft className="fixed">
          <img src={assets.bannerLeft} alt="" />
        </BannerLeft>
        <BannerRight className="fixed">
          <img src={assets.bannerRight} alt="" />
        </BannerRight>
      </div>
    </>
  );
}

export default Home;
