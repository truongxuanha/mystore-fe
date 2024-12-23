import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import styled from "styled-components";
import ProductCard from "components/Products/ProductCard";
import TitleListProduct from "customs/TitleListProduct";
import LoadingBlock from "customs/LoadingBlock";
import { IsListType } from "types";
import { useDetectScreen } from "hooks/useDetectScreen";
type Props = {
  data: any;
  title: string;
  loading?: boolean;
  isList?: IsListType;
};
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
  .slick-slider {
    position: static;
  }
`;
const SliderListProduct = ({ data, title, isList, loading }: Props) => {
  const { isMobile } = useDetectScreen();
  const PrevArrow = ({ onClick }: any) => (
    <button className="absolute top-1/2 transform -translate-y-1/2 left-2 z-10  text-black rounded-full p-2  " onClick={onClick}>
      <ChevronLeftIcon className="w-6 h-6" />
    </button>
  );

  const NextArrow = ({ onClick }: any) => (
    <button className="absolute top-1/2 transform -translate-y-1/2 right-2 z-10  text-black rounded-full p-2  " onClick={onClick}>
      <ChevronRightIcon className="w-6 h-6" />
    </button>
  );

  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: isMobile ? 2 : 5,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 4000,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="bg-white p-3 my-5 min-h-[300px] md:min-h-[350px]">
      <TitleListProduct title={title} />
      <SliderWrapper className="relative min-h-[300px] md:min-h-[350px] overflow-hidden">
        {loading ? (
          <LoadingBlock />
        ) : (
          <Slider {...settings}>{data && data.map((item: any, index: number) => <ProductCard key={index} product={item} isList={isList} />)}</Slider>
        )}
      </SliderWrapper>
    </div>
  );
};

export default SliderListProduct;
