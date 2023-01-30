import { RHFCheckbox } from "@/components/hook-form/RHFCheckbox";
import RHFFormProvider from "@/components/hook-form/RHFFormProvider";
import RHFTextField from "@/components/hook-form/RHFTextField";
import UploadImage from "@/components/UploadImage";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Alert, Button, DialogActions, Stack, Typography } from "@mui/material";
import { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as Yup from 'yup'
import { useCreateCategoryMutation, useUpdateCategoryMutation } from "./CategorySlice";

function CategoryForm(props, ref) {
    const defaultValues={
        namecategory: '',
        image:'',
        status: ''
    }
    const CategoryFormSchema = Yup.object().shape({
        namecategory: Yup.string().required('Yêu cầu nhập tên!'),
        image: Yup.string().required('Yêu cầu chọn ảnh!')
    })
    const methods = useForm({
        resolver: yupResolver(CategoryFormSchema),
        defaultValues:defaultValues
    })

    const { reset, setValue, handleSubmit, formState: {isSubmitting, errors}} = methods
    const [selectCategory, setSelectCategory] = useState({})

    const [createCategory] = useCreateCategoryMutation()
    const [updateCategory] = useUpdateCategoryMutation()

    const { _id: category_id } = selectCategory || {}

    const isNewRecord = !category_id
    const handleCancel = useCallback(() => {
        reset()
        setSelectCategory({})
      }, [reset])
    useImperativeHandle(ref, ()=>({
        handleEditCategory: (category) => {
            const {namecategory = '', image = '', status = false} = category || {}
            setValue('namecategory', namecategory)
            setValue('image', image),
            setValue('status', status)
            
            setSelectCategory(category)
        }
    }))
    const onSubmit = async (data) =>{
        try {
            if(isNewRecord){
                await createCategory(data)
                toast.success('Thêm thành công!')
                handleCancel()
            }
            else{
                await updateCategory({category_id, data})
                toast.success('Sửa thành công!')
                handleCancel()
            }
        } catch (error) {
            toast.error(`${error}`)
        }

    }
    return (
        <RHFFormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack sx={{px : 2, pt : 4}}>
                <Typography sx={{fontWeight:'bold'}}>
                    {isNewRecord ? 'Thêm loại sản phẩm' : 'Sửa loại sản phẩm'}
                </Typography>

            </Stack>
            <Stack spacing={2} px={2} py={2}>
                {!!errors.afterSubmit && (
                <Alert severity='error'>{errors.afterSubmit.message}</Alert>
                )}
                <RHFTextField name='namecategory' label="Tên loại" />
                <UploadImage name='image' label='Ảnh' setValue={setValue} />
                <Stack direction='row' alignItems='center' alignContent='center'>
                    <Typography>Trạng thái:</Typography>
                    <RHFCheckbox name='status' />
                </Stack>
                <DialogActions>
                    <LoadingButton
                        type='submit'
                        variant='contained'
                        loading={isSubmitting}
                    >
                        Lưu
                    </LoadingButton>

                    <Button variant='outlined' color='inherit' onClick={handleCancel} >
                        Thoát
                    </Button>
                </DialogActions>
            </Stack>
        </RHFFormProvider>
    );
}

export default forwardRef(CategoryForm);