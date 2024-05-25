import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

// groceries Data
const groceriesData = {
    groceries: [],
    loadingGroceries: true,
    errorGroceries: null,
}

// Get Data groceries products function
export const getGroceriesProducts = createAsyncThunk("groceries", async (id, thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try {
        const response = await axios ({
            method: "get",
            url: "https://dummyjson.com/products"
        })
        return response.data
    }catch(er){
        return rejectWithValue(er)
    }
})

// Cretae Slice
const groceriesSlice = createSlice({
    name: "groceries",
    initialState: groceriesData,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(getGroceriesProducts.pending, (state, action)=>{
            state.loadingGroceries = true;
        })
        builder.addCase(getGroceriesProducts.fulfilled, (state, action)=>{
            state.loadingGroceries = false;
            state.groceries = action.payload.products.filter((product)=>{
                return product.category == "groceries"
            })
        })
        builder.addCase(getGroceriesProducts.rejected, (state, action)=>{
            state.loadingGroceries = false;
            state.errorGroceries = action.payload.message
        })
    }
})

export const groceriesProducts = groceriesSlice.reducer;