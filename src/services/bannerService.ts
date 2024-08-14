import { requestJWT } from "../utils/axiosConfig";

export async function getBanner() {
  try {
    const res = await requestJWT.get("/banner");
    return res;
  } catch (err) {
    console.log(err);
  }
}
