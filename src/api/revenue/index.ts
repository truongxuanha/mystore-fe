import { axiosInstance } from "../../utils/axiosConfig";

async function getRevenue() {
  try {
    const res = await axiosInstance.get(`/revenue`);

    if (!res.data.status) throw new Error(res.data.data);
    return res.data;
  } catch (err) {
    throw err;
  }
}

export { getRevenue };
