import { axiosIntance } from "../utils/axiosConfig";

export async function getProductNew() {
  try {
    const res = await axiosIntance.get(`product/new_product`);
    return res;
  } catch (err) {
    console.log(err);
  }
}
