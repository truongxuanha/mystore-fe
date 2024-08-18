import { requestJWT } from "../../utils/axiosConfig";
import { ResponseBanner } from "./type";

export async function getBanner() {
  try {
    const res: ResponseBanner = await requestJWT.get("/banner");
    return res;
  } catch (err) {
    console.log(err);
  }
}
