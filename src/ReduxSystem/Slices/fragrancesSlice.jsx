import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

// Data fragrances
const dataFragrances = {
    fragrances: [],
    loadingFragrances: true,
    errorFragrances: null,
}

// Get data Function
export const getFragrancesProducts = createAsyncThunk("getfragrances", async (id, thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try{
        const response = await axios ({
            method: "get",
            url: "https://dummyjson.com/products"
        })
        return response.data
    }catch(er){
        return rejectWithValue(er)
    }
})

// Crete Slice
const fragrancesSlice = createSlice({
    name: "fragrances",
    initialState: dataFragrances,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(getFragrancesProducts.pending, (state, action)=>{
            state.loadingFragrances = true;
        })
        builder.addCase(getFragrancesProducts.fulfilled, (state, action)=>{
            state.loadingFragrances = false;
            state.fragrances = action.payload.products.filter((product)=>{
                return product.category == "fragrances"
            })
        })
        builder.addCase(getFragrancesProducts.rejected, (state, action)=>{
            state.loadingFragrances = false;
            state.errorFragrances = action.payload.message;
        })
    }
})

export const fragrancesProducts = fragrancesSlice.reducer;