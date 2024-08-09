import { axiosIntance } from "../utils/axiosConfig";

export async function getInFoProduct(slug: string) {
  try {
    const res = await axiosIntance.get(`product/${slug}`);
    return res;
  } catch (err) {
    console.log(err);
  }
}
