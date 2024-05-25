import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Data Showproduct
const singleProductData = {
  productDetails: null,
  itemsNum: 1,
  // cartProducts: [],
  loadingProductDetails: true,
  errorProductDetails: null,
};

// Get productDetails Data Function
export const getProductDetails = createAsyncThunk(
  "productdetails",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios({
        method: "get",
        url: `https://dummyjson.com/products/${id}`,
      });
      return { ...response.data, items: 1};
    } catch (er) {
      return rejectWithValue(er);
    }
  }
);

// Create Slice
const ShowProductSlice = createSlice({
  name: "productDetails",
  initialState: singleProductData,
  reducers: {
    // addToCart: (state, action) => {
    //   state.cartProducts = [...state.cartProducts, action.payload];
    // },
    increment: (state, action) => {
        state.productDetails.items = action.payload.items + 1;
    },
    decrement: (state, action) => {
      if(state.productDetails.items > 1){
        state.productDetails.items = action.payload.items - 1;
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getProductDetails.pending, (state, action) => {
      state.loadingProductDetails = true;
    });
    builder.addCase(getProductDetails.fulfilled, (state, action) => {
      state.loadingProductDetails = false;
      state.productDetails = action.payload;
    });
    builder.addCase(getProductDetails.rejected, (state, action) => {
      state.loadingProductDetails = false;
      state.errorProductDetails = action.payload;
    });
  },
});

export const productDetails = ShowProductSlice.reducer;
export const {decrement, increment, addToCart} = ShowProductSlice.actions;

