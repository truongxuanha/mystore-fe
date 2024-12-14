import { Input } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "customs/Button";
import InputDropzone from "customs/InputDropzone";
import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import useGetSearchParams from "hooks/useGetSearchParams";
import { texts } from "libs/contains/texts";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { authUpdate } from "redux/auth/authThunk";
import { getManuThunk } from "redux/manufacture/manuThunk";
import { createProductThunk, deleteProductThunk, editProductThunk, getProducts } from "redux/product/productThunk";
import { CreateProductType } from "redux/product/type";
import { ActionAdminEnum } from "types/admin.type";
import { schemaProduct } from "utils/schema";
import { toastifySuccess, toastifyWarning } from "utils/toastify";

type Props = {
  setShow: (value: boolean) => void;
  initialData?: any;
  actionType?: ActionAdminEnum;
};

function FormAddProductAdmin({ setShow, initialData, actionType }: Props) {
  const { manuItems, error } = useAppSelector((state) => state.manufacturer);
  const [animationClass, setAnimationClass] = useState("modal-enter");

  const handleClose = () => {
    setAnimationClass("modal-exit");
    setTimeout(() => setShow(false), 300);
  };
  const page = useGetSearchParams(["page"]).page || 1;
  const [previewImage, setPreviewImage] = useState<string | undefined>(initialData?.thumbnail || undefined);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateProductType>({
    resolver: yupResolver(schemaProduct) as any,
    defaultValues: initialData || {
      product_name: "",
      id_manu: "",
      price: 0,
      quantity: null,
      thumbnail: null,
      discount: 0,
      description: "",
      other_discount: 0,
    },
    context: { actionType },
  });

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getManuThunk());
  }, [dispatch]);

  const onSubmit: SubmitHandler<CreateProductType> = async (formValue) => {
    let resultsAction;
    if (actionType === ActionAdminEnum.ADD) {
      formValue.thumbnail = previewImage;
      resultsAction = await dispatch(createProductThunk(formValue));
      if (createProductThunk.rejected.match(resultsAction)) {
        toastifyWarning(error || texts.errors.ADD_PRODUCT_FAILED);
        return;
      }
      dispatch(getProducts({}));
      toastifySuccess(texts.errors.ADD_PRODUCT_SUCCESS);
    } else if (actionType === ActionAdminEnum.EDIT) {
      formValue.thumbnail = previewImage;
      const updatedData = {
        ...initialData,
        ...formValue,
      };
      resultsAction = await dispatch(editProductThunk(updatedData));
      if (authUpdate.rejected.match(resultsAction)) {
        toastifyWarning((resultsAction.payload as string) || texts.errors.EDIT_PRODUCT_FAILED);
        return;
      }
      dispatch(getProducts({ currentPage: page, itemsPerPage: 5 }));
      toastifySuccess(texts.errors.EDIT_PRODUCT_SUCCESS);
    } else if (actionType === ActionAdminEnum.DELETE) {
      resultsAction = await dispatch(deleteProductThunk(initialData.product_id));
      if (deleteProductThunk.rejected.match(resultsAction)) {
        toastifyWarning((resultsAction.payload as string) || texts.errors.DELETE_PRODUCT_FAILED);
        return;
      }
      dispatch(getProducts({ currentPage: page, itemsPerPage: 5 }));
      toastifySuccess(texts.errors.DELETE_PRODUCT_SUCCESS);
    } else {
      dispatch(getProducts({ currentPage: page, itemsPerPage: 5 }));
    }

    reset();
    setShow(false);
  };

  const isDisable = actionType === ActionAdminEnum.DELETE || actionType === ActionAdminEnum.VIEW;
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0  bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50">
      <div className={`bg-white w-4/5 p-5 rounded-md flex flex-col ${animationClass}`}>
        <div className="border-b pb-3">
          <h1 className="text-center uppercase">
            {actionType === "add" ? "Thêm sán phẩm mới mới" : actionType === "edit" ? "Sửa thông tin sản phẩm" : "Xóa sản phẩm"}
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4 mt-8 overflow-hidden">
          <div>
            <div className="flex flex-col gap-2">
              <label htmlFor="phone">Tên sản phẩm</label>
              <Input className="border px-1 py-1 rounded-sm" id="product_name" {...register("product_name")} disabled={isDisable} />
              {errors.product_name && <span className="text-red-500">{errors.product_name.message}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="id_manu">Nhà cung cấp</label>
              <select id="id_manu" {...register("id_manu")} disabled={isDisable || manuItems.length === 0} className="border px-1 py-1 rounded-sm">
                <option value="">-- Chọn nhà cung cấp --</option>
                {manuItems.length > 0 ? (
                  manuItems.map((manu) => (
                    <option key={manu.id} value={manu.id}>
                      {manu.name}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    Đang tải...
                  </option>
                )}
              </select>
              {errors.id_manu && <span className="text-red-500">{errors.id_manu.message}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="birthday">Đơn giá</label>
              <Input className="border px-1 py-1 rounded-sm" type="number" id="price" {...register("price")} disabled={isDisable} />
              {errors.price && <span className="text-red-500">{errors.price.message?.toString()}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="full_name">Chiết khấu</label>
              <Input className="border px-1 py-1 rounded-sm" type="number" id="discount" {...register("discount")} disabled={isDisable} />
              {errors.discount && <span className="text-red-500">{errors.discount.message}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Chiết khấu khác</label>
              <Input className="border px-1 py-1 rounded-sm" id="other_discount" {...register("other_discount")} disabled={isDisable} />
              {errors.other_discount && <span className="text-red-500">{errors.other_discount.message}</span>}
            </div>
            <div className="grid">
              <div className="flex flex-col gap-2 row-span-1">
                <label htmlFor="email">Số lượng nhập</label>
                <Input className="border px-1 py-1 rounded-sm" id="quantity" {...register("quantity")} disabled={isDisable} />
                {errors.quantity && <span className="text-red-500">{errors.quantity.message}</span>}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-1 flex-col gap-2 row-span-4">
              <label htmlFor="email">Mô tả sản phẩm</label>
              <textarea className="border px-1 py-1 h-full rounded-sm" id="quantity" {...register("description")} disabled={isDisable} />
              {errors.description && <span className="text-red-500">{errors.description.message}</span>}
            </div>
            <div className="col-span-2 flex items-center gap-10 w-full">
              <InputDropzone fileUploaded={previewImage} setFileUploaded={setPreviewImage} />
              {errors.createAt?.message && <span className="text-red-500 text-center col-span-2">{errors.createAt.message}</span>}
            </div>
          </div>
          <div className="col-span-2 border-t flex justify-end gap-2 p-5">
            {actionType === "view" ? null : (
              <Button width="150px" height="30px" type="submit" className=" bg-colorPrimary text-white rounded ">
                {actionType === "add" ? "Thêm mới" : actionType === "edit" ? "Sửa" : "Xóa"}
              </Button>
            )}
            <Button width="150px" height="30px" onClick={handleClose} type="button" className=" bg-blue-500 text-white rounded">
              Thoát
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormAddProductAdmin;
