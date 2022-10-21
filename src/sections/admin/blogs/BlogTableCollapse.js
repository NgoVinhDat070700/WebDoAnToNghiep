import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
    Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material'
import Iconify from '@/components/Iconify'
import Image from '@/components/Image'

BlogTableCollapse.propTypes = {
  row: PropTypes.object,
  handleOpenModal: PropTypes.func,
  handleDeleteBlog: PropTypes.func

}
function BlogTableCollapse({ row, handleOpenModal, handleDeleteBlog  }) {
  const { title = '', image = '', video = '', category_id = {}, desc = '' } = row
  const {namecategory = ''} = category_id || {}
  const [open, setOpen] = useState(false)
  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <Iconify icon='ant-design:down-circle-outlined' />
            ) : (
              <Iconify icon='ant-design:up-circle-outlined' />
            )}
          </IconButton>
          {title}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Table size='small' aria-label='purchases'>
              <TableBody>
              <TableRow>
                  <TableCell>Category</TableCell>
                  <TableCell>
                    {namecategory}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>
                    <Image 
                        sx={{
                        height: 80,
                        width: 80,
                        maxHeight: { xs: 233, md: 167 },
                        maxWidth: { xs: 350, md: 250 },
                      }} image={image} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Video</TableCell>
                  <TableCell>
                    <Box component='iframe' src={`https://www.youtube.com/embed/${video}`} sx={{width: 100, height: 100}} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>
                    <Typography noWrap>{desc}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Action</TableCell>
                  <TableCell>
                    <Tooltip title='Edit' onClick={handleOpenModal}>
                      <IconButton>
                        <Iconify icon={'akar-icons:edit'} />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title='Delete' onClick={handleDeleteBlog}>
                      <IconButton>
                        <Iconify icon={'ant-design:delete-filled'} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

export default BlogTableCollapse
