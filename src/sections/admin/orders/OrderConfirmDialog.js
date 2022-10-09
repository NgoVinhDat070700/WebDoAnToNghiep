import { useCallback, useImperativeHandle, useState } from 'react'

import { Button, Typography } from '@mui/material'

import PropTypes from 'prop-types'

import ConfirmDialog from '@/components/ConfirmDialog'
import { toast } from 'react-toastify'
import { useDeleteOrderMutation } from './orderSlice'

OrderConfirmDialog.propTypes = {
  confirmDialogRef: PropTypes.any,
}

function OrderConfirmDialog({ confirmDialogRef }) {
  const [deleteOrder] = useDeleteOrderMutation()

  const [isOpen, setIsOpen] = useState(false)
  const [chosenOrder, setChosenOrder] = useState({})
  const { fullname = '', _id: order_id } = chosenOrder || {}

  useImperativeHandle(confirmDialogRef, () => ({
    handleToggleConfirmDialog: (chosenOrder) => {
      setIsOpen(true)
      setChosenOrder(chosenOrder)
    },
  }))

  const onCloseConfirm = useCallback(() => {
    setIsOpen(false)
    setChosenOrder({})
  }, [setChosenOrder, setIsOpen])

  const handleDeleteOrder = async () => {
    try {
      await deleteOrder(order_id).unwrap()
      toast.success('Delete Success!')
      onCloseConfirm()
    } catch (error) {
      toast.error('Delete Failed!')
    }
  }

  return (
    <>
      {isOpen && (
        <ConfirmDialog
          open
          onClose={onCloseConfirm}
          title={
            <Typography>
              <strong>Bạn muốn xóa order của {fullname} ?</strong>
            </Typography>
          }
          actions={
            <>
              <Button variant='outlined' color='inherit' onClick={onCloseConfirm}>
                Cancel
              </Button>
              <Button variant='contained' color='error' onClick={handleDeleteOrder}>
                Delete
              </Button>
            </>
          }
        />
      )}
    </>
  )
}

export default OrderConfirmDialog
