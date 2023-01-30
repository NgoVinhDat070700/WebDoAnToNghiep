import { API_USER_LOGIN, API_USER_REGISTER } from '@/routes/api'
import { _postApi } from '@/utils/axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  isAuthenticated: false,
  isInitialized: false,
  authtoken: null,
  refreshToken: null,
  emailVerifiedValue: '',
}
export const authLogin = createAsyncThunk('auth/login', async (formData) => {
  const response = await _postApi(API_USER_LOGIN, formData)
  return response
})

export const authRegister = createAsyncThunk('auth/register', async (formData) => {
  const response = await _postApi(API_USER_REGISTER, formData)
  return response.saveUser
})
const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    getUser(state, action) {
      state.user = action.payload
    },
    resetUser(state) {
      state.user = null
      state.isAuthenticated = false
    },
    setRefreshToken(state, action) {
      state.refreshToken = action.payload
    },
    setAuthtokenCredential(state, action) {
      state.authtoken = action.payload
    },
    setEmailVerifiedValue(state, action) {
      state.emailVerifiedValue = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authLogin.fulfilled, (state, action) => {
        ;(state.isAuthenticated = true), (state.user = action.payload)
      })
      .addCase(authRegister.fulfilled, (state, action) => {
        ;(state.isAuthenticated = true), (state.user = action.payload)
      })
  },
})
export const { resetUser, getUser, setAuthtokenCredential, setEmailVerifiedValue, setRefreshToken } = authSlice.actions
export default authSlice.reducer
