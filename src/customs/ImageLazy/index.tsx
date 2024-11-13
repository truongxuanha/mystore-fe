import defaultProductImage from "../../assets/noimage.svg";
import { FC, ImgHTMLAttributes, memo, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import loadingImg from "../../assets/loading-img.svg";

const ImageWrapper = styled.img`
  min-width: 100px;
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  handleImageLoaded?: (e: boolean) => void;
  isObjectFitCover?: "cover" | "contain" | "fill";
  border?: boolean;
}

const Image: FC<Props> = ({ src, alt, handleImageLoaded, isObjectFitCover = "cover", border = true, ...otherProps }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState("");
  const placeholderRef = useRef<HTMLImageElement>(null);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && placeholderRef.current) {
        setView(src);
        observer.unobserve(placeholderRef.current);

        setTimeout(() => {
          setIsError(true);
        }, 1500);
      }
    });
    if (placeholderRef && placeholderRef.current) {
      observer.observe(placeholderRef.current);
    }
  }, [src]);
  return (
    <>
      {isLoading && (
        <>
          <ImageWrapper src={isError ? defaultProductImage : loadingImg} alt={alt} ref={placeholderRef} style={{ objectFit: "inherit" }} {...otherProps} />
        </>
      )}
      <ImageWrapper
        src={view}
        alt={alt}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.id = border ? "default-product-image-border" : "default-product-image";
        }}
        style={isLoading ? { display: "none" } : { objectFit: isObjectFitCover }}
        onLoad={() => {
          handleImageLoaded && handleImageLoaded(false);
          setIsLoading(false);
        }}
        {...otherProps}
      />
    </>
  );
};

export default memo(Image);
