import { API_LIST_PRODUCT, API_LIST_PRODUCT_BY_CATE } from '@/routes/api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { _getApi } from '@/utils/axios'
export const getProductList = createAsyncThunk('fetchData/Products', async (idCategory) => {
  const response = await _getApi(idCategory ? `${API_LIST_PRODUCT_BY_CATE}${idCategory}` : API_LIST_PRODUCT)
  return response.allProduct
})

export const getProductListBySearch = createAsyncThunk('fetchData/ProductBySearch', async (inputSearch) => {
  const response = await axios.get(`http://192.168.1.219:5000/api/products/search?nameproduct=${inputSearch}`)
  return response.allProduct
})
const initialState = {
  products: [],
  productDetail: {},
  categories: [],
  cart: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
  isLoading: false,
}
const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    getProductDetail: (state, action) => {
      state.productDetail = action.payload
    },
    resetCart: (state) => {
      state.cart = []
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
    },
    addCart: (state, action) => {
      const cart = state.cart
      const index = cart.findIndex(({ id }) => action.payload.id === id)
      if (index < 0) {
        cart.push(action.payload)
      } else {
        cart[index].quatity = cart[index].quatity + action.payload.quatity
      }
      state.cart = cart
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
    },
    removeCartByID: (state, action) => {
      const cart = state.cart
      state.cart = cart.filter((item) => item.id !== action.payload)
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
    },
    favoritesProductByID: (state, action) => {
      const products = state.products
      const index = products.findIndex(({ id }) => action.payload === id)
      if (index >= 0) {
        products[index].favorites = true
      }
      state.products = products
    },
    removeFavoriteProductByID: (state, action) => {
      const products = state.products
      const index = products.findIndex(({ id }) => action.payload === id)
      if (index >= 0) {
        products[index].favorites = false
      }
      state.products = products
    },
    increaseCartByID: (state, action) => {
      const cart = state.cart
      const index = cart.findIndex(({ id }) => action.payload === id)
      if (index >= 0) {
        cart[index].quatity = cart[index].quatity + 1
      }
      state.cart = cart
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
    },
    decrementCartByID: (state, action) => {
      const cart = state.cart
      const index = cart.findIndex(({ id }) => action.payload === id)
      if (index >= 0) {
        cart[index].quatity = cart[index].quatity - 1
      }
      if (cart[index].quatity === 0) {
        cart.splice(index, 1)
      }
      state.cart = cart
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductList.fulfilled, (state, action) => {
        state.products = action.payload
        state.isLoading = false
      })
      .addCase(getProductList.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProductList.rejected, (state) => {
        state.isLoading = true
      })
      .addCase(getProductListBySearch.fulfilled, (state, action) => {
        state.products = action.payload
        state.isLoading = false
      })
      .addCase(getProductListBySearch.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProductListBySearch.rejected, (state) => {
        state.isLoading = true
      })
  },
})

export const {
  getProductDetail,
  addCart,
  resetCart,
  removeCartByID,
  favoritesProductByID,
  increaseCartByID,
  decrementCartByID,
} = cartSlice.actions
export default cartSlice.reducer
