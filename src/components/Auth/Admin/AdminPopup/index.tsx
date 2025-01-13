import { PencilSquareIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Button from "customs/Button";
import ImageLazy from "customs/ImageLazy";
import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import { texts } from "libs/contains/texts";
import { useEffect, useState } from "react";
import { deletePopupThunk, getPopupThunk } from "redux/home/homeThunk";
import { isEmpty } from "../../../../utils/index";
import FormPopup from "../components/FormPopup";
import { SalePopupType } from "redux/home/type";

function AdminSalePopup() {
  const { salePopup } = useAppSelector((state) => state.home);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editPopup, setEditPopup] = useState<SalePopupType>();
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getPopupThunk());
  }, [dispatch]);
  const callBack = () => {
    dispatch(getPopupThunk());
  };
  const handleCreate = () => {
    setShowModal(true);
    setIsEdit(false);
  };
  const handleDelete = (id: number) => {
    dispatch(deletePopupThunk({ id, callBack }));
  };
  const handleUpdate = (id: string | number) => {
    setShowModal(true);
    const popupEdit = salePopup?.find((popup) => popup.popup_id === id);
    setIsEdit(true);
    setEditPopup(popupEdit);
  };
  return (
    <div className="px-5 flex-1">
      <div className="flex justify-end my-3">
        <div className="bg-colorPrimary px-5 py-1 rounded-md">
          <Button onClick={handleCreate} className="text-white" img={<PlusIcon className="text-white" width={24} height={24} />}>
            Thêm mới
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-10 text-center bg-slate-200 ">
        <div className="col-span-1 h-10 border center-config">{texts.banner.STT}</div>
        <div className="col-span-3 h-10 border center-config">{texts.banner.IMAGE}</div>
        <div className="col-span-4 border h-10 center-config">{texts.banner.PATH}</div>
        <div className="col-span-2 border h-10 center-config">{texts.banner.ACTIONS}</div>
      </div>
      {!isEmpty(salePopup) &&
        salePopup?.map((popup, index) => (
          <div key={popup.popup_id} className="grid grid-cols-10 bg-white">
            <div className="col-span-1 w-full h-40 border center-config">{index + 1}</div>
            <div className="col-span-3 w-full p-5 h-40 border center-config">
              <ImageLazy isObjectFitCover="contain" src={popup.popup_img} alt="banner" />
            </div>
            <div className="col-span-4 w-full h-40 border center-config">{popup.url_transit}</div>
            <div className="col-span-2 w-full h-40 border flex gap-3  center-config">
              <div className="w-10 rounded-md bg-red-500">
                <Button img={<TrashIcon width={25} height={30} className="text-white" />} onClick={() => handleDelete(popup.popup_id)} />
              </div>
              <div className="w-10 rounded-md bg-blue-500">
                <Button img={<PencilSquareIcon width={25} height={30} className="text-white" />} onClick={() => handleUpdate(popup.popup_id)} />
              </div>
            </div>
          </div>
        ))}
      {showModal && <FormPopup setShowModal={setShowModal} isEdit={isEdit} popupData={editPopup} />}
    </div>
  );
}

export default AdminSalePopup;
