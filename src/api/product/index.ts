import { ProductsType } from "types";
import { axiosInstance } from "../../utils/axiosConfig";
import { ProductParaType, ResProductType } from "./type";

export async function getProduct({
  currentPage,
  itemsPerPage,
}: ProductParaType) {
  try {
    const res: ResProductType = await axiosInstance.get(`/product/search`, {
      params: {
        q: "i",
        min: "150000",
        max: "80000000",
        sort: "ASC",
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
  return res;
}

export async function getProductNew() {
  try {
    const res = await axiosInstance.get(`product/new_product`);
    return res;
  } catch (err) {
    console.log(err);
  }
}
