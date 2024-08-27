import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// initial data
const userData = {
    userInfo: null,
    loadingUser: true,
    errorUser: null
}

// getuser data function
export const getUserData = createAsyncThunk("getuser", async (id, thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try{
        const res = await axios ({
            method: "GET",
            url: `https://dataapi-tygq.onrender.com/api/v1/users/${id}`
        })
        return res.data.data.user
    }catch(er){
       return  rejectWithValue(er)
    }
})

// create slice 
const userSlice = createSlice({
    name: "user",
    initialState: userData,
    extraReducers: (builder)=>{
        builder.addCase(getUserData.pending, (state, action)=>{
            state.loadingUser = true;
        })
        builder.addCase(getUserData.fulfilled, (state,action)=>{
            state.loadingUser = false;
            state.userInfo = action.payload
            // console.log(action.payload);
        })
        builder.addCase(getUserData.rejected, (state,action)=>{
            state.loadingUser = false;
            state.errorUser = action.payload
        })
    }
})

export const  showUser = userSlice.reducer;