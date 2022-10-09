import { useCallback, useImperativeHandle, useState } from 'react'

import { Button, Typography } from '@mui/material'

import PropTypes from 'prop-types'

import ConfirmDialog from '@/components/ConfirmDialog'
import { toast } from 'react-toastify'
import { useDeleteCategoryMutation } from './CategorySlice'

CategoryConfirmDialog.propTypes = {
  confirmDialogRef: PropTypes.any,
}

function CategoryConfirmDialog({ confirmDialogRef }) {
  
  const [deleteCategory] = useDeleteCategoryMutation()

  const [isOpen, setIsOpen] = useState(false)
  const [chosenCategory, setChosenCategory] = useState({})
  const { namecategory = '', _id: category_id } = chosenCategory || {}

  useImperativeHandle(confirmDialogRef, () => ({
    handleToggleConfirmDialog: (chosenCategory) => {
      setIsOpen(true)
      setChosenCategory(chosenCategory)
    },
  }))

  const onCloseConfirm = useCallback(() => {
    setIsOpen(false)
    setChosenCategory({})
  }, [setChosenCategory, setIsOpen])

  const handleDeleteCategory = async () => {
    try {
      const data = await deleteCategory(category_id).unwrap()
      if (data?.success) {
        toast.success("Delete Success!")
        onCloseConfirm()
        return
      }
      toast.error("Delete Failed!")
    } catch (error) {
        toast.error("Delete Failed!")
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
                
              <strong>Bạn muốn xóa {namecategory} ?</strong>
            </Typography>
          }
          actions={
            <>
              <Button
                variant='outlined'
                color='inherit'
                onClick={onCloseConfirm}
              >
                Cancel
              </Button>
              <Button
                variant='contained'
                color='error'
                onClick={handleDeleteCategory}
              >
                Delete
              </Button>
            </>
          }
        />
      )}
    </>
  )
}

export default CategoryConfirmDialog
