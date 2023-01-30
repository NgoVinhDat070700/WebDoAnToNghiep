import Iconify from '@/components/Iconify'
import Label from '@/components/Label'
import { fCurrency } from '@/utils/formatNumber'
import { IconButton, TableCell, TableRow, Tooltip } from '@mui/material'
import PropTypes from 'prop-types'

OrderTableRows.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number,
  handleDeleteOrder: PropTypes.func,
  handleEditOrder: PropTypes.func
}
function OrderTableRows({ row = {}, index, handleDeleteOrder, handleEditOrder }) {
  
  const { userId = {}, fullname = '', address = '', phone = '', paymentMethods = '', orderStatus = {}, totalPrice=0  } = row
  const { email: emailAccount = '' } = userId || {}

  const checkStatusChangeColor = () => {
    if(orderStatus.name === "Đơn đang được xử lý"){
      return 'info'
    }
    else if(orderStatus.name === "Đang hủy đơn")
    {
      return 'warning'
    }
    else if(orderStatus.name === "Đã đóng gói")
    {
      return 'default'
    }
    else if(orderStatus.name === "Đang giao hàng")
    {
      return 'warning'
    }
    else if(orderStatus.name === "Đã giao hàng")
    {
      return 'success'
    }
    else (orderStatus.name === "Đã hủy")
    {
      return 'Đã hủy'
    }
    
  }
  return (
    <TableRow hover tabIndex={index} key={index}>
      <TableCell>{emailAccount}</TableCell>
      <TableCell>{fullname}</TableCell>
      <TableCell>{address}</TableCell>
      <TableCell>{phone}</TableCell>
      <TableCell><Label color={paymentMethods === 'Card' ? 'success': 'warning'} variant='filled'>{paymentMethods === 'Card'? 'Đã thanh toán trực tuyến' : paymentMethods}</Label></TableCell>
      <TableCell>{fCurrency(totalPrice)} VNĐ</TableCell>
      <TableCell><Label color={checkStatusChangeColor()} variant='filled'>{orderStatus.name}</Label></TableCell>
      <TableCell>
        <Tooltip title='Sửa' onClick={handleEditOrder} >
          <IconButton>
            <Iconify icon={'akar-icons:edit'} />
          </IconButton>
        </Tooltip>

        <Tooltip title='Xóa' onClick={handleDeleteOrder} >
          <IconButton >
            <Iconify icon={'ant-design:delete-filled'} />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  )
}

export default OrderTableRows
