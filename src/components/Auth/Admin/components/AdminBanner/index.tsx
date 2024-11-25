import { texts } from "contains/texts";
import ButtonAction from "customs/ButtonAction";
import ImageLazy from "customs/ImageLazy";
import Table from "customs/Table";
import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import { useEffect } from "react";
import { getBannersThunk } from "redux/home/homeThunk";

function AdminBanner() {
  const { banners } = useAppSelector((state) => state.home);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getBannersThunk());
  }, [dispatch]);
  const columns = [texts.banner.STT, texts.banner.IMAGE, texts.banner.PATH];
  const rows = banners?.map((banner) => [
    banner.id,
    <div className="w-56" key={banner.id}>
      <ImageLazy src={banner.image} alt="banner" isObjectFitCover="cover" />
    </div>,
    ,
    banner.path,
  ]);
  const handleDelete = (id) => {
    dispatch(getBannersThunk());
  };
  return (
    <div>
      <Table columns={columns} rows={rows} operations={(id: number | string) => <ButtonAction id={id} onDelete={handleDelete} />} />
    </div>
  );
}

export default AdminBanner;
