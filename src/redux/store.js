// Tham khảo redux-tkq cấu hình tại đây https://redux-toolkit.js.org/rtk-query/overview

import { configureStore } from '@reduxjs/toolkit'
import {
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from 'react-redux'

import { apiSlice } from '@/redux/api/apiSlice'
import authSlice from './api/authSlice'
import cartSlice from './api/cartSlice'
import paymentSlice from './api/paymentSlice'


const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    cart: cartSlice,
    payment: paymentSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(apiSlice.middleware),
})

const { dispatch } = store

const useSelector = useAppSelector

const useDispatch = () => useAppDispatch()

export { store, dispatch, useSelector, useDispatch }
