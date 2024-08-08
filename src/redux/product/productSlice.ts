// import { createSlice } from "@reduxjs/toolkit";
// import { getInFoProduct } from "../../services/InfoProduct";

// const initialState = {
//   isLoading: false,
//   currentProduct: {},
//   error: "",
// };

// const productSlice = createSlice({
//   name: "product",
//   initialState,
//   reducers: {},
// });

// export default productSlice.reducer;

// export async function getInFoProduct(slug: string) {
//   try {
//     const res = await fetch(
//       `https://mystore-api-v1.onrender.com/v1/product/${slug}`
//     );
//     const data = await res.json();
//     console.log(data);
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// }
