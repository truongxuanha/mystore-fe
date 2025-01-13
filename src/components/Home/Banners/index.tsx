import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import { getBannersThunk } from "redux/home/homeThunk";
import SliderCustom from "customs/SliderCustom";

const Banner: React.FC = () => {
  const dispatch = useAppDispatch();
  const { banners, loadingBanner } = useAppSelector((state) => state.home);

  React.useEffect(() => {
    if (!banners || banners.length === 0) {
      dispatch(getBannersThunk());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return <SliderCustom data={banners} loading={loadingBanner} />;
};

export default Banner;
