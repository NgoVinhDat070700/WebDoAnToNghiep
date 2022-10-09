import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
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

ProductTableCollapse.propTypes = {
  row: PropTypes.object,
  handleOpenModal: PropTypes.func,
  handleDeleteProduct: PropTypes.func

}
function ProductTableCollapse({ row, handleOpenModal, handleDeleteProduct  }) {
  const { nameproduct = '', price = 0, image = '' } = row
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
          {nameproduct}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Table size='small' aria-label='purchases'>
              <TableBody>
                <TableRow>
                  <TableCell>Price</TableCell>
                  <TableCell>
                    <Typography>{price}</Typography>
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
                  <TableCell>Action</TableCell>
                  <TableCell>
                    <Tooltip title='Edit' onClick={handleOpenModal}>
                      <IconButton>
                        <Iconify icon={'akar-icons:edit'} />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title='Delete' onClick={handleDeleteProduct}>
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

export default ProductTableCollapse
