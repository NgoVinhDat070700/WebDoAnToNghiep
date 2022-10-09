import Iconify from '@/components/Iconify'
import Image from '@/components/Image'
import Page from '@/components/Page'
import { decrementCartByID, increaseCartByID, removeCartByID } from '@/redux/api/cartSlice'
import { useDispatch, useSelector } from '@/redux/store'
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import PaymentForm from './PaymentForm'

function Cart() {
  const [isOpen, setIsOpen] = useState(false)
  const handleOpenPaymentForm = () => {
    setIsOpen(true)
  }
  const handleCloseFormPayment = () => {
    setIsOpen(false)
  }
  const { cart = [] } = useSelector((state) => state.cart)

  let qty = 0;
  cart.forEach((item) =>{
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
        <Typography>List Cart</Typography>
        <Grid item container sx={{ border: '1px solid #000' }}>
          <Grid xs={8}>
            {(cart || []).map((item) => (
              <Box key={item.id} sx={{ display: 'flex', p: 2 }}>
                <Image image={item.image} sx={{ width: 200, height: 200 }} />
                <Box sx={{ ml: 3 }}>
                  <Typography>{item.nameproduct}</Typography>
                  <Typography>{item.price}</Typography>
                  <Button onClick={() => handleDeleteProductItem(item.id)}>
                    <Iconify icon={'ep:delete-filled'} sx={{ width: 40, height: 40 }} />
                  </Button>
                </Box>
                <Stack flexDirection='row' justifyContent='center' alignItems='center'>
                  <Button onClick={() => handleCreateCartByID(item.id)}>
                    <Iconify icon={'carbon:add-filled'} sx={{ width: 40, height: 40 }} />
                  </Button>
                  <Typography>{item.quatity}</Typography>
                  <Button onClick={() => handleDecrementCartByID(item.id)}>
                    <Iconify icon={'ep:remove-filled'} sx={{ width: 40, height: 40 }} />
                  </Button>
                </Stack>
              </Box>
            ))}
          </Grid>
          <Grid xs={4}>
            <Box border='2px solid #000'>
              <Typography>SubTotal: {money}</Typography>
              <Typography>Free Shipp: Hà Nội</Typography>
            </Box>
            <Button variant='outlined' onClick={handleOpenPaymentForm}>
              Checkout
            </Button>
          </Grid>
        </Grid>
      </Container>
      {isOpen && <PaymentForm isOpen={isOpen} handleCloseFormPayment={handleCloseFormPayment} qty={qty} />}
    </Page>
  )
}

export default Cart
