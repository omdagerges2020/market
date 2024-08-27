import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios"

const data = {
    categoryProducts: [],
    loadingProducts: true,
    errorProducts: null,
}

// Function 
export const getCategoryNameProducts = createAsyncThunk("getcategorynameproducts", async (id, thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try{
        const response = await axios ({
            method: "get",
            url: `https://dummyjson.com/products/category/${id}`
        })
        return response.data

    }catch(er){
        return rejectWithValue(er)
    }
})

// create slice
const categoryNameSlice = createSlice({
    name: "getcategoryNameProducts",
    initialState: data,
    extraReducers: (builder)=>{
        builder.addCase(getCategoryNameProducts.pending, (state, action)=>{
            state.loadingProducts = true;
        })
        builder.addCase(getCategoryNameProducts.fulfilled, (state, action)=>{
            state.loadingProducts = false;
            state.categoryProducts = action.payload.products
            // console.log(action.payload);
        })
        builder.addCase(getCategoryNameProducts.rejected, (state, action)=>{
            state.loadingProducts = false;
            state.errorProducts = action.payload
        })
    }
})

export const categoryNameProducts = categoryNameSlice.reducer;