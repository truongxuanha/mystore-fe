import { requestJWT } from "../utils/axiosConfig";

export async function getHotProduct() {
  try {
    const res = await requestJWT.get(`product/hot_product`);
    return res;
  } catch (err) {
    console.log(err);
  }
}
