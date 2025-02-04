import ButtonAction from "customs/ButtonAction";
import Table from "customs/Table";
import { useEffect, useState } from "react";
import { axiosInstance } from "utils/axiosConfig";
import formatVND from "utils/formatVND";
import useParams from "hooks/useParams";
import ImportDetail from "../ImportProductDetail";
import { isEmpty } from "../../../../../utils/index";
import { ActiveType } from "../../AdminProductTransaction";
type ImportProductType = {
  id: number;
  employee_name: string;
  createAt: string;
  total_cost: number;
  note: string;
};

const ListImportProduct = () => {
  const [importProductData, setImportProductData] = useState<ImportProductType[]>([]);
  const [currentImport, setCurrentImport] = useState<any>([]);
  const [show, setShow] = useState<boolean>(false);

  const { setParams } = useParams();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axiosInstance.get("/revenue/get-all-import-product");
        setImportProductData(data.data);
      } catch (err) {}
    };
    fetchProduct();
  }, []);
  const handleView = (id: any) => {
    const detailImport = !isEmpty(importProductData) ? importProductData.filter((detail) => detail.id === id) : [];
    setCurrentImport(detailImport);
    setShow(true);
  };
  const handleTab = (tab: ActiveType) => {
    // setTabActive(ActiveType.IMPORT);
    setParams({ tab });
  };

  const columns = ["Mã đơn", "Nhân viên", "Ngày tạo", "Tổng tiền", "Mô tả", "Chi tiết"];
  const rows = importProductData?.map((data) => [data.id, data.employee_name, data.createAt, formatVND(data.total_cost), data.note]);
  return (
    <div>
      <h1 className="font-medium uppercase text-center my-5 text-2xl">Danh sách nhập kho</h1>
      <div className="flex justify-end gap-2 mb-4">
        <div className="py-1 px-2 rounded-sm font-medium text-gray-100 bg-red-500 cursor-pointer" onClick={() => handleTab(ActiveType.IMPORT)}>
          Nhập hàng
        </div>
        {/* <div className="py-1 px-2 rounded-sm font-medium text-gray-100 bg-green-500 cursor-pointer" onClick={() => handleTab(ActiveType.EXPORT)}>
          Xuất hàng
        </div> */}
      </div>
      <div className="shadow">
        <Table columns={columns} rows={rows} operations={(id: number | string) => <ButtonAction id={id} onView={handleView} />} />
      </div>
      {show && <ImportDetail currentImport={currentImport} setShow={setShow} />}
    </div>
  );
};

export default ListImportProduct;
