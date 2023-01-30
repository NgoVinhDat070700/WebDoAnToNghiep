import RHFAutocomplete from '@/components/hook-form/RHFAutocomplete'
import RHFFormProvider from '@/components/hook-form/RHFFormProvider'
import { CONSTANT } from '@/config'
import { LoadingButton } from '@mui/lab'
import { Alert, Box, Button, DialogActions, Stack, Typography } from '@mui/material'
import { forwardRef, useCallback, useImperativeHandle, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useUpdateOrderMutation } from './orderSlice'
function OrderForm(props, ref) {
  const defaultValues = {
    orderStatus: '',
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

  const listStatusOrdersOption = useMemo(
    () =>
      (CONSTANT.ORDER_STATUSES || []).map(({ value, name: label }) => ({
        label,
        id: value,
      })),
    []
  )
  const [selectOrder, setSelectOrder] = useState({})
  const [updateOrder] = useUpdateOrderMutation()

  const { _id: order_id } = selectOrder || {}
  const handleCancel = useCallback(() => {
    reset()
    setSelectOrder({})
  }, [reset])
  useImperativeHandle(ref, () => ({
    handleEditOrder: (order) => {
      const { orderStatus = {} } = order || {}
      const { name = '', value = ''} = orderStatus || {}
      setValue('orderStatus', { label: name, id: value})

      setSelectOrder(order)
    },
  }))
  const onSubmit = async (data) => {
    if(data){
      const { id: value = '', label: name = ''} = data?.orderStatus || {}
      const statusResult = {value, name}
      try {
        await updateOrder({ order_id, statusResult })
        toast.success('Update Success!')
        handleCancel()
      } catch (error) {
        toast.error(`${error}`)
      }
    }
  }
  return (
    <RHFFormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack sx={{ px: 2, pt: 4 }}>
        <Typography sx={{ fontWeight: 'bold' }}>Thay đổi trạng thái đơn hàng</Typography>
      </Stack>
      <Stack spacing={2} px={2} py={2}>
        {!!errors.afterSubmit && <Alert severity='error'>{errors.afterSubmit.message}</Alert>}
        <RHFAutocomplete
              name='orderStatus'
              options={listStatusOrdersOption}
              AutocompleteProps={{
                size: 'small',
                isOptionEqualToValue: (option, value) =>
                  option._id === value._id,
                renderOption: (props, option) => {
                  // fix error duplicate key
                  const newProps = {
                    ...props,
                    key: option.id,
                  }
                  return (
                    <Box component='li' {...newProps} key={newProps.key}>
                      {option.label}
                    </Box>
                  )
                },

                onChange: (field) => (event, newValue) => {
                  field.onChange(newValue)
                },
              }}
            />
        <DialogActions>
          <LoadingButton type='submit' variant='contained' loading={isSubmitting} disabled={Object.keys(selectOrder).length !==0 ? false : true}>
            Lưu
          </LoadingButton>

          <Button variant='outlined' color='inherit' onClick={handleCancel}>
            Thoát
          </Button>
        </DialogActions>
      </Stack>
    </RHFFormProvider>
  )
}

export default forwardRef(OrderForm)
