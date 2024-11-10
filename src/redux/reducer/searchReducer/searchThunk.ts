import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSearchResults } from "../../../api/search";

const fetchSearchResults = createAsyncThunk("search/fetchSearchResults", async (query: string, { rejectWithValue }) => {
  try {
    const res = await getSearchResults(query);
    return res;
  } catch (err) {
    rejectWithValue(err);
  }
});

export { fetchSearchResults };
