import { TrashIcon } from "@heroicons/react/24/outline";
import Button from "customs/Button";
import { useAppSelector } from "hooks/useAppDispatch";
import { isEmpty } from "utils";
type Props = {
  calculateTotalPrice: any;
  note: string;
  setNote: (note: string) => void;
  importData: any[];
  handleChangeInput: (i: number, type: any, e: any) => void;
  handleChangeSupplier: (quantity: number, price: number) => void;
  calculateProductTotal: (quantity: number, price: number) => number;
  handleImportProducts: () => void;
  handleRemoveProduct: (id: number) => void;
};
const FormImport = ({
  calculateTotalPrice,
  note,
  importData,
  setNote,
  handleChangeInput,
  handleChangeSupplier,
  calculateProductTotal,
  handleImportProducts,
  handleRemoveProduct,
}: Props) => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const { manuItems } = useAppSelector((state) => state.manufacturer);
  return (
    <div className="px-2 overflow-y-auto product-list flex-1" style={{ maxHeight: "580px" }}>
      <h3 className="text-center uppercase">Chi tiết nhập hàng</h3>
      <div className="flex gap-10">
        <div className="flex flex-col">
          <label>Nhân viên</label>
          <input placeholder="Nhân viên" value={currentUser?.user.account_name} className="border p-2" disabled />
        </div>
        <div className="flex flex-col">
          <label>Tổng tiền hàng</label>
          <input placeholder="Tổng tiền..." value={calculateTotalPrice} className="border p-2" disabled />
        </div>
      </div>
      <div className="flex flex-col my-5">
        <label>Thông tin nhập hàng</label>
        <textarea className="border p-2" placeholder="Nhập thông tin..." value={note} onChange={(e) => setNote(e.target.value)} />
      </div>

      {importData.map((item, index) => (
        <div key={item.productId} className="border-t border-b px-2 py-3 rounded-sm mb-2 shadow mt-5">
          <h4 className="font-medium mb-3">{item.productName}</h4>
          <div className="flex justify-between gap-5">
            <div className="flex flex-col">
              <label>Số lượng</label>
              <input
                type="number"
                min={1}
                className="border p-2"
                placeholder="Số lượng"
                value={item.quantity || ""}
                onChange={(e) => handleChangeInput(index, "quantity", e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label>Giá nhập</label>
              <input
                type="number"
                min={0}
                className="border p-2"
                placeholder="Giá nhập"
                value={item.price || ""}
                onChange={(e) => handleChangeInput(index, "price", e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label>Nhà cung cấp</label>
              <select value={item.supplierId || ""} onChange={(e) => handleChangeSupplier(index, Number(e.target.value))} className="border p-2">
                <option value="" disabled>
                  Chọn nhà cung cấp
                </option>
                {manuItems.map((supplier) => (
                  <option key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label>Thành tiền</label>
              <input type="text" className="border p-2" value={calculateProductTotal(item.quantity, item.price).toLocaleString()} disabled />
            </div>
            <div className="flex items-center">
              <TrashIcon width={25} height={25} color="red" className="cursor-pointer" onClick={() => handleRemoveProduct(item.productId)} />
            </div>
          </div>
        </div>
      ))}

      {!isEmpty(importData) && (
        <div className="flex justify-center mt-10">
          <Button width="150px" height="40px" className="bg-blue-500 text-white" onClick={handleImportProducts}>
            Nhập hàng
          </Button>
        </div>
      )}
    </div>
  );
};

export default FormImport;
