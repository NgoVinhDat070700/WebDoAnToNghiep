import Iconify from '@/components/Iconify'
import Page from '@/components/Page'
import { Button, Card, Container, Stack, Typography } from '@mui/material'
import { useCallback, useRef } from 'react'
import BlogTable from '@/sections/admin/blogs'
function BlogsAdmin() {
  const blogsRef = useRef()
  
  const handleAddBlog = useCallback(()=>{
    blogsRef.current.handleAddBlog()
  },[])
  return (
    <Page title='Blogs'>
      <Container>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          mb={5}
        >
          <Typography variant='h4' gutterBottom>
            List Blogs
          </Typography>

          <Button
            variant='contained'
            startIcon={<Iconify icon='eva:plus-fill' />}
            onClick={handleAddBlog}
          >
            New Blogs
          </Button>
          
        </Stack>
        <Card>
            <BlogTable ref={blogsRef} />
        </Card>
      </Container>
    </Page>
  )
}

export default BlogsAdmin
