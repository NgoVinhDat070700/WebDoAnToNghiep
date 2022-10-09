import { API_USER_LOGIN } from "@/routes/api"
import { _postApi } from "@/utils/axios"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


const initialState = {
    user:null,
    isAuthenticated:false,
    isInitialized: false
}
export const authLogin = createAsyncThunk('auth/login', async (formData)=>{
    const response = await _postApi(API_USER_LOGIN,formData)
    return response
})
const authSlice = createSlice({
    name:'auth',
    initialState:initialState,
    reducers:{
        getUser(state,action){
            state.user = action.payload
        },
        resetUser(state){
            state.user=null
            state.isAuthenticated=false
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(authLogin.fulfilled,(state,action)=>{
            state.isAuthenticated = true,
            state.user = action.payload
        })
    }
})
export const {resetUser, getUser } = authSlice.actions
export default authSlice.reducer