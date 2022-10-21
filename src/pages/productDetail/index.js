import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Input,
  Slide,
  Typography,
} from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types'
import Image from '@/components/Image'
import { LoadingButton } from '@mui/lab'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})
ProductDetail.propTypes = {
  viewDetailProduct: PropTypes.bool,
  productDetail: PropTypes.object,
  handleClose: PropTypes.func,
}
function ProductDetail({ viewDetailProduct, productDetail, handleClose }) {
  const { nameproduct = '', category_id = {}, image = '', price = 0, desc = '', status = '' } = productDetail || {}
  const { namecategory = '' } = category_id || {}
  return (
    <Dialog
      open={viewDetailProduct}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby='alert-dialog-slide-description'
    >
      <DialogTitle>{`Chi tiết sản phẩm ${nameproduct}`}</DialogTitle>
      <DialogContent>
        <Grid container spacing={5}>
          <Grid item xs={6}>
            <Image image={image} sx={{ width: 200, height: 200 }} />
          </Grid>

          <Grid item xs={6}>
            <Typography>Tên sản phẩm: {nameproduct}</Typography>
            <Typography>Loại sản phẩm: {namecategory}</Typography>
            <Typography>Trạng thái: {status}</Typography>
            <Typography>Giá: {price}</Typography>
            <Typography>Số lượng:</Typography>
            <Input value='1' />
            <Divider />
            <Typography>Mô tả sản phẩm:</Typography>
            <Typography>{desc}</Typography>
          </Grid>
        </Grid>
        
        <DialogActions>
          <LoadingButton variant='contained'>Thêm vào giỏ hàng</LoadingButton>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}

export default ProductDetail
