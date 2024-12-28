import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import { CloseWrapper, ContainerFormAddImage, DropZoneWrapper, ImageItem, MainFormAddImage } from "./styles";
import { useEffect, useState } from "react";
import { getImageProductThunk } from "redux/product/productThunk";
import ImageLazy from "customs/ImageLazy";
import { XMarkIcon } from "@heroicons/react/24/outline";
import InputDropzone from "customs/InputDropzone";

type Props = {
  setShow: (show: boolean) => void;
};
const FormAddImage = ({ setShow }: Props) => {
  const { imageProduct } = useAppSelector((state) => state.product);
  const [previewImage, setPreviewImage] = useState();
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

        <DropZoneWrapper>
          <InputDropzone fileUploaded={previewImage} setFileUploaded={setPreviewImage} />
        </DropZoneWrapper>
        <CloseWrapper onClick={() => setShow(false)}>
          <XMarkIcon width={50} height={50} />
        </CloseWrapper>
      </MainFormAddImage>
    </ContainerFormAddImage>
  );
};

export default FormAddImage;
