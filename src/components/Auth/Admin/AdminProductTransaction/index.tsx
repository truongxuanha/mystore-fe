import { useEffect, useState } from "react";
import ImportProduct from "../components/ImportProduct";
import ListImportProduct from "../components/ListImportProduct";
import useGetSearchParams from "hooks/useGetSearchParams";
import ExportProduct from "../components/ExportProduct/index";
export enum ActiveType {
  LIST = "list",
  IMPORT = "import",
  EXPORT = "export",
}
const AdminProductTransaction = () => {
  const [tabActive, setTabActive] = useState<ActiveType>(ActiveType.LIST);
  const tab = (useGetSearchParams(["tab"]).tab as ActiveType) || "list";
  useEffect(() => {
    setTabActive(tab);
  }, [tab]);
  const renderTab = {
    [ActiveType.LIST]: <ListImportProduct />,
    [ActiveType.IMPORT]: <ImportProduct />,
    [ActiveType.EXPORT]: <ExportProduct />,
  };
  return <div className="px-5">{renderTab[tabActive]}</div>;
};

export default AdminProductTransaction;
