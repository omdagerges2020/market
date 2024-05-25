import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

// home-decoration Data
const homeDecorationData = {
    homeDecoration: [],
    loadingHomeDecoration: true,
    errorHomeDecoration: null,
}

// Get Data groceries products function
export const getHomeDecorationProducts = createAsyncThunk("home-decoration", async (id, thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try {
        const response = await axios ({
            method: "get",
            url: "https://dummyjson.com/products/category/home-decoration"
        })
        return response.data
    }catch(er){
        return rejectWithValue(er)
    }
})

// Cretae Slice
const homeDecorationSlice = createSlice({
    name: "home-decoration",
    initialState: homeDecorationData,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(getHomeDecorationProducts.pending, (state, action)=>{
            state.loadingHomeDecoration = true;
        })
        builder.addCase(getHomeDecorationProducts.fulfilled, (state, action)=>{
            state.loadingHomeDecoration = false;
            state.homeDecoration = action.payload.products;
        })
        builder.addCase(getHomeDecorationProducts.rejected, (state, action)=>{
            state.loadingHomeDecoration = false;
            state.errorHomeDecoration = action.payload.message
        })
    }
})

export const homeDecorationProducts = homeDecorationSlice.reducer;