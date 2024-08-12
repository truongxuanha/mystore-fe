import { ProductsType } from "types";
import { requestJWT } from "../utils/axiosConfig";
import dayjs from "dayjs";
interface CreateCartType {
  token: string;
  id_product: ProductsType["id"];
  quantity: number;
}
export async function postCreateCart({
  token,
  id_product,
  quantity,
}: CreateCartType) {
  try {
    const res = await requestJWT.post(
      "/cart/create",
      [
        {
          createAt: dayjs().format("YYYY-MM-DD HH:mm:ss"),
          id_product: id_product,
          quantity: quantity,
        },
      ],
      {
        headers: {
          "Content-Type": "application/json",
          token: `${token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    console.error("Error creating cart:", err);
    throw err;
  }
}
