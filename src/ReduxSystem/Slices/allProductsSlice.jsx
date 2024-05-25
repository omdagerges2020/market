import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Variable contain Data
const data = {
  allProducts: [],
  cartProducts: [],
  loadingProducts: true,
  errorPage: null,
};

// Get AllProducts Function
export const getAllProducts = createAsyncThunk(
  "getallproducts",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios({
        method: "get",
        url: "https://dummyjson.com/products",
      });
      return data.data;
    } catch (er) {
      return rejectWithValue(er);
    }
  }
);

// CreateSlice
const allProductsSlice = createSlice({
  name: "allproducts",
  initialState: data,
  reducers: {},
  extraReducers: (builder) => {
    // getAllProducts
    builder.addCase(getAllProducts.pending, (state, action) => {
      state.loadingProducts = true;
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.loadingProducts = false;
      state.allProducts = action.payload.products;
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.loadingProducts = false;
      state.errorPage = action.payload.message;
    });
  },
});

export const products = allProductsSlice.reducer;

