import { API_PAYMENT } from "@/routes/api";
import { _postApi } from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const paymentOrder = createAsyncThunk('dataPayment/Orders', async(data)=>{
    const response = await _postApi(API_PAYMENT, data)
    return response.saveOrder
})

const initialState={
    payment: {},
    isLoading: false
}

const paymentSlice = createSlice({
    name:'payment',
    initialState,
    reducers:{},
    extraReducers: (builder) =>{
        builder.addCase(paymentOrder.fulfilled,(state, action)=>{
            state.payment=action.payload
            state.isLoading=false
        })
        .addCase(paymentOrder.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(paymentOrder.rejected,(state)=>{
            state.isLoading = true
        })
    }
})
export default paymentSlice.reducer