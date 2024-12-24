import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import { ContainerFormAddImage, ImageItem, MainFormAddImage } from "./styles";
import { useEffect } from "react";
import { getImageProductThunk } from "redux/product/productThunk";
import ImageLazy from "customs/ImageLazy";
import Button from "customs/Button";

const FormAddImage = () => {
  const { imageProduct } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getImageProductThunk(6));
  }, [dispatch]);
  return (
    <ContainerFormAddImage>
      <MainFormAddImage>
        {imageProduct.map((img) => (
          <ImageItem key={img.id}>
            <ImageLazy src={img.path_name} alt="img-product" />
          </ImageItem>
        ))}
        
        <Button className="bg-colorPrimary" width="100px">
          Thoát
        </Button>
      </MainFormAddImage>
    </ContainerFormAddImage>
  );
};

export default FormAddImage;
