import { ProductsType } from "types";
import { axiosInstance } from "../../utils/axiosConfig";
import { CreateProductType, ProductParaType, ResProductType } from "./type";
import dayjs from "dayjs";

export async function getProduct({ currentPage, itemsPerPage, sort, manufacturer }: ProductParaType) {
  try {
    const res: ResProductType = await axiosInstance.get(`product/get-all`, {
      params: {
        manufacturer,
        sort,
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

export async function cretaeProduct({
  id_manu,
  createAt = `${dayjs().format("YYYY-MM-DD")}`,
  thumbnail,
  name,
  price,
  discount,
  quantity,
  other_discount,
  description,
}: CreateProductType) {
  try {
    console.log(thumbnail);

    const res = await axiosInstance.post(
      "product/create",
      { id_manu, createAt, thumbnail, name, price, discount, quantity, description, other_discount },

      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function deleteProduct(id: number) {
  try {
    const res = await axiosInstance.delete(`product/${id}/create`);
    return res.data;
  } catch (err) {
    throw err;
  }
}
