import Iconify from '@/components/Iconify'
import Page from '@/components/Page'
import ProductTable from '@/sections/admin/products/ProductTable'
import { Button, Card, Container, Stack, Typography } from '@mui/material'
import { useCallback, useRef } from 'react'

function Dashboard() {
  const productRef = useRef()
  
  const handleAddProduct = useCallback(()=>{
    productRef.current.handleAddProduct()
  },[])
  return (
    <Page title='Dashboard'>
      <Container>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          mb={5}
        >
          <Typography variant='h4' gutterBottom>
            List Products
          </Typography>

          <Button
            variant='contained'
            startIcon={<Iconify icon='eva:plus-fill' />}
            onClick={handleAddProduct}
          >
            New Product
          </Button>
          
        </Stack>
        <Card>
            <ProductTable ref={productRef} />
        </Card>
      </Container>
    </Page>
  )
}

export default Dashboard
