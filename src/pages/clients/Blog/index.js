import Page from '@/components/Page'
import Search from '@/components/Search'
import SearchByOption from '@/components/SearchByOption'
import usePagination from '@/hooks/usePagination'
import { getProductList } from '@/redux/api/cartSlice'
import { useDispatch } from '@/redux/store'
import { useGetListBlogQuery } from '@/sections/admin/blogs/blogSlice'
import { useGetListCategoryQuery } from '@/sections/admin/categories/CategorySlice'
import { Pagination } from '@material-ui/lab'
import { Container, Grid, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import BlogPostCard from './BlogPostCard'

function Blog() {
    const { data: dataBlog } = useGetListBlogQuery()
    const { allNews = []} = dataBlog || {}
    const dispatch = useDispatch()
    const { data } = useGetListCategoryQuery()
    const { categories = []} = data || {}
    
    useEffect(()=>{
      dispatch(getProductList())
    },[dispatch])

    let [page, setPage] = useState(1)
  const PER_PAGE = 3

  const count = Math.ceil(allNews.length / PER_PAGE)
  const _DATA = usePagination(allNews, PER_PAGE)

  const handleChange = (e, p) => {
    setPage(p)
    _DATA.jump(p)
  }
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
            {_DATA.currentData().map((blog, index)=>(
                <BlogPostCard key={blog._id} blog={blog} index={index}/>
            ))}
        </Grid>
        <Pagination count={count} page={page} onChange={handleChange} color='primary' style={{display:'flex', justifyContent:'center', alignItems: 'center', marginTop: 30}} />
      </Container>
    </Page>
  )
}
export default Blog
