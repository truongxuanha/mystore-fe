import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import useGetSearchParams from "hooks/useGetSearchParams";
import { texts } from "libs/contains/texts";
import { useEffect, useState } from "react";
import { getProducts } from "redux/product/productThunk";
import Table from "customs/Table";
import ButtonAction from "customs/ButtonAction";
import Pagination from "customs/Pagination";
import { Input } from "@headlessui/react";
import { getAllBillThunk } from "redux/bill/billThunk";
import FormOrderAdmin from "../components/FormOrderAdmin";

const option = [
  { option_id: 1, title: texts.list_staff.ALL_STAFF, value: "all" },
  { option_id: 2, title: texts.list_staff.MANAGER, value: "0" },
  { option_id: 3, title: texts.list_staff.STAFF, value: "2" },
];

function AdminOrder() {
  const dispatch = useAppDispatch();
  const { bills, totalPage } = useAppSelector((state) => state.bill);

  const [showModal, setShowModal] = useState<boolean>(false);
  const page = useGetSearchParams(["page"]).page || 1;
  const [searchQuery, setSearchQuery] = useState("");
  const [currentOrderDetail, setCurrentOrderDetail] = useState<any>();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    dispatch(getProducts({ query: searchQuery, itemsPerPage: 5 }));
  };
  useEffect(() => {
    if (bills) return;
    dispatch(getAllBillThunk({ query: "", page, item: 5 }));
  }, [bills, dispatch, page]);
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
  const statusBill: any = {
    [0]: "Chờ xác nhận",
    [1]: "Đang giao",
    [2]: "Đã giao",
    [3]: "Đã hủy",
  };

  const rowProduct = bills
    ? bills?.map((bill) => [bill.id, bill.id_account, bill.account_name, bill.email, bill.phone, bill.createAt, bill.discount, statusBill[bill.status]])
    : [];
  const handleEdit = (id: number | string) => {
    setShowModal(true);
    const bill = bills ? bills.filter((bill) => bill.id === id) : [];
    setCurrentOrderDetail(bill[0]);
  };
  return (
    <div className="px-3 bg-white">
      <div>
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
          </div>
        </div>
        <div className="my-5">
          <Table columns={columns} rows={rowProduct} operations={(id: number | string) => <ButtonAction id={id} onView={handleEdit} />} />
          <Pagination totalPage={totalPage} currentPage={1} />
          {showModal && <FormOrderAdmin setShow={setShowModal} currentOrderDetail={currentOrderDetail} />}
        </div>
      </div>
    </div>
  );
}

export default AdminOrder;
