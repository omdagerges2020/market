import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

// data
const datalaptops = {
    laptops: [],
    loadingLaptops: true,
    errorLaptops: null,
}

// Get laptopsProducts data Function
export const getLaptopsProducts = createAsyncThunk("getlaptopsproducts", async (id, thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try{
        const response = await axios({
            method: "get",
            url: "https://dummyjson.com/products/category/laptops"
        })
        return response.data
    }catch(er){
        return rejectWithValue(er)
    }
})


// Create slice
const laptopsSlice = createSlice({
    name: "laptops",
    initialState: datalaptops,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(getLaptopsProducts.pending, (state, action)=>{
            state.loadingLaptops = true;
        })
        builder.addCase(getLaptopsProducts.fulfilled, (state, action)=>{
            state.loadingLaptops = false;
            state.laptops = action.payload.products
        })
        builder.addCase(getLaptopsProducts.rejected, (state, action)=>{
            state.loadingLaptops = false;
            state.errorLaptops = action.payload.message;
        })
    }
})

export const laptopsProducts = laptopsSlice.reducer;