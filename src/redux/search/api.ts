import { axiosInstance } from "../../utils/axiosConfig";
import { ResSearchType } from "./type";

export async function getSearchResults(query: string): Promise<any> {
  try {
    const res: ResSearchType = await axiosInstance.get(`product/search`, {
      params: {
        q: query,
        min: 150000,
        max: 80000000,
        sort: "ASC",
        page: 1,
        item: 10,
      },
    });

    if (!res.data.status) {
      throw new Error("No results found for the given query.");
    }

    return res.data.data;
  } catch (err) {
    throw new Error("No results");
  }
}
