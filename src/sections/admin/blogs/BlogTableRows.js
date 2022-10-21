import Iconify from '@/components/Iconify'
import Image from '@/components/Image'
import { Box, IconButton, TableCell, TableRow, Tooltip, Typography } from '@mui/material'
import PropTypes from 'prop-types'

BlogTableRows.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number,
  handleOpenModal: PropTypes.func,
  handleDeleteBlog: PropTypes.func
}
function BlogTableRows({ row = {}, index, handleOpenModal, handleDeleteBlog }) {
  
  const { title = '', image = '', video = '', category_id = {}, desc = '' } = row
  const { namecategory = ''} = category_id || {}

  return (
    <TableRow hover tabIndex={index} key={index}>
      <TableCell>{title}</TableCell>
      <TableCell>{namecategory}</TableCell>
      <TableCell><Typography noWrap>{desc}</Typography></TableCell>
      <TableCell>
        <Image image={image} sx={{width:'100px', height:'100px'}} />
      </TableCell>
      <TableCell>
        <Box component='iframe' src={`https://www.youtube.com/embed/${video}`} sx={{width: 100, height: 100}} />
      </TableCell>
      
      <TableCell>
        <Tooltip title='Edit' onClick={handleOpenModal}>
          <IconButton>
            <Iconify icon={'akar-icons:edit'} />
          </IconButton>
        </Tooltip>

        <Tooltip title='Delete' onClick={handleDeleteBlog}>
          <IconButton >
            <Iconify icon={'ant-design:delete-filled'} />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  )
}

export default BlogTableRows
