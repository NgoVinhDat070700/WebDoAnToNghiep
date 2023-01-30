import { useCallback, useImperativeHandle, useState } from 'react'

import { Button, Typography } from '@mui/material'

import PropTypes from 'prop-types'

import ConfirmDialog from '@/components/ConfirmDialog'
import { toast } from 'react-toastify'
import { useDeleteUserMutation } from './UserSlice'

UserConfirmDialog.propTypes = {
  confirmDialogRef: PropTypes.any,
}

function UserConfirmDialog({ confirmDialogRef }) {
  
  const [deleteUser] = useDeleteUserMutation()

  const [isOpen, setIsOpen] = useState(false)
  const [chosenUser, setChosenUser] = useState({})
  const { username = '', _id: user_id } = chosenUser || {}

  useImperativeHandle(confirmDialogRef, () => ({
    handleToggleConfirmDialog: (chosenUser) => {
      setIsOpen(true)
      setChosenUser(chosenUser)
    },
  }))

  const onCloseConfirm = useCallback(() => {
    setIsOpen(false)
    setChosenUser({})
  }, [setChosenUser, setIsOpen])

  const handleDeleteUser = async () => {
    try {
      const data = await deleteUser(user_id).unwrap()
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
                
              <strong>Bạn muốn xóa {username} ?</strong>
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
                onClick={handleDeleteUser}
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

export default UserConfirmDialog
