import React, { useState, useEffect } from "react";
import { axiosIntance } from "../../utils/axiosConfig";

export interface BannerType {
  id: number;
  image: string;
  path: null;
  updateAt: null;
  createAt: null;
}
const Banner: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const [banners, setBanners] = useState<BannerType[]>([]);

  useEffect(() => {
    const interval: NodeJS.Timeout = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 3000);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [banners.length]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const { data } = await axiosIntance.get("/banner");

        if (data.status === true) setBanners(data.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchBanners();
  }, []);

  useEffect(function () {}, []);
  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleIndicatorClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div
      className='relative'
      data-hs-carousel='{"loadingClassNameclassNamees": "opacity-0", "isAutoPlay": true}'
    >
      <div className='relative overflow-hidden w-full min-h-64 md:min-h-80 lg:min-h-96 bg-white rounded-lg'>
        <div
          className='carousel-main absolute top-0 bottom-0 start-0 flex flex-nowrap transition-transform duration-700'
          style={{
            transform: `translateX(-${activeIndex * 100}%)`,
          }}
        >
          {banners.map((banner, index) => (
            <div
              key={index}
              className={`carousel-item flex justify-center w-full h-full p-6 rounded-md`}
            >
              <img className='w-full rounded-md' src={banner.image} />
            </div>
          ))}
        </div>
      </div>

      <button
        type='button'
        className='disabled:pointer-events-none absolute inset-y-0 start-0 inline-flex justify-center items-center w-[46px] h-full text-gray-800  focus:outline-none marker:rounded-s-lg'
        onClick={handlePrev}
      >
        <span className='text-2xl' aria-hidden='true'>
          <svg
            className='shrink-0 size-5'
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='m15 18-6-6 6-6'></path>
          </svg>
        </span>
        <span className='sr-only'>Previous</span>
      </button>

      <button
        type='button'
        className='disabled:pointer-events-none absolute inset-y-0 end-0 inline-flex justify-center items-center w-[46px] h-full text-gray-800 rounded-e-lg'
        onClick={handleNext}
      >
        <span className='sr-only'>Next</span>
        <span className='text-2xl' aria-hidden='true'>
          <svg
            className='shrink-0 size-5'
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='m9 18 6-6-6-6'></path>
          </svg>
        </span>
      </button>

      <div className='flex justify-center absolute bottom-0 start-0 end-0 space-x-2'>
        {banners.map((_, index) => (
          <span
            key={index}
            className={`size-3 border border-gray-400 rounded-full cursor-pointer ${
              activeIndex === index ? "bg-gray-300" : "bg-white"
            }`}
            onClick={() => handleIndicatorClick(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Banner;
