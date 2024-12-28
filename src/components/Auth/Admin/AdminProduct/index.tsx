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
import useParams from "hooks/useParams";
import { ITEM_IN_PAGE } from "libs/contains";
import FormAddImage from "../components/FormAddImage";
const option = [
  { option_id: 1, title: texts.option_sort.ALL_PRODUCT, value: "all" },
  { option_id: 2, title: texts.option_sort.UP, value: "ASC" },
  { option_id: 3, title: texts.option_sort.DOWN, value: "DESC" },
];

const AdminProduct = () => {
  const dispatch = useAppDispatch();
  const { products, totalPage } = useAppSelector((state) => state.product);
  const [show, setShow] = useState<boolean>(false);
  const [actionType, setActionType] = useState<ActionAdminEnum>();
  const [currentProduct, setCurrentProduct] = useState<any>();
  const page = useGetSearchParams(["page"]).page || 1;
  const { setParams } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const changeInfoProduct =
    actionType === ActionAdminEnum.ADD || actionType === ActionAdminEnum.EDIT || actionType === ActionAdminEnum.VIEW || actionType === ActionAdminEnum.DELETE;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    dispatch(getProducts({ query: searchQuery, itemsPerPage: ITEM_IN_PAGE }));
    setParams({ search: searchQuery });
  };
  useEffect(() => {
    dispatch(getProducts({ currentPage: page, itemsPerPage: ITEM_IN_PAGE, query: searchQuery ? searchQuery : undefined }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, page]);
  const columns = [
    texts.product.PRODUCT_ID,
    texts.product.PRODUCT_NAME,
    texts.product.MANUFACTURE,
    texts.product.PRICE,
    texts.product.DISCOUNT,
    texts.product.ORTHER_DISCOUNT,
    texts.product.QUANTITY,
    texts.product.REMAINING_QUANTITY,
    texts.infor_account.ACTION,
  ];
  const rowProduct = products?.map((product) => [
    product.product_id,
    product.product_name,
    product.slug,
    product.price,
    product.discount,
    product.other_discount,
    product.quantity,
    product.remaining_quantity,
  ]);
  const handleEdit = (id: number | string) => {
    setShow(true);
    setActionType(ActionAdminEnum.EDIT);
    const acc = products.filter((acc) => acc.product_id === id);
    setCurrentProduct(acc[0]);
  };
  const handleAdd = () => {
    setShow(true);
    setActionType(ActionAdminEnum.ADD);
    setCurrentProduct([]);
  };
  const handleDelete = (id: number | string) => {
    setShow(true);
    setActionType(ActionAdminEnum.DELETE);
    const acc = products.filter((acc) => acc.product_id === id);
    setCurrentProduct(acc[0]);
  };

  const handleView = (id: number | string) => {
    setShow(true);
    setActionType(ActionAdminEnum.VIEW);
    const acc = products.filter((acc) => acc.product_id === id);
    setCurrentProduct(acc[0]);
  };
  const handleOnChangeImage = (id: number | string) => {
    setShow(true);
    setActionType(ActionAdminEnum.CHANGE_IMAGE);
    const acc = products.filter((acc) => acc.product_id === id);
    setCurrentProduct(acc[0]);
  };
  const handleSort = (value: string) => {
    setParams({ sort: value });
    dispatch(getProducts({ currentPage: page, itemsPerPage: 5, query: searchQuery ? searchQuery : undefined, sort: value }));
  };
  return (
    <div className="px-3">
      <div className="flex justify-between mt-2 bg-colorBody p-4">
        <div className="flex bg-white items-center h-10 w-80 border border-corlorBorder">
          <Input type="search" placeholder="Tìm kiếm..." className="h-full px-2 flex-1" onChange={handleChange} />
          <span onClick={handleSearch} className="bg-colorPrimary h-full flex items-center px-3 cursor-pointer">
            <MagnifyingGlassIcon width={25} height={25} className="text-white" />
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <select className="h-8 px-4" onChange={(e) => handleSort(e.target.value)}>
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
      <div className="mb-5">
        <Table
          columns={columns}
          rows={rowProduct}
          operations={(id: number | string) => (
            <ButtonAction id={id} onChangeImage={handleOnChangeImage} onEdit={handleEdit} onDelete={handleDelete} onView={handleView} />
          )}
        />
        <Pagination totalPage={totalPage} currentPage={1} />
        {show && changeInfoProduct && <FormAddProductAdmin actionType={actionType} setShow={setShow} initialData={currentProduct} />}
        {actionType === ActionAdminEnum.CHANGE_IMAGE && show && <FormAddImage setShow={setShow} />}
      </div>
    </div>
  );
};

export default AdminProduct;
