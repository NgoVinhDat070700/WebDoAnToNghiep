
import RHFFormProvider from "@/components/hook-form/RHFFormProvider";
import RHFTextField from "@/components/hook-form/RHFTextField";
import { LoadingButton } from "@mui/lab";
import { Alert, Button, DialogActions, Stack, Typography } from "@mui/material";
import { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useUpdateOrderMutation } from "./orderSlice";
function OrderForm(props, ref) {
    const defaultValues={
        status: ''
    }
    const methods = useForm({
        defaultValues:defaultValues
    })

    const { reset, setValue, handleSubmit, formState: {isSubmitting, errors}} = methods
    const [selectOrder, setSelectOrder] = useState({})

    const [updateOrder] = useUpdateOrderMutation()

    const { _id: order_id } = selectOrder || {}
    const handleCancel = useCallback(() => {
        reset()
        setSelectOrder({})
      }, [reset])
    useImperativeHandle(ref, ()=>({
        handleEditOrder: (order) => {
            const { status = '' } = order || {}
            setValue("status", status )
            
            setSelectOrder(order)
        }
    }))
    const onSubmit = async (data) =>{
        try {
                await updateOrder({order_id, data})
                toast.success('Update Success!')
                handleCancel()
        } catch (error) {
            toast.error(`${error}`)
        }

    }
    return (
        <RHFFormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack sx={{px : 2, pt : 4}}>
                <Typography sx={{fontWeight:'bold'}}>
                   Update Category
                </Typography>

            </Stack>
            <Stack spacing={2} px={2} py={2}>
                {!!errors.afterSubmit && (
                <Alert severity='error'>{errors.afterSubmit.message}</Alert>
                )}
                <RHFTextField name="status" />
                <DialogActions>
                    <LoadingButton
                        type='submit'
                        variant='contained'
                        loading={isSubmitting}
                    >
                        Save
                    </LoadingButton>

                    <Button variant='outlined' color='inherit' onClick={handleCancel} >
                        Cancel
                    </Button>
                </DialogActions>
            </Stack>
        </RHFFormProvider>
    );
}

export default forwardRef(OrderForm);