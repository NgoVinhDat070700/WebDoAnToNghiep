import Page from '@/components/Page'
import CategoryTable from '@/sections/admin/categories'
import CategoryForm from '@/sections/admin/categories/CategoryForm'
import { Container, Grid } from '@mui/material'
import { useRef } from 'react'

function Category() {
  const ref = useRef()
  return (
    <Page title='Categories'>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <CategoryTable CategoryRef={ref} />
          </Grid>
          <Grid item xs={12} md={4}>
            <CategoryForm ref={ref} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  )
}

export default Category
