import Page from '@/components/Page'
import Search from '@/components/Search'
import SearchByOption from '@/components/SearchByOption'
import { getProductList } from '@/redux/api/cartSlice'
import { Container, Grid, Stack, Typography } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { Pagination } from '@material-ui/lab'
import ProductCard from './ProductCard'
import usePagination from '@/hooks/usePagination'
import ProductDetail from '@/pages/productDetail'
import { useDispatch, useSelector } from 'react-redux'
import { useGetListCategoryQuery } from '@/sections/admin/categories/CategorySlice'

function Products() {
  const [selectByCategory, setSelectByCategory] = useState('')
  const [viewDetailProduct, setViewDetailProduct] = useState(false)

  const [productDetailData, setProductDetailData] = useState({})

  const { products = [] } = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const { data } = useGetListCategoryQuery()
  const { categories = [] } = data || {}

  useEffect(() => {
    dispatch(selectByCategory ? getProductList(selectByCategory) : getProductList())
  }, [dispatch, selectByCategory])

  let [page, setPage] = useState(1)
  const PER_PAGE = 3

  const count = Math.ceil(products.length / PER_PAGE)
  const _DATA = usePagination(products, PER_PAGE)

  const handleChange = (e, p) => {
    setPage(p)
    _DATA.jump(p)
  }

  const handleViewProductDetail = useCallback(
    (row) => () => {
      setViewDetailProduct(true)
      setProductDetailData(row)
    },
    []
  )

  const handleClose = () => {
    setViewDetailProduct(false)
    setProductDetailData({})
  }
  return (
    <Page title='Products'>
      <Container>
        <Stack direction='row' alignItems='center' justifyContent='space-between' mb={5}>
          <Typography variant='h4' gutterBottom sx={{ mt: 5 }}>
            List Products
          </Typography>
        </Stack>

        <Stack mb={5} direction='row' alignItems='center' justifyContent='space-between'>
          <Search placeholder='Search products...' />
          <SearchByOption options={categories} setSelectByCategory={setSelectByCategory} />
        </Stack>

        <Grid container spacing={3}>
          {_DATA.currentData().map((product, index) => (
            <ProductCard
              key={index}
              product={product}
              selectByCategory={selectByCategory}
              handleViewProductDetail={handleViewProductDetail(product)}
            />
          ))}
        </Grid>
        <Pagination
          count={count}
          page={page}
          onChange={handleChange}
          color='primary'
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 30 }}
        />
      </Container>
      <ProductDetail viewDetailProduct={viewDetailProduct} productDetail={productDetailData} handleClose={handleClose} />
    </Page>
  )
}
export default Products
