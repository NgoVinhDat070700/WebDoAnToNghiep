import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Slide,
  Stack,
  Typography,
} from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types'
import RHFFormProvider from '@/components/hook-form/RHFFormProvider'
import RHFTextField from '@/components/hook-form/RHFTextField'
import { useForm } from 'react-hook-form'
import { LoadingButton } from '@mui/lab'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { paymentOrder } from '@/redux/api/paymentSlice'
import { resetCart } from '@/redux/api/cartSlice'
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

PaymentForm.propTypes = {
  isOpen: PropTypes.bool,
  qty: PropTypes.number,
  handleCloseFormPayment: PropTypes.func,
}
function PaymentForm({ isOpen, handleCloseFormPayment, qty }) {
  const defaultValues = {
    fullname:"",
    email:"",
    address:"",
    phone:""
  }

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const PaymentSchema = Yup.object().shape({
    fullname: Yup.string().required('*Fullname is required'),
    email: Yup.string().email('*Email must be a valid email address').required('Email is required'),
    address: Yup.string().required('*Address is required'),
    phone: Yup.string()
    .required("*Phone is required")
    .matches(phoneRegExp, '*Phone number is not valid')
    .min(9)
    .max(10),
  });
  const { user } = useSelector((state)=>state.auth)
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const methods = useForm({ resolver: yupResolver(PaymentSchema),defaultValues })
  const { handleSubmit } = methods

  const onSubmit = async (data) =>{
    
    if(!user){
      toast.error("Bạn cần đăng nhập để thanh toán")
      navigate('/login')
    }
    else{
      const {_id = ''} = user || { }
      const products = JSON.parse(localStorage.getItem("cartItems"))
      const paymentData = {
        userId:_id,
        products,
        amount: qty,
        ...data
      }

      const result = await dispatch(paymentOrder(paymentData))
      if (paymentOrder.fulfilled.match(result)) {
        toast.success("Đặt hàng thành công!")
        dispatch(resetCart())
        localStorage.removeItem("cartItems")
        handleCloseFormPayment()
      }
      else{
        toast.error("Đặt hàng thất bại")
      }
    }
  }
  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCloseFormPayment}
      aria-describedby='alert-dialog-slide-description'
    >
      <DialogTitle>{'Payment Form'}</DialogTitle>
      <DialogContent sx={{width:500}}>
        <RHFFormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} px={3} py={3}>
            <Grid item xs={12} md={12}>
              <Stack spacing={1}>
                <Typography sx={{ fontWeight: 'bold' }}>Full Name</Typography>
                <RHFTextField name='fullname' label="Full Name" />
              </Stack>

              <Stack spacing={1}>
                <Typography sx={{ fontWeight: 'bold' }}>Email</Typography>
                <RHFTextField type="email" name='email' label="Email"  />
              </Stack>

              <Stack spacing={1}>
                <Typography sx={{ fontWeight: 'bold' }}>Address</Typography>
                <RHFTextField name='address' label="Address" />
              </Stack>
              <Stack spacing={1}>
                <Typography sx={{ fontWeight: 'bold' }}>Phone</Typography>
                <RHFTextField name='phone' label="Phone" />
              </Stack>
            </Grid>
          </Grid>

          <Grid item xs={12} mt={3}>
            <DialogActions>
              <LoadingButton type='submit' variant='contained'>
                Payment
              </LoadingButton>

              <Button variant='outlined' color='inherit' onClick={handleCloseFormPayment}>
                Cancel
              </Button>
            </DialogActions>
          </Grid>
        </RHFFormProvider>
      </DialogContent>
    </Dialog>
  )
}

export default PaymentForm
