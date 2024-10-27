import { createSlice } from "@reduxjs/toolkit";

export interface ManufactureType {
  id: number;
  img: string;
  name: string;
  slug: string;
}
export interface InitialStateType {
  manuItems: ManufactureType[];
  loading: boolean;
}
const initialState: InitialStateType = {
  manuItems: [],
  loading: false,
};

const manuSlice = createSlice({
  name: "manufacturer",
  initialState,
  reducers: {},
  extraReducers() {},
});

export default manuSlice.reducer;
