import Iconify from '@/components/Iconify'
import { IconButton, TableCell, TableRow, Tooltip } from '@mui/material'
import PropTypes from 'prop-types'

OrderTableRows.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number,
  handleDeleteOrder: PropTypes.func,
  handleEditOrder: PropTypes.func
}
function OrderTableRows({ row = {}, index, handleDeleteOrder, handleEditOrder }) {
  
  const { userId = {}, fullname = '', email = '', address = '', phone = '', status = '' } = row
  const { email: emailAccount = '' } = userId || {}
  return (
    <TableRow hover tabIndex={index} key={index}>
      <TableCell>{emailAccount}</TableCell>
      <TableCell>{fullname}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{address}</TableCell>
      <TableCell>{phone}</TableCell>
      <TableCell>{status}</TableCell>
      <TableCell>
        <Tooltip title='Edit' onClick={handleEditOrder} >
          <IconButton>
            <Iconify icon={'akar-icons:edit'} />
          </IconButton>
        </Tooltip>

        <Tooltip title='Delete' onClick={handleDeleteOrder} >
          <IconButton >
            <Iconify icon={'ant-design:delete-filled'} />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  )
}

export default OrderTableRows
