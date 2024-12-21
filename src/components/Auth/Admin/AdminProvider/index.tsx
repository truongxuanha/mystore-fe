import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import useGetSearchParams from "hooks/useGetSearchParams";
import { texts } from "libs/contains/texts";
import { useEffect, useState } from "react";
import { getProducts } from "redux/product/productThunk";
import { ActionAdminEnum } from "types/admin.type";
import Table from "customs/Table";
import ButtonAction from "customs/ButtonAction";
import FormAddProductAdmin from "../components/FormAddProductAdmin";
import Pagination from "customs/Pagination";
import { Input } from "@headlessui/react";
import { getAllManuThunk } from "redux/manufacture/manuThunk";
import ImageLazy from "customs/ImageLazy";

const option = [
  { option_id: 1, title: texts.list_staff.ALL_STAFF, value: "all" },
  { option_id: 2, title: texts.list_staff.MANAGER, value: "0" },
  { option_id: 3, title: texts.list_staff.STAFF, value: "2" },
];

function AdminProvider() {
  const dispatch = useAppDispatch();
  const { manufactures, totalPage } = useAppSelector((state) => state.manufacturer);

  const [show, setShow] = useState<boolean>(false);
  const [actionType, setActionType] = useState<ActionAdminEnum>();
  const [currentProduct, setCurrentProduct] = useState<any>();
  const page = useGetSearchParams(["page"]).page || 1;
  // const [searchQuery, setSearchQuery] = useState("");

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const query = e.target.value;
  //   setSearchQuery(query);
  // };

  // const handleSearch = () => {
  //   if (!searchQuery.trim()) return;
  //   dispatch(getProducts({ query: searchQuery, itemsPerPage: 5 }));
  // };
  useEffect(() => {
    dispatch(getAllManuThunk({ query: "", page, item: 5 }));
  }, [dispatch, page]);
  const columns = [
    texts.manufacture.MANUFACTURE_ID,
    texts.manufacture.MANUFACTURE,
    texts.manufacture.PHONE_NUMBER,
    texts.manufacture.WEBSITE,
    texts.manufacture.IMAGE,
    texts.manufacture.ACTIONS,
  ];
  const rowProduct = manufactures?.map((manu) => [
    manu.id,
    manu.name,
    manu.phone,
    manu.website,
    <div key={manu.id} className="w-20 h-20">
      <ImageLazy isObjectFitCover="contain" src={manu.img} alt="image-manu" />
    </div>,
  ]);
  const handleEdit = (id: number | string) => {
    setShow(true);
    setActionType(ActionAdminEnum.EDIT);
    const manu = manufactures.filter((manu) => manu.id === id);

    setCurrentProduct(manu[0]);
  };
  const handleAdd = () => {
    setShow(true);
    setActionType(ActionAdminEnum.ADD);
    setCurrentProduct([]);
  };
  const handleDelete = (id: number | string) => {
    setShow(true);
    setActionType(ActionAdminEnum.DELETE);
    const manu = manufactures.filter((manu) => manu.id === id);
    setCurrentProduct(manu[0]);
  };

  const handleView = (id: number | string) => {
    setShow(true);
    setActionType(ActionAdminEnum.VIEW);
    const manu = manufactures.filter((manu) => manu.id === id);
    setCurrentProduct(manu[0]);
  };

  return (
    <div className="px-3 bg-white">
      <div className="flex justify-between mt-2 bg-colorBody p-4">
        <div className="flex bg-white items-center h-8 w-80 border border-blue-300">
          <Input type="search" placeholder="Tìm kiếm..." className="h-full px-2 flex-1" />
          <span className="h-full flex items-center px-3 cursor-pointer bg-blue-500 ">
            <MagnifyingGlassIcon width={20} height={20} />
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <select className="h-8 px-4">
            {option.map((opt) => (
              <option key={opt.option_id} value={opt.value}>
                {opt.title}
              </option>
            ))}
          </select>
          <button onClick={() => handleAdd()} className="bg-colorPrimary px-5 h-8">
            <PlusIcon className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
      <div className="my-5">
        <Table
          columns={columns}
          rows={rowProduct}
          operations={(id: number | string) => <ButtonAction id={id} onEdit={handleEdit} onDelete={handleDelete} onView={handleView} />}
        />
        <Pagination totalPage={totalPage} currentPage={1} />
        {show && <FormAddProductAdmin actionType={actionType} setShow={setShow} initialData={currentProduct} />}
      </div>
    </div>
  );
}

export default AdminProvider;
