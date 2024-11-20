import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import { getBannersThunk } from "redux/home/homeThunk";
import SliderCustom from "customs/SliderCustom";
import LoadingBlock from "customs/LoadingBlock";

const Banner: React.FC = () => {
  const dispatch = useAppDispatch();
  const { banners, loadingBanner } = useAppSelector((state) => state.home);

  React.useEffect(() => {
    if (!banners || banners.length === 0) {
      dispatch(getBannersThunk());
    }
  }, [dispatch, banners]);

  if (loadingBanner) {
    return <LoadingBlock />;
  }

  return <SliderCustom data={banners} />;
};

export default Banner;
