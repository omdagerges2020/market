import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

// Data
const searchData = {
    searchResult: [],
    loadingSearch: true,
    errorSearch: null
}

// get search data function
export const getSearchData = createAsyncThunk("getsearchdata", async (id, thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try{
        const response = await axios ({
            method: "get",
            url: `https://dummyjson.com/products/search?q=${id}`
        })
        return response.data
    }catch(er){
        return rejectWithValue(er)
    }
})

// create slice
const searchSlice = createSlice({
    name: "searchdata",
    initialState: searchData,
    extraReducers: (builder)=>{
        builder.addCase(getSearchData.pending, (state, action)=>{
            state.loadingSearch = true;
        })
        builder.addCase(getSearchData.fulfilled, (state, action)=>{
            state.loadingSearch = false;
            state.searchResult = action.payload.products;
        })
        builder.addCase(getSearchData.rejected, (state, action)=>{
            state.loadingSearch = false;
            state.errorSearch = action.payload;
        })
    }
})

export const searchProducts = searchSlice.reducer;