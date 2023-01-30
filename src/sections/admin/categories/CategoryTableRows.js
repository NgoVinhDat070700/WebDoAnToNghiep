import Iconify from '@/components/Iconify'
import Image from '@/components/Image'
import { IconButton, TableCell, TableRow, Tooltip } from '@mui/material'
import PropTypes from 'prop-types'

CategoryTableRows.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number,
  handleDeleteCategory: PropTypes.func,
  handleEditCategory: PropTypes.func
}
function CategoryTableRows({ row = {}, index, handleDeleteCategory, handleEditCategory }) {
  
  const { namecategory = '', image = '' } = row

  return (
    <TableRow hover tabIndex={index} key={index}>
      <TableCell>{namecategory}</TableCell>
      <TableCell>
        <Image image={image} sx={{width:'100px', height:'100px'}} />
      </TableCell>
      
      <TableCell>
        <Tooltip title='Sửa' onClick={handleEditCategory} >
          <IconButton>
            <Iconify icon={'akar-icons:edit'} />
          </IconButton>
        </Tooltip>

        <Tooltip title='Xóa' onClick={handleDeleteCategory} >
          <IconButton >
            <Iconify icon={'ant-design:delete-filled'} />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  )
}

export default CategoryTableRows
