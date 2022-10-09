import Page from '@/components/Page'
import Search from '@/components/Search'
import SearchByOption from '@/components/SearchByOption'
import { getProductList } from '@/redux/api/cartSlice'
import { useDispatch, useSelector } from '@/redux/store'
import { useGetListCategoryQuery } from '@/sections/admin/categories/CategorySlice'
import { Container, Grid, Stack, Typography } from '@mui/material'
import { useEffect } from 'react'
import ProductCard from './ProductCard'

function Products() {
    const { products = [] } = useSelector((state)=>state.cart)
    const dispatch = useDispatch()
    const { data } = useGetListCategoryQuery()
    const { categories = []} = data || {}
    
    useEffect(()=>{
      dispatch(getProductList())
    },[dispatch])
  return (
    <Page title='Products'>
      <Container>
        <Stack direction='row' alignItems='center' justifyContent='space-between' mb={5}>
          <Typography variant='h4' gutterBottom>
            List Products
          </Typography>
        </Stack>

        <Stack mb={5} direction='row' alignItems='center' justifyContent='space-between'>
          <SearchByOption options={categories} />
          <Search placeholder='Search products...' />
        </Stack>

        <Grid container spacing={3}>
          {products.map((product, index) => (
            <ProductCard key={product._id} product={product} index={index} />
          ))}
        </Grid>
      </Container>
    </Page>
  )
}
export default Products
