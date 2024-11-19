import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import { useEffect } from "react";
import { getManuThunk } from "redux/manufacture/manuThunk";
import { useNavigate } from "react-router-dom";

import { getProducts } from "redux/product/productThunk";
import styled from "styled-components";
import Slider from "react-slick";
import ImageLazy from "customs/ImageLazy";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useDetectScreen } from "hooks/useDetectScreen";
export default Manufacture;
const SliderWrapper = styled.div`
  .slick-dots {
    bottom: 0;
  }
  .slick-dots li {
    margin: 0 2px;
  }
  .slick-dots li button {
    color: #333;
    &:before {
      font-size: 10px;
    }
  }
  .slick-dots li button:before {
    color: #f2f0f0;
    opacity: 1;
  }
  .slick-dots li.slick-active button {
    &:before {
      color: #655e5e;
    }
  }
`;

function Manufacture() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isMobile } = useDetectScreen();
  const { manuItems } = useAppSelector((state) => state.manufacturer);
  useEffect(
    function () {
      if (manuItems.length === 0 || !manuItems) {
        dispatch(getManuThunk());
      }
    },
    [dispatch, manuItems],
  );
  const handleGotoManu = (id: number) => {
    dispatch(getProducts({ manufacturer: id }));
    navigate(`/product?manufacture=${id}`);
  };
  const PrevArrow = ({ onClick }: any) => (
    <button className="absolute top-1/2 transform -translate-y-1/2 left-2 z-10  text- rounded-full p-2  " onClick={onClick}>
      <ChevronLeftIcon className="w-6 h-6" />
    </button>
  );

  const NextArrow = ({ onClick }: any) => (
    <button className="absolute top-1/2 transform -translate-y-1/2 right-2 z-10  text- rounded-full p-2  " onClick={onClick}>
      <ChevronRightIcon className="w-6 h-6" />
    </button>
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: isMobile ? 3 : 7,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 4000,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <SliderWrapper className="relative bg-white">
      <Slider {...settings}>
        {manuItems.map((item: any) => (
          <div onClick={() => handleGotoManu(item.id)} key={item.id} className="flex h-[50px] items-center justify-center border">
            <ImageLazy isObjectFitCover="contain" src={item.img} alt="Banner" />
          </div>
        ))}
      </Slider>
    </SliderWrapper>
  );
}
