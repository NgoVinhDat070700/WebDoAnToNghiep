import Iconify from '@/components/Iconify'
import Page from '@/components/Page'
import useLocales from '@/hooks/useLocales'
import ProductTable from '@/sections/admin/products/ProductTable'
import { Button, Card, Container, Stack, Typography } from '@mui/material'
import { useCallback, useRef } from 'react'

function Products() {
  const productRef = useRef()
  const { translate } = useLocales()
  const handleAddProduct = useCallback(() => {
    productRef.current.handleAddProduct()
  }, [])
  return (
    <Page title={translate('products')}>
      <Container>
        <Stack direction='row' alignItems='center' justifyContent='space-between' mb={5}>
          <Typography variant='h4' gutterBottom>
            {translate('products')}
          </Typography>

          <Button variant='contained' startIcon={<Iconify icon='eva:plus-fill' />} onClick={handleAddProduct}>
            {translate('page.product.create')}
          </Button>
        </Stack>
        <Card>
          <ProductTable ref={productRef} />
        </Card>
      </Container>
    </Page>
  )
}

export default Products
