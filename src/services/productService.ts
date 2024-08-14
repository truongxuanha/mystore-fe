import { requestJWT } from "../utils/axiosConfig";

export async function getInFoProduct(slug: string) {
  try {
    const res = await requestJWT.get(`product/${slug}`);
    return res;
  } catch (err) {
    console.log(err);
  }
}
