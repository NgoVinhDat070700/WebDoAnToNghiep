import { useCallback, useImperativeHandle, useState } from 'react'

import { Button, Typography } from '@mui/material'

import PropTypes from 'prop-types'

import ConfirmDialog from '@/components/ConfirmDialog'
import { useDeleteProductMutation } from '@/redux/api/apiSlice'
import { toast } from 'react-toastify'

ProductConfirmDialog.propTypes = {
  confirmDialogRef: PropTypes.any,
}

function ProductConfirmDialog({ confirmDialogRef }) {
  
  const [deleteProduct] = useDeleteProductMutation()

  const [isOpen, setIsOpen] = useState(false)
  const [chosenProduct, setChosenProduct] = useState({})
  const { nameproduct: productName = '', _id: ProductId } = chosenProduct || {}

  useImperativeHandle(confirmDialogRef, () => ({
    handleToggleConfirmDialog: (chosenProduct) => {
      setIsOpen(true)
      setChosenProduct(chosenProduct)
    },
  }))

  const onCloseConfirm = useCallback(() => {
    setIsOpen(false)
    setChosenProduct({})
  }, [setChosenProduct, setIsOpen])

  const handleDeleteProduct = async () => {
    try {
      const data = await deleteProduct(ProductId).unwrap()
      if (data?.success) {
        toast.success("Xóa thành công!")
        onCloseConfirm()
        return
      }
      toast.error("Xóa thất bại!")
    } catch (error) {
        toast.error("Xóa thất bại!")
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
                
              <strong>Bạn muốn xóa {productName} ?</strong>
            </Typography>
          }
          actions={
            <>
              <Button
                variant='outlined'
                color='inherit'
                onClick={onCloseConfirm}
              >
                Thoát
              </Button>
              <Button
                variant='contained'
                color='error'
                onClick={handleDeleteProduct}
              >
                Xóa
              </Button>
            </>
          }
        />
      )}
    </>
  )
}

export default ProductConfirmDialog
