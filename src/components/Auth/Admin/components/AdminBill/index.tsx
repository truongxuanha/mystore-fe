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
import Loader from "components/Loader";
import { getAllBillThunk } from "redux/bill/billThunk";

const option = [
  { option_id: 1, title: texts.list_staff.ALL_STAFF, value: "all" },
  { option_id: 2, title: texts.list_staff.MANAGER, value: "0" },
  { option_id: 3, title: texts.list_staff.STAFF, value: "2" },
];

function AdminOrder() {
  const dispatch = useAppDispatch();
  const { bills, totalPage, loadingBill } = useAppSelector((state) => state.bill);

  const [show, setShow] = useState<boolean>(false);
  const [actionType, setActionType] = useState<ActionAdminEnum>();
  const [currentProduct, setCurrentProduct] = useState<any>();
  const page = useGetSearchParams(["page"]).page || 1;
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    dispatch(getProducts({ query: searchQuery, itemsPerPage: 5 }));
  };
  useEffect(() => {
    dispatch(getAllBillThunk({ query: "", page, item: 5 }));
  }, [dispatch, page]);
  const columns = [
    texts.bill.BILL_ID,
    texts.bill.CUSTOMER_ID,
    texts.bill.CUSTOMER,
    texts.bill.EMAIL,
    texts.bill.PHONR_NUMBER,
    texts.bill.CREATE_AT,
    texts.bill.DISCOUNT,
    texts.bill.STATUS,
    texts.bill.ACTIONS,
  ];
  const rowProduct = bills?.map((bill) => [bill.id, bill.id_account, bill.account_name, bill.email, bill.phone, bill.createAt, bill.discount, bill.status]);
  const handleEdit = (id: number | string) => {
    setShow(true);
    setActionType(ActionAdminEnum.EDIT);
    const bill = bills.filter((bill) => bill.id === id);

    setCurrentProduct(bill[0]);
  };
  const handleAdd = () => {
    setShow(true);
    setActionType(ActionAdminEnum.ADD);
    setCurrentProduct([]);
  };
  const handleDelete = (id: number | string) => {
    setShow(true);
    setActionType(ActionAdminEnum.DELETE);
    const bill = bills.filter((bill) => bill.id === id);
    setCurrentProduct(bill[0]);
  };

  const handleView = (id: number | string) => {
    setShow(true);
    setActionType(ActionAdminEnum.VIEW);
    const bill = bills.filter((bill) => bill.id === id);
    setCurrentProduct(bill[0]);
  };

  return (
    <div className="px-3 bg-white">
      <div>
        {loadingBill && <Loader />}
        <div className="flex justify-between mt-2 bg-colorBody p-4">
          <div className="flex bg-white items-center h-10 w-80 border border-corlorBorder">
            <Input type="search" placeholder="Tìm kiếm..." className="h-full px-2 flex-1" onChange={handleChange} />
            <span onClick={handleSearch} className="bg-colorPrimary h-full flex items-center px-3 cursor-pointer">
              <MagnifyingGlassIcon width={25} height={25} className="text-white" />
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
    </div>
  );
}

export default AdminOrder;
