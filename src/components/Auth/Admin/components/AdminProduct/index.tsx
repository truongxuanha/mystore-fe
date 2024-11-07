import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import HeaderAdmin from "../components/HeaderAdmin";
import Input from "../../../../../customs/Input";
import { texts } from "../../../../../contains/texts";
import FormAddProductAdmin from "../components/FormAddProductAdmin";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/useAppDispatch";
import { useEffect, useState } from "react";
import { getProducts } from "../../../../../redux/reducer/productReducer/productThunk";
import Table from "../../../../../customs/Table";
import ButtonAction from "../../../../../customs/ButtonAction";
const option = [
  { option_id: 1, title: texts.list_staff.ALL_STAFF, value: "all" },
  { option_id: 2, title: texts.list_staff.MANAGER, value: "0" },
  { option_id: 3, title: texts.list_staff.STAFF, value: "2" },
];

function AdminProduct() {
  const dispatch = useAppDispatch();
  const { products, totalProduct } = useAppSelector((state) => state.product);
  const [show, setShow] = useState<boolean>(false);
  const [actionType, setActionType] = useState<"edit" | "delete" | "add" | "view" | null>(null);
  const [currentProduct, setCurrentProduct] = useState<any>();
  useEffect(() => {
    dispatch(getProducts({}));
  }, []);
  const columns = [
    texts.product.PRODUCT_ID,
    texts.product.PRODUCT_NAME,
    texts.product.MANUFACTURE,
    "Đơn giá (vnđ)",
    "Chiết khấu (%)",
    "Chiết khấu khác (%)",
    "Số lượng nhập",
    "Số lượng còn lại",
    texts.infor_account.ACTION,
  ];

  const rowProduct = products?.map((product) => [
    product.id,
    product.product_name,
    product.slug,
    product.price,
    product.discount,
    product.other_discount,
    product.quantity,
    product.remaining_quantity,
  ]);
  const handleEdit = (id: string) => {
    setShow(true);
    setActionType("edit");
    const acc = products.filter((acc) => acc.id === id);
    setCurrentProduct(acc[0]);
  };
  const handleAdd = () => {
    setShow(true);
    setActionType("add");
    setCurrentProduct([]);
  };
  const handleDelete = (id: string) => {
    setShow(true);
    setActionType("delete");
    const acc = products.filter((acc) => acc.id === id);
    setCurrentProduct(acc[0]);
  };

  const handleView = (id: string) => {
    setShow(true);
    setActionType("view");
    const acc = products.filter((acc) => acc.id === id);
    setCurrentProduct(acc[0]);
  };

  return (
    <div className="col-span-5">
      <HeaderAdmin />
      <div>
        <div className="flex justify-between mt-2 bg-colorBody p-4">
          <div className="flex bg-white items-center h-8 border">
            <Input type="search" placeholder="Tìm kiếm..." className="h-full px-2" />
            <span className="bg-colorPrimary h-full flex items-center px-3 cursor-pointer">
              <MagnifyingGlassIcon className="w-4 h-4 " />
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
        <div>
          <Table
            columns={columns}
            rows={rowProduct}
            operations={(id: string) => <ButtonAction id={id} onEdit={handleEdit} onDelete={handleDelete} onView={handleView} />}
          />
          {show && <FormAddProductAdmin actionType={actionType} setShow={setShow} initialData={currentProduct} />}
        </div>
      </div>
    </div>
  );
}

export default AdminProduct;
