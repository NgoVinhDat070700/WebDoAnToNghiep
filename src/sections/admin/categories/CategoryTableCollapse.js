import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Collapse, IconButton, Table, TableBody, TableCell, TableRow, Tooltip } from '@mui/material'
import Iconify from '@/components/Iconify'
import Image from '@/components/Image'

CategoryTableCollapse.propTypes = {
  row: PropTypes.object,
  handleDeleteCategory: PropTypes.func,
  handleEditCategory: PropTypes.func,
}
function CategoryTableCollapse({ row, handleDeleteCategory, handleEditCategory }) {
  const { namecategory = '', image = '' } = row
  const [open, setOpen] = useState(false)
  return (
    <>
      <TableRow>
        <TableCell onClick={handleEditCategory} sx={{cursor:'pointer'}}>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            {open ? (
              <Iconify icon='ant-design:down-circle-outlined' />
            ) : (
              <Iconify icon='ant-design:up-circle-outlined' />
            )}
          </IconButton>
          {namecategory}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Table size='small' aria-label='purchases'>
              <TableBody>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>
                    <Image
                      sx={{
                        height: 80,
                        width: 80,
                        maxHeight: { xs: 233, md: 167 },
                        maxWidth: { xs: 350, md: 250 },
                      }}
                      image={image}
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Action</TableCell>
                  <TableCell>
                    <Tooltip title='Edit' onClick={handleEditCategory}>
                      <IconButton>
                        <Iconify icon={'akar-icons:edit'} />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title='Delete' onClick={handleDeleteCategory}>
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

export default CategoryTableCollapse
