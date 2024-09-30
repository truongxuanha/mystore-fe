import { ProductsType } from "types";
import { axiosInstance } from "../../utils/axiosConfig";
import { ProductParaType, ResProductType } from "./type";

export async function getProduct({
  currentPage,
  itemsPerPage,
  manufacturer,
}: ProductParaType) {
  try {
    const res: ResProductType = await axiosInstance.get(`product/get-all`, {
      params: {
        manufacturer,
        sort: "ASC",
        query: "",
        page: currentPage,
        item: itemsPerPage,
      },
    });
    if (!res.data.status) throw new Error("Faill");
    return res;
  } catch (err) {
    throw err;
  }
}
export async function fetchAllProduct() {
  try {
    const res = await axiosInstance.get(`/product`);

    return res.data;
  } catch (err) {
    console.log(err);
  }
}
export async function getInFoProduct(slug: ProductsType["slug"]) {
  try {
    const res: ResProductType = await axiosInstance.get(`product/${slug}`);

    return res;
  } catch (err) {
    console.log(err);
  }
}

export async function getHotProduct() {
  const res: ResProductType = await axiosInstance.get(`product/hot_product`);
  return res.data;
}

export async function getProductNew() {
  try {
    const res: ResProductType = await axiosInstance.get(`product/new_product`);

    if (!res.data.status) throw Error("Faill fetch product new!!");
    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function randomProduct() {
  try {
    const res: ResProductType = await axiosInstance.get(`product/random`);

    if (!res.data.status) throw Error("Faill fetch product new!!");
    return res.data;
  } catch (err) {
    throw err;
  }
}
