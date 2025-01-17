import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import { CloseWrapper, ContainerFormAddImage, DropZoneWrapper, ImageItem, MainFormAddImage } from "./styles";
import { useEffect, useState } from "react";
import { getImageProductThunk } from "redux/product/productThunk";
import ImageLazy from "customs/ImageLazy";
import { XMarkIcon } from "@heroicons/react/24/outline";
import InputDropzone from "customs/InputDropzone";
import Button from "customs/Button";
import { ProductsType } from "types";
import { createImageDescriptionThunk, deleteImageDescriptionThunk } from "redux/admin/adminThunk";

type Props = {
  setShow: (show: boolean) => void;
  currentProduct: ProductsType;
};

const FormAddImage = ({ setShow, currentProduct }: Props) => {
  const { imageProduct } = useAppSelector((state) => state.product);
  const [imageList, setImageList] = useState<{ id: number; path_name: string }[]>([]);
  const [previewImages, setPreviewImages] = useState<File[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getImageProductThunk(currentProduct.product_id));
  }, [currentProduct.product_id, dispatch]);

  useEffect(() => {
    setImageList(imageProduct);
  }, [imageProduct]);

  const handleAddImage = (file: File) => {
    const newImage = {
      id: Math.random(),
      path_name: URL.createObjectURL(file),
    };

    setPreviewImages((prev) => [...prev, file]);
    setImageList((prev) => [...prev, newImage]);
  };

  const handleRemoveImage = (id: number) => {
    const callBack = () => {
      dispatch(getImageProductThunk(currentProduct.product_id));
    };
    const isNew = imageProduct.some((item) => {
      return item.id === id;
    });
    if (!isNew) {
      setImageList((prev) => prev.filter((img) => img.id !== id));
      setPreviewImages((prev) => prev.filter((_, index) => index !== id));
      return;
    }
    dispatch(
      deleteImageDescriptionThunk({
        id,
        callBack,
      }),
    );
  };

  const handleSubmit = async () => {
    if (previewImages.length === 0) {
      alert("Please add at least one image.");
      return;
    }

    const formData = new FormData();
    formData.append("id_product", `${currentProduct.product_id}`);
    previewImages.forEach((file) => {
      formData.append("path_name", file);
    });
    const callBack = () => {
      setShow(false);
      setImageList([]);
      setPreviewImages([]);
    };
    dispatch(
      createImageDescriptionThunk({
        formData,
        callBack,
      }),
    );
  };
  return (
    <ContainerFormAddImage>
      <MainFormAddImage>
        <div className="flex flex-wrap gap-5">
          {imageList.map((img, index) => (
            <ImageItem key={img.id} className="relative">
              <ImageLazy src={img.path_name} alt={`img-product-${index}`} isObjectFitCover="contain" />
              <button className="absolute top-0 right-0" onClick={() => handleRemoveImage(img.id)}>
                <XMarkIcon color="red" width={30} height={30} />
              </button>
            </ImageItem>
          ))}
          <DropZoneWrapper>
            <InputDropzone fileUploaded={null} setFileUploaded={(file) => file && handleAddImage(file)} />
          </DropZoneWrapper>

          <CloseWrapper onClick={() => setShow(false)}>
            <XMarkIcon width={50} height={50} />
          </CloseWrapper>
        </div>
        <div className="w-full flex mt-5 justify-end">
          <Button width="100px" className="bg-colorPrimary px-2 py-1 text-white" onClick={handleSubmit}>
            Thêm
          </Button>
        </div>
      </MainFormAddImage>
    </ContainerFormAddImage>
  );
};

export default FormAddImage;
