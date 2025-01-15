import { useEffect, useRef, useState } from "react";
import { MainContent, WrapperFormImport } from "./styled";
import { ProductsType } from "types";
import { axiosInstance } from "utils/axiosConfig";
import Button from "customs/Button";
import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import { getManuThunk } from "redux/manufacture/manuThunk";
import { isEmpty } from "utils";
import { PlusIcon, SearchIcon } from "lucide-react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { importProductThunk } from "redux/admin/adminThunk";
import { CreateImportType } from "redux/admin/type";
import { getProducts } from "redux/product/productThunk";
import useDebounce from "hooks/useDebouncs";

interface ImportDataType {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  supplierId: number | null;
}

const ImportProduct = () => {
  const [products, setProducts] = useState<ProductsType[]>([]);
  const [importData, setImportData] = useState<ImportDataType[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [note, setNote] = useState<string>("");
  const { currentUser } = useAppSelector((state) => state.auth);
  const { manuItems } = useAppSelector((state) => state.manufacturer);
  const [searchQuery, setySearchQuery] = useState("");
  const debounce = useDebounce({ value: searchQuery, delay: 500 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axiosInstance.get("/product");
        setProducts(data.data);
      } catch (err) {}
    };
    fetchProduct();
  }, []);

  useEffect(() => {
    dispatch(getManuThunk());
  }, [dispatch]);

  const handleAddProduct = () => {
    if (selectedProduct !== null) {
      const product = products.find((p) => p.product_id === selectedProduct);
      if (product && !importData.some((item) => item.productId === product.product_id)) {
        setImportData([
          ...importData,
          {
            productId: product.product_id,
            productName: product.product_name,
            quantity: 1,
            price: 0,
            supplierId: null,
          },
        ]);
      }
      setSelectedProduct(null);
    }
  };

  const handleChangeInput = (index: number, field: keyof ImportDataType, value: string | number) => {
    const updatedData: any = [...importData];
    updatedData[index][field] = value === "" ? 0 : Number(value);
    setImportData(updatedData);
  };

  const handleChangeSupplier = (index: number, supplierId: number) => {
    const updatedData = [...importData];
    updatedData[index].supplierId = supplierId;
    setImportData(updatedData);
  };

  const calculateProductTotal = (quantity: number, price: number) => quantity * price;

  const calculateTotalPrice = () => {
    return importData.reduce((total, item) => total + calculateProductTotal(item.quantity, item.price), 0);
  };

  const handleRemoveProduct = (productId: number) => {
    setImportData(importData.filter((data) => data.productId !== productId));
  };

  const handleImportProducts = () => {
    const data: CreateImportType = {
      total_cost: calculateTotalPrice(),
      note,
      details: importData.map((item) => ({
        id_product: item.productId,
        quantity: item.quantity,
        unit_price: item.price,
        provider_id: item.supplierId,
      })),
    };
    const callBack = () => {
      setImportData([]);
    };
    dispatch(importProductThunk({ params: data, callBack }));
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  const handleFocus = () => {
    if (searchQuery.trim()) {
      setIsDropdownOpen(true);
    }
  };
  const handleClickItemSearch = (id: number) => {
    const product = products.find((p) => p.product_id === id);
    if (product && !importData.some((item) => item.productId === product.product_id)) {
      setImportData([
        ...importData,
        {
          productId: product.product_id,
          productName: product.product_name,
          quantity: 1,
          price: 0,
          supplierId: null,
        },
      ]);
    }
    setIsDropdownOpen(false);
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    if (!debounce.trim()) return;
    dispatch(getProducts({ currentPage: 1, itemsPerPage: 50, query: debounce, manufacturer: "all" }));
    setIsDropdownOpen(true);
  }, [debounce, dispatch]);

  return (
    <WrapperFormImport>
      <h2 className="uppercase text-center py-2 text-2xl">Nhập hàng</h2>
      <MainContent>
        <div className="flex p-2 gap-5">
          <div className="flex items-center h-10 flex-1 relative" ref={containerRef}>
            <input
              type="search"
              className="border h-full flex-1 px-2 focus:border-red-200"
              placeholder="Tìm kiếm..."
              onFocus={handleFocus}
              value={searchQuery}
              onChange={(e) => setySearchQuery(e.target.value)}
            />
            <div className="h-full flex items-center bg-colorPrimary px-3">
              <SearchIcon color="white" />
            </div>
            {isDropdownOpen && !!searchQuery && (
              <ul className="max-h-80 overflow-y-auto bar transition-all absolute top-10 scrollbar">
                {!isEmpty(products) &&
                  products.map((product) => (
                    <li
                      key={product.id}
                      className="p-2 hover:bg-orange-100 cursor-pointer border-b last:border-none bg-gray-100"
                      onClick={() => handleClickItemSearch(product.product_id)}
                    >
                      <div className="text-sm cursor-pointer">
                        <span className="flex items-center">
                          <p className="ml-2">
                            {product?.product_name} - {product?.price?.toLocaleString()} VND
                          </p>
                        </span>
                      </div>
                    </li>
                  ))}
              </ul>
            )}
          </div>
          <div>
            <select value={selectedProduct || ""} onChange={(e) => setSelectedProduct(Number(e.target.value))} className="border h-10 mb-2">
              <option value="" disabled>
                Chọn sản phẩm
              </option>
              {products.map((product) => (
                <option key={product.product_id} value={product.product_id}>
                  {product.product_name}
                </option>
              ))}
            </select>
          </div>
          <Button width="80px" height="40px" className="bg-blue-500 text-white" onClick={handleAddProduct}>
            <PlusIcon />
          </Button>
        </div>

        <div className="px-2 overflow-y-auto product-list flex-1" style={{ maxHeight: "580px" }}>
          <h3 className="text-center uppercase">Chi tiết nhập hàng</h3>
          <div className="flex gap-10">
            <div className="flex flex-col">
              <label>Nhân viên</label>
              <input placeholder="Nhân viên" value={currentUser?.user.account_name} className="border p-2" disabled />
            </div>
            <div className="flex flex-col">
              <label>Tổng tiền hàng</label>
              <input placeholder="Tổng tiền..." value={calculateTotalPrice().toLocaleString()} className="border p-2" disabled />
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
      </MainContent>
    </WrapperFormImport>
  );
};

export default ImportProduct;
