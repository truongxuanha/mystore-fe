import { axiosIntance } from "../utils/axiosConfig";

export async function getResultSearch(query: string) {
  try {
    const res = await axiosIntance.get(`product/search`, {
      params: {
        q: query,
        min: 150000,
        max: 80000000,
        sort: "ASC",
        page: 1,
        item: 10,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
}
// https://mystore-api-v1.onrender.com/v1/product/search?q=as&min=150000&max=80000000&page=1&item=10
