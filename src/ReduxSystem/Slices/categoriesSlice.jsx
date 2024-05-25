import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios"

const categoriesData = {
    categories: [],
    loadingCategories: true,
    errorCategories: null,
}

// get categories function
export const getCategories = createAsyncThunk("getcategories", async (id, thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try{
        const response = await axios({
            method: "get",
            url: "https://dummyjson.com/products/categories"
        })
        return response.data
    }catch(er){
        return rejectWithValue(er)
    }
})

// create slice
const categoriesSlice = createSlice({
    name: "categories",
    initialState: categoriesData,
    extraReducers: (builder)=>{
        builder.addCase(getCategories.pending, (state, action)=>{
            state.loadingCategories = true;
        })
        builder.addCase(getCategories.fulfilled, (state, action)=>{
            state.loadingCategories = false;
            state.categories = action.payload;
        })
        builder.addCase(getCategories.rejected, (state, action)=>{
            state.loadingCategories = false;
            state.errorCategories = action.payload;
        })
    }
})

export const categoriesNames = categoriesSlice.reducer;