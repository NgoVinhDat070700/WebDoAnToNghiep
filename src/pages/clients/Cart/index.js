import Iconify from '@/components/Iconify'
import Image from '@/components/Image'
import Page from '@/components/Page'
import { decrementCartByID, increaseCartByID, removeCartByID } from '@/redux/api/cartSlice'
import { useDispatch, useSelector } from '@/redux/store'
import { Box, Button, Card, Container, Grid, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import PaymentForm from './PaymentForm'

function Cart() {
  const [isOpen, setIsOpen] = useState(false)
  const handleOpenPaymentForm = () => {
    if (Object.keys(cart).length === 0) return
    setIsOpen(true)
  }

  const handleCloseFormPayment = () => {
    setIsOpen(false)
  }

  const { cart = [] } = useSelector((state) => state.cart)

  let qty = 0
  cart.forEach((item) => {
    qty += item.quatity
  })
  const dispatch = useDispatch()

  const money = cart.reduce(function (total, currentValue) {
    return total + currentValue.price * currentValue.quatity
  }, 0)

  const handleDecrementCartByID = (id) => {
    dispatch(decrementCartByID(id))
  }

  const handleCreateCartByID = (id) => {
    dispatch(increaseCartByID(id))
  }

  const handleDeleteProductItem = (id) => {
    dispatch(removeCartByID(id))
  }
  return (
    <Page title='Cart'>
      <Container>
        <Typography variant='h3' textAlign='center' sx={{ my: 5 }}>
          Cart
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            {Object.keys(cart).length !== 0 ? (
              (cart || []).map((item) => (
                <Card key={item.id} sx={{ display: 'flex', p: 2 , mt: 2}}>
                  <Image image={item.image} sx={{ width: 200, height: 200 }} />
                  <Box sx={{ ml: 3 }}>
                    <Typography variant='subtitle1' sx={{ fontSize: 18, fontWeight: 'bold' }}>
                      {item.nameproduct}
                    </Typography>
                    <Typography variant='subtitle1' sx={{ fontSize: 18, fontWeight: 'bold' }}>
                      {item.price} VND
                    </Typography>
                    <Stack flexDirection='row' justifyContent='space-between' alignItems='center'>
                      <Button onClick={() => handleCreateCartByID(item.id)}>
                        <Iconify icon={'carbon:add-filled'} sx={{ width: 32, height: 32 }} />
                      </Button>
                      <Typography>{item.quatity}</Typography>
                      <Button onClick={() => handleDecrementCartByID(item.id)}>
                        <Iconify icon={'ep:remove-filled'} sx={{ width: 32, height: 32 }} />
                      </Button>
                    </Stack>
                    <Button onClick={() => handleDeleteProductItem(item.id)}>
                      <Iconify icon={'ep:delete-filled'} sx={{ width: 32, height: 32 }} />
                    </Button>
                  </Box>
                </Card>
              ))
            ) : (
              <Typography variant='h4' textAlign='center'>
                Giỏ hàng rỗng!
              </Typography>
            )}
          </Grid>
          <Grid item xs={4}>
            <Card sx={{mt: 2}}>
              <Box >
                <Typography>SubTotal: {money}</Typography>
                <Typography>Free Shipp: Hà Nội</Typography>
              </Box>

              <Button variant='outlined' onClick={handleOpenPaymentForm}>
                Checkout
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Container>
      {isOpen && <PaymentForm isOpen={isOpen} handleCloseFormPayment={handleCloseFormPayment} qty={qty} />}
    </Page>
  )
}

export default Cart
