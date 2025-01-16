import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import useGetSearchParams from "hooks/useGetSearchParams";
import { texts } from "libs/contains/texts";
import { useEffect, useState } from "react";
import { ActionAdminEnum } from "types/admin.type";
import Table from "customs/Table";
import ButtonAction from "customs/ButtonAction";
import Pagination from "customs/Pagination";
import { Input } from "@headlessui/react";
import { getAllManuThunk } from "redux/manufacture/manuThunk";
import ImageLazy from "customs/ImageLazy";
import FormProviderAdmin from "../components/FormProvider";
import useDebounce from "hooks/useDebouncs";
import { useSearchParams } from "react-router-dom";
import { PAGE } from "types";
import useParams from "hooks/useParams";

const AdminProvider = () => {
  const dispatch = useAppDispatch();
  const { manufactures, totalPage } = useAppSelector((state) => state.manufacturer);

  const [show, setShow] = useState<boolean>(false);
  const [actionType, setActionType] = useState<ActionAdminEnum>();
  const [currentProvider, setCurrentProvider] = useState<any>();
  const page = useGetSearchParams(["page"]).page || 1;
  const { clearParams, setNewsParams } = useParams();

  // const [searchQuery, setSearchQuery] = useState("");

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const query = e.target.value;
  //   setSearchQuery(query);
  // };

  // const handleSearch = () => {
  //   if (!searchQuery.trim()) return;
  //   dispatch(getProducts({ query: searchQuery, itemsPerPage: 5 }));
  // };
  const [searchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get("search") || "");
  const debounce = useDebounce({ value: searchQuery, delay: 500 });
  const currentPage: number = parseInt(searchParams.get(PAGE.page) || "1");

  useEffect(() => {
    setNewsParams({ search: searchQuery, page });
    if (!debounce && debounce !== "") return;
    if (searchQuery === "") {
      clearParams(["search"]);
    }
    dispatch(getAllManuThunk({ query: searchQuery, page, item: 5 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, currentPage, debounce]);

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
    <div key={manu.name} className="w-20 h-20">
      <ImageLazy isObjectFitCover="contain" src={manu.img} alt="image-manu" />
    </div>,
  ]);
  const handleEdit = (id: number | string) => {
    setShow(true);
    setActionType(ActionAdminEnum.EDIT);
    const manu = manufactures.filter((manu) => manu.id === id);

    setCurrentProvider(manu[0]);
  };
  const handleAdd = () => {
    setShow(true);
    setActionType(ActionAdminEnum.ADD);
    setCurrentProvider([]);
  };
  const handleDelete = (id: number | string) => {
    setShow(true);
    setActionType(ActionAdminEnum.DELETE);
    const manu = manufactures.filter((manu) => manu.id === id);
    setCurrentProvider(manu[0]);
  };

  const handleView = (id: number | string) => {
    setShow(true);
    setActionType(ActionAdminEnum.VIEW);
    const manu = manufactures.filter((manu) => manu.id === id);
    setCurrentProvider(manu[0]);
  };

  return (
    <div className="px-3 bg-white">
      <div className="flex justify-between mt-2 bg-colorBody p-4">
        <div className="flex bg-white items-center h-9 w-80 border border-colorPrimary">
          <Input type="search" placeholder="Tìm kiếm..." className="h-full px-2 flex-1" onChange={(e) => setSearchQuery(e.target.value)} />
          <span className="h-full flex items-center px-3 cursor-pointer bg-colorPrimary ">
            <MagnifyingGlassIcon width={20} height={20} />
          </span>
        </div>
        <div className="flex gap-2 items-center">
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
        {show && <FormProviderAdmin setShow={setShow} currentProvider={currentProvider} actionType={actionType} />}
      </div>
    </div>
  );
};

export default AdminProvider;
