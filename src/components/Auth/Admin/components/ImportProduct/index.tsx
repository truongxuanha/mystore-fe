import { useEffect, useMemo, useRef, useState } from "react";
import { MainContent, WrapperFormImport } from "./styled";
import { ProductsType } from "types";
import { axiosInstance } from "utils/axiosConfig";
import { useAppDispatch } from "hooks/useAppDispatch";
import { getManuThunk } from "redux/manufacture/manuThunk";
import { importProductThunk } from "redux/admin/adminThunk";
import { CreateImportType } from "redux/admin/type";
import { getProducts } from "redux/product/productThunk";
import useDebounce from "hooks/useDebouncs";
import FormImport from "./FormImport";
import HeadImport from "./HeadImport";

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
  const [searchQuery, setSearchQuery] = useState("");
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
  const calculateTotalPrice = useMemo(() => {
    return importData.reduce((total, item) => total + calculateProductTotal(item.quantity, item.price), 0);
  }, [importData]);

  const handleRemoveProduct = (productId: number) => {
    setImportData(importData.filter((data) => data.productId !== productId));
  };

  const handleImportProducts = () => {
    const data: CreateImportType = {
      total_cost: calculateTotalPrice,
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
        <HeadImport
          containerRef={containerRef}
          handleAddProduct={handleAddProduct}
          handleClickItemSearch={handleClickItemSearch}
          handleFocus={handleFocus}
          isDropdownOpen={isDropdownOpen}
          products={products}
          searchQuery={searchQuery}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          setSearchQuery={setSearchQuery}
        />
        <FormImport
          calculateProductTotal={calculateProductTotal}
          calculateTotalPrice={calculateTotalPrice}
          setNote={setNote}
          note={note}
          handleChangeInput={handleChangeInput}
          handleChangeSupplier={handleChangeSupplier}
          handleImportProducts={handleImportProducts}
          handleRemoveProduct={handleRemoveProduct}
          importData={importData}
        />
      </MainContent>
    </WrapperFormImport>
  );
};

export default ImportProduct;
