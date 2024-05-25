import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

// Data
const skincareData = {
    skincare: [],
    loadingSkincare: true,
    errorSkincare: null,
}

// Get skincare products function
export const getSkincareProducts = createAsyncThunk("getskincare", async (id, thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try{
        const response = await axios ({
            method: "get",
            url: "https://dummyjson.com/products/category/skin-care"
        })
        return response.data
    }catch(er){
        return rejectWithValue(er)
    }
})

// Creare Slice
const skincareSlice = createSlice({
    name: "skincare",
    initialState: skincareData,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(getSkincareProducts.pending, (state, action)=>{
            state.loadingSkincare = true;
        })
        builder.addCase(getSkincareProducts.fulfilled, (state , action)=>{
            state.loadingSkincare = false;
            state.skincare = action.payload.products
        })
        builder.addCase(getSkincareProducts.rejected, (state, action)=>{
            state.loadingSkincare = false;
            state.errorSkincare = action.payload.message;
        })
    }
})

export const skincareProducts = skincareSlice.reducer;