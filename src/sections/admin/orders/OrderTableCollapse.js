import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Collapse, IconButton, Table, TableBody, TableCell, TableRow, Tooltip } from '@mui/material'
import Iconify from '@/components/Iconify'

OrderTableCollapse.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number,
  handleDeleteOrder: PropTypes.func,
  handleEditOrder: PropTypes.func
}
function OrderTableCollapse({ row, handleDeleteOrder, handleEditOrder }) {
    const { userId = {}, fullname = '', email = '', address = '', phone = '', status = '' } = row
    const { email: emailAccount = '' } = userId || {}
  const [open, setOpen] = useState(false)
  return (
    <>
      <TableRow>
        <TableCell onClick={handleEditOrder} sx={{cursor:'pointer'}}>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            {open ? (
              <Iconify icon='ant-design:down-circle-outlined' />
            ) : (
              <Iconify icon='ant-design:up-circle-outlined' />
            )}
          </IconButton>
          {emailAccount}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Table size='small' aria-label='purchases'>
              <TableBody>
                <TableRow>
                  <TableCell>Full name</TableCell>
                  <TableCell>{fullname}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell>{email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Address</TableCell>
                  <TableCell>{address}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Phone</TableCell>
                  <TableCell>{phone}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Status</TableCell>
                  <TableCell>{status}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Action</TableCell>
                  <TableCell>
                    <Tooltip title='Edit' onClick={handleEditOrder}>
                      <IconButton>
                        <Iconify icon={'akar-icons:edit'} />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title='Delete' onClick={handleDeleteOrder}>
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

export default OrderTableCollapse
