import Page from '@/components/Page'
import Search from '@/components/Search'
import SearchByOption from '@/components/SearchByOption'
import { getProductList } from '@/redux/api/cartSlice'
import { useDispatch } from '@/redux/store'
import { useGetListBlogQuery } from '@/sections/admin/blogs/blogSlice'
import { useGetListCategoryQuery } from '@/sections/admin/categories/CategorySlice'
import { Container, Grid, Stack, Typography } from '@mui/material'
import { useEffect } from 'react'
import BlogPostCard from './BlogPostCard'

function Blog() {
    const { data: dataBlog } = useGetListBlogQuery()
    
    const dispatch = useDispatch()
    const { data } = useGetListCategoryQuery()
    const { categories = []} = data || {}
    
    useEffect(()=>{
      dispatch(getProductList())
    },[dispatch])
  return (
    <Page title='Blog'>
      <Container>
        <Stack direction='row' alignItems='center' justifyContent='space-between' mb={5}>
          <Typography variant='h4' gutterBottom sx={{mt: 3}}>
            Blog
          </Typography>
        </Stack>

        <Stack mb={5} direction='row' alignItems='center' justifyContent='space-between'>
          <SearchByOption options={categories} />
          <Search placeholder='Search Blog...' />
        </Stack>

        <Grid container spacing={3}>
            {(dataBlog || []).map((blog, index)=>(
                <BlogPostCard key={blog._id} blog={blog} index={index}/>
            ))}
        </Grid>
      </Container>
    </Page>
  )
}
export default Blog
