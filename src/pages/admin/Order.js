import Page from '@/components/Page'
import useLocales from '@/hooks/useLocales'
import OrderTable from '@/sections/admin/orders'
import OrderForm from '@/sections/admin/orders/OrderForm'
import { Container, Grid } from '@mui/material'
import { useRef } from 'react'

function Order() {
  const ref = useRef()
  const { translate } = useLocales()
  return (
    <Page title={translate('order')}>
      <Container>
        <Grid item xs={4} md={4}>
          <OrderForm ref={ref} />
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <OrderTable OrderRef={ref} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  )
}

export default Order
