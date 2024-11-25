import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Button from "customs/Button";
import ImageLazy from "customs/ImageLazy";
import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import { texts } from "libs/contains/texts";
import { useEffect } from "react";
import { deleteBannersThunk, getBannersThunk } from "redux/home/homeThunk";

function AdminBanner() {
  const { banners } = useAppSelector((state) => state.home);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getBannersThunk());
  }, [dispatch]);

  const handleDelete = (id: string | number) => {
    dispatch(deleteBannersThunk(id));
  };
  return (
    <div className="px-5">
      <div className="flex justify-end my-3">
        <div className="bg-colorPrimary px-5 py-1 rounded-md">
          <Button className="text-white" img={<PlusIcon className="text-white" width={24} height={24} />}>
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
      {banners.map((banner, index) => (
        <div key={banner.id} className="grid grid-cols-10 bg-white">
          <div className="col-span-1 w-full h-40 border center-config">{index + 1}</div>
          <div className="col-span-3 w-full p-5 h-40 border center-config">
            <ImageLazy isObjectFitCover="contain" src={banner.image} alt="banner" />
          </div>
          <div className="col-span-4 w-full h-40 border center-config">{banner.path}</div>
          <div className="col-span-2 w-full h-40 border  center-config">
            <div className="w-10 rounded-md bg-red-500">
              <Button img={<TrashIcon width={25} height={30} className="text-white" />} onClick={() => handleDelete(banner.id)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminBanner;
