import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import useGetSearchParams from "hooks/useGetSearchParams";
import { texts } from "libs/contains/texts";
import { useEffect, useState } from "react";
import Table from "customs/Table";
import ButtonAction from "customs/ButtonAction";
import Pagination from "customs/Pagination";
import { Input } from "@headlessui/react";
import { getAllBillThunk } from "redux/bill/billThunk";
import FormOrderAdmin from "../components/FormOrderAdmin";
import useDebounce from "hooks/useDebouncs";
import useParams from "hooks/useParams";
import { useSearchParams } from "react-router-dom";

const option = [
  { option_id: 1, title: "Tất cả", value: "all" },
  { option_id: 2, title: "Chờ xác nhận", value: "0" },
  { option_id: 3, title: "Chờ lấy hàng", value: "1" },
  { option_id: 3, title: "Đang giao hàng", value: "2" },
  { option_id: 3, title: "Đã giao hàng", value: "3" },
  { option_id: 3, title: "Đã hủy", value: "4" },
];
const statusConvert: { [key: number | string]: string } = {
  0: "wait_approval",
  1: "awaiting_pickup",
  2: "in_delivery",
  3: "delivered",
  4: "cancelled",
  all: "all",
};
function AdminOrder() {
  const dispatch = useAppDispatch();
  const { bills, totalPage } = useAppSelector((state) => state.bill);
  const page = useGetSearchParams(["page"]).page || 1;
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState("");
  const [currentOrderDetail, setCurrentOrderDetail] = useState<any>();
  const debounce = useDebounce({ value: searchQuery, delay: 500 });
  const { clearParams, setNewsParams } = useParams();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectOption, setSelectOption] = useState(searchParams.get("sort") || "all");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
  };
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectOption(selectedValue);
    const querySort = statusConvert[selectedValue];
    setSearchParams({ sort: querySort });
  };
  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    dispatch(getAllBillThunk({ query: searchQuery, page, item: 5 }));
  };
  useEffect(() => {
    if (!debounce && debounce !== "") return;
    setNewsParams({ query: searchQuery, status: selectOption });
    if (searchQuery === "") {
      clearParams(["query"]);
    }
    dispatch(getAllBillThunk({ query: searchQuery, page, item: 10, status: selectOption }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, page, debounce, selectOption]);
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
    [1]: "Chờ lấy hàng",
    [2]: "Đang giao",
    [3]: "Đã giao",
    [4]: "Đã hủy",
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
            <select className="h-8 px-4" onChange={handleSelect}>
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
