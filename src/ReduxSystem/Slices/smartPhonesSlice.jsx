import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// data
const data = {
    phonesProducts: [],
    loadingSmartPhones: true,
    errorSmartphones: null,
}

// Get SmartPhones Products function
export const getSmartPhones = createAsyncThunk("getsmartphones", async (id, thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try {
        const data = await axios ({
            method: "get",
            url: "https://dummyjson.com/products/category/smartphones"
        })
        return data.data
    } catch (er) {
        return rejectWithValue(er);
    }
})


// Create slice
const smartPhonesSlice = createSlice({
    name: "smartphones",
    initialState: data,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(getSmartPhones.pending, (state, action)=>{
            state.loadingSmartPhones = true;
        })
        builder.addCase(getSmartPhones.fulfilled, (state, action)=>{
            state.loadingSmartPhones = false;
            state.phonesProducts = action.payload.products
            // console.log(action.payload.products);
        })
        builder.addCase(getSmartPhones.rejected, (state, action)=>{
            state.loadingSmartPhones = false;
            state.errorSmartphones = action.payload.message;
        })
    }
})


export const smartPhonesProducts = smartPhonesSlice.reducer;