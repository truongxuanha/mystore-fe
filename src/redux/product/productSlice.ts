import { createSlice } from "@reduxjs/toolkit";
import { ProductsType } from "types";
import {
  createProductThunk,
  deleteProductThunk,
  editProductThunk,
  getCommentByIdProductThunk,
  getHotProducts,
  getInFoProducts,
  getProductNews,
  getProductRandom,
  getProducts,
} from "./productThunk";

export interface ProductStateType {
  products: ProductsType[];
  productNews: ProductsType[];
  productHots: ProductsType[];
  isLoading: boolean;
  totalPage: number;
  infoProduct?: ProductsType;
  productRandom: ProductsType[];
  totalProduct: number;
  dataCommentById: any;
  commentById: any;
  dataAccountCmts: any;
  loadingProductNew: boolean;
  loadingProductHot: boolean;
  loadingBanner: boolean;
  loadingProductDetail: boolean;
  productsAdmin?: {
    total_item: number;
    totalPage: number;
    products: ProductsType[];
  };
}

const setIsLoading = (state: ProductStateType, isLoading: boolean) => {
  state.isLoading = isLoading;
};

const initialState: ProductStateType = {
  isLoading: false,
  loadingBanner: false,
  loadingProductNew: false,
  loadingProductHot: false,
  loadingProductDetail: false,
  products: [],
  productNews: [],
  productHots: [],
  productsAdmin: undefined,
  totalPage: 1,
  totalProduct: 0,

  infoProduct: undefined,
  productRandom: [],
  dataCommentById: [],
  dataAccountCmts: [],
  commentById: {},
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        setIsLoading(state, false);
        state.products = action.payload.data;
        state.totalPage = action.payload.totalPage;
        state.totalProduct = action.payload.totalItem;
      })
      .addCase(getProducts.rejected, (state) => {
        setIsLoading(state, false);
        state.products = [];
        state.totalPage = 1;
      });

    builder
      .addCase(getInFoProducts.pending, (state) => {
        state.loadingProductDetail = true;
      })
      .addCase(getInFoProducts.fulfilled, (state, action) => {
        state.loadingProductDetail = false;
        state.infoProduct = action.payload;
      })
      .addCase(getInFoProducts.rejected, (state) => {
        state.loadingProductDetail = false;
      });

    builder
      .addCase(getProductNews.pending, (state) => {
        state.loadingProductNew = true;
      })
      .addCase(getProductNews.fulfilled, (state, action) => {
        state.loadingProductNew = false;
        state.productNews = action.payload;
      })
      .addCase(getProductNews.rejected, (state) => {
        state.loadingProductNew = false;
        state.productNews = [];
      });
    builder
      .addCase(getHotProducts.pending, (state) => {
        state.loadingProductHot = true;
      })
      .addCase(getHotProducts.fulfilled, (state, action) => {
        state.loadingProductHot = false;
        state.productHots = action.payload;
      })
      .addCase(getHotProducts.rejected, (state) => {
        state.loadingProductHot = false;
        state.productHots = [];
      });

    builder
      .addCase(getProductRandom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductRandom.fulfilled, (state, action) => {
        setIsLoading(state, false);
        state.productRandom = action.payload ?? [];
      })
      .addCase(getProductRandom.rejected, (state) => {
        setIsLoading(state, false);
      });
    builder
      .addCase(createProductThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProductThunk.fulfilled, (state) => {
        setIsLoading(state, false);
      })
      .addCase(createProductThunk.rejected, (state) => {
        setIsLoading(state, false);
      });
    builder
      .addCase(deleteProductThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProductThunk.fulfilled, (state) => {
        setIsLoading(state, false);
      })
      .addCase(deleteProductThunk.rejected, (state) => {
        setIsLoading(state, false);
      });
    builder
      .addCase(editProductThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editProductThunk.fulfilled, (state) => {
        setIsLoading(state, false);
      })
      .addCase(editProductThunk.rejected, (state) => {
        setIsLoading(state, false);
      });
    builder
      .addCase(getCommentByIdProductThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCommentByIdProductThunk.fulfilled, (state, action) => {
        setIsLoading(state, false);
        state.dataCommentById = action.payload.data;
        state.dataAccountCmts = action.payload.dataAccount;
        state.commentById = action.payload;
      })
      .addCase(getCommentByIdProductThunk.rejected, (state) => {
        setIsLoading(state, false);
      });
  },
});

export default productSlice.reducer;
