import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImageLazy from "customs/ImageLazy";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import styled from "styled-components";
import LoadingBlock from "customs/LoadingBlock";
type Props = {
  data: any;
  maxItem?: number;
  loading: boolean;
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

const SliderCustom = ({ data, maxItem, loading }: Props) => {
  const PrevArrow = ({ onClick }: any) => (
    <button className="absolute top-1/2 transform -translate-y-1/2 left-2 z-10" onClick={onClick}>
      <ChevronLeftIcon className="w-10 h-10" />
    </button>
  );

  const NextArrow = ({ onClick }: any) => (
    <button className="absolute top-1/2 transform -translate-y-1/2 right-2 z-10" onClick={onClick}>
      <ChevronRightIcon className="w-10 h-10" />
    </button>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: maxItem ?? 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <SliderWrapper className="relative bg-white h-[200px] md:h-[400px] ">
      {loading ? (
        <LoadingBlock />
      ) : (
        <Slider {...settings}>
          {data.map((item: any) => (
            <div key={item.id} className="w-full h-[200px] md:h-[400px] flex items-center justify-center">
              <ImageLazy isObjectFitCover="fill" src={item.image} alt="Banner" />
            </div>
          ))}
        </Slider>
      )}
    </SliderWrapper>
  );
};

export default SliderCustom;
