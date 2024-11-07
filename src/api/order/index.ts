import { InitOrder } from "./../../types/order.type";
import { axiosInstance } from "../../utils/axiosConfig";

async function createNewOrder(initOrder: InitOrder) {
  try {
    const res = await axiosInstance.post(`/bill/create`, initOrder);

    if (!res.data.status) throw new Error(res.data.data);
    return res.data;
  } catch (err) {
    throw err;
  }
}

export { createNewOrder };
