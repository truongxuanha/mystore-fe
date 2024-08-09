import { axiosIntance } from "../utils/axiosConfig";

export async function getBanner() {
  try {
    const res = await axiosIntance.get("/banner");
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
  }
}
