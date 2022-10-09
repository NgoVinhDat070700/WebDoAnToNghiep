import { RHFCheckbox } from '@/components/hook-form/RHFCheckbox'
import RHFFormProvider from '@/components/hook-form/RHFFormProvider'
import RHFTextField from '@/components/hook-form/RHFTextField'
import { LoadingButton } from '@mui/lab'
import { Alert, Button, DialogActions, Stack, Typography } from '@mui/material'
import { forwardRef, useCallback, useImperativeHandle, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useUpdateUserMutation } from './UserSlice'

function UserForm(props, ref) {
  const defaultValues = {
    username: '',
    email: '',
    role: '',
  }
  const methods = useForm({
    defaultValues: defaultValues,
  })

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods
  const [selectUser, setSelectUser] = useState({})

  const [updateUser] = useUpdateUserMutation()

  const { _id: user_id } = selectUser || {}
  const handleCancel = useCallback(() => {
    reset()
    setSelectUser({})
  }, [reset])
  useImperativeHandle(ref, () => ({
    handleEditUser: (user) => {
      if (!user) return

      const { username = '', email = '', isAdmin = false } = user || {}
      setValue('username', username)
      setValue('email', email),
      setValue('role', isAdmin)
      setSelectUser(user)
    },
  }))
  const onSubmit = async (data) => {
    try {
      await updateUser({ user_id, data })
      toast.success('Update Success!')
      handleCancel()
    } catch (error) {
      toast.error(`${error}`)
    }
  }
  return (
    <RHFFormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack sx={{ px: 2, pt: 4 }}>
        <Typography sx={{ fontWeight: 'bold' }}>Update User</Typography>
      </Stack>
      <Stack spacing={2} px={2} py={2}>
        {!!errors.afterSubmit && (
          <Alert severity='error'>{errors.afterSubmit.message}</Alert>
        )}
        <RHFTextField name='username' label='User Name' disabled />
        <RHFTextField name='email' label='Email' disabled />
        <Stack direction='row' alignItems='center' alignContent='center'>
          <Typography>Role:</Typography>
          <RHFCheckbox name='role' />
        </Stack>
        <DialogActions>
          <LoadingButton
            type='submit'
            variant='contained'
            loading={isSubmitting}
          >
            Save
          </LoadingButton>

          <Button variant='outlined' color='inherit' onClick={handleCancel}>
            Cancel
          </Button>
        </DialogActions>
      </Stack>
    </RHFFormProvider>
  )
}

export default forwardRef(UserForm)
