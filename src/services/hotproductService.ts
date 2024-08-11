import { axiosIntance } from "../utils/axiosConfig";

export async function getHotProduct() {
  try {
    const res = await axiosIntance.get(`product/hot_product`);
    return res;
  } catch (err) {
    console.log(err);
  }
}
