import Iconify from '@/components/Iconify'
import Image from '@/components/Image'
import { fCurrency } from '@/utils/formatNumber'
import { IconButton, TableCell, TableRow, Tooltip } from '@mui/material'
import PropTypes from 'prop-types'

ProductTableRows.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number,
  handleOpenModal: PropTypes.func,
  handleDeleteProduct: PropTypes.func
}
function ProductTableRows({ row = {}, index, handleOpenModal, handleDeleteProduct }) {
  
  const { nameproduct = '', price = 0, image = '', category_id = {} } = row
  const { namecategory = ''} = category_id || {}

  return (
    <TableRow hover tabIndex={index} key={index}>
      <TableCell>{nameproduct}</TableCell>
      <TableCell>{namecategory}</TableCell>
      <TableCell>{fCurrency(price)}</TableCell>
      <TableCell>
        <Image image={image} sx={{width:'100px', height:'100px'}} />
      </TableCell>
      
      <TableCell>
        <Tooltip title='Sửa' onClick={handleOpenModal}>
          <IconButton>
            <Iconify icon={'akar-icons:edit'} />
          </IconButton>
        </Tooltip>

        <Tooltip title='Xóa' onClick={handleDeleteProduct}>
          <IconButton >
            <Iconify icon={'ant-design:delete-filled'} />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  )
}

export default ProductTableRows
