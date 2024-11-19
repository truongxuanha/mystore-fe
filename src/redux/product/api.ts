import { axiosInstance } from "../../utils/axiosConfig";
import { CommentProductType, CreateProductType, EditProductType, ProductParaType, ResProductType } from "./type";
import dayjs from "dayjs";

export async function getProduct({ currentPage, itemsPerPage, sort, manufacturer, query }: ProductParaType) {
  try {
    const res: ResProductType = await axiosInstance.get(`product/get-all`, {
      params: {
        manufacturer,
        sort,
        query,
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
  const res = await axiosInstance.get(`/product`);
  return res.data;
}
export async function getInFoProduct(id: number) {
  const res: ResProductType = await axiosInstance.get(`product/product-detai/${id}`);
  return res;
}

export async function getHotProduct() {
  try {
    const res: ResProductType = await axiosInstance.get(`product/hot_product`);
    if (!res.data.status) throw Error("Faill fetch product new!!");
    return res.data;
  } catch (err) {
    throw err;
  }
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
  product_name,
  price,
  discount,
  quantity,
  other_discount,
  description,
}: CreateProductType) {
  try {
    const res = await axiosInstance.post(
      "product/create",
      { id_manu, createAt, thumbnail, name: product_name, price, discount, quantity, description, other_discount },

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
    const res = await axiosInstance.delete(`product/${id}/remove`);
    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function editProduct({
  id_manu,
  createAt = `${dayjs().format("YYYY-MM-DD")}`,
  thumbnail,
  product_name,
  price,
  discount,
  quantity,
  other_discount,
  description,
  product_id,
}: EditProductType) {
  try {
    const res = await axiosInstance.put(
      `product/${product_id}/update`,
      { id_manu, createAt, thumbnail, name: product_name, price, discount, quantity, description, other_discount, id: product_id },

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

export async function getCmtByIdProduct({ product_id, page = 1, item = 5, star = "all", sort = "DESC" }: CommentProductType) {
  try {
    const res = await axiosInstance.get(`ratting-comment/${product_id}/comment`, {
      params: {
        item,
        page,
        star,
        sort,
      },
    });
    return res;
  } catch (err) {
    throw err;
  }
}
