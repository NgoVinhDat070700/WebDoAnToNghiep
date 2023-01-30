import Page from '@/components/Page'
import Search from '@/components/Search'
// import SearchByOption from '@/components/SearchByOption'
import usePagination from '@/hooks/usePagination'
import { getProductList } from '@/redux/api/cartSlice'
import { useDispatch } from 'react-redux'
import { useGetListBlogQuery } from '@/sections/admin/blogs/blogSlice'
// import { useGetListCategoryQuery } from '@/sections/admin/categories/CategorySlice'
import { Pagination } from '@material-ui/lab'
import { Container, Grid, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import BlogPostCard from './BlogPostCard'
import { useDebounce } from '@/hooks/useDebounce'

function Blog() {
  const [filterName, setFilterName] = useState('')
  const title = useDebounce(filterName, 1000)
    
    const { data: dataBlog } = useGetListBlogQuery({title})
    const { allNews = []} = dataBlog || {}

    
    const dispatch = useDispatch()
    // const { data } = useGetListCategoryQuery()
    // const { categories = []} = data || {}
    
    useEffect(()=>{
      dispatch(getProductList())
    },[dispatch])

    let [page, setPage] = useState(1)
  const PER_PAGE = 4

  const count = Math.ceil(allNews.length / PER_PAGE)
  const _DATA = usePagination(allNews, PER_PAGE)

  const handleChange = (e, p) => {
    setPage(p)
    _DATA.jump(p)
  }
  const handleFilterByName = (e) => {
    setFilterName(e.target.value)
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
          <Search placeholder='Search Blog...' filterName={filterName} onFilterName={handleFilterByName}/>
          {/* <SearchByOption options={categories} /> */}
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
