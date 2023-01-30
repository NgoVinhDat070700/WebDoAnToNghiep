import PropTypes from 'prop-types'
import RHFFormProvider from '@/components/hook-form/RHFFormProvider'
import RHFTextField from '@/components/hook-form/RHFTextField'
import { Box, Button, DialogActions, Grid, Stack, Typography } from '@mui/material'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'

import RHFAutocomplete from '@/components/hook-form/RHFAutocomplete'
import UploadImage from '@/components/UploadImage'
import { LoadingButton } from '@mui/lab'
import { toast } from 'react-toastify'
import { useGetListCategoryQuery } from '@/sections/admin/categories/CategorySlice'

const defaultValues = {
  nameproduct: '',
  price: 0,
  image: '',
  category_id: '',
  desc: '',
}

ProductForm.propTypes = {
  detailProduct: PropTypes.object,
  onClose: PropTypes.func,
  isEdit: PropTypes.bool,
  createProduct: PropTypes.func,
  updateProduct: PropTypes.func
}
function ProductForm({ detailProduct, onClose, isEdit, createProduct, updateProduct }) {

  const {
    nameproduct = '',
    price = 0,
    image = '',
    category_id = {},
    desc = '',
    _id: productId = ''
  } = detailProduct || {}

  const { namecategory = '', _id = '' } = category_id || {}
  const methods = useForm({ defaultValues })
  const { setValue, handleSubmit, watch } = methods
  
  const inputPrice = watch('price')
  useEffect(() => {
    if (!inputPrice) return
    try {
      const inputValue = parseInt(inputPrice, 10)
      if (Number.isNaN(inputValue)) {
        setValue('price', '')
        return
      }
      setValue('price', inputValue)
    } catch (error) {
      // TODO
    }
  }, [inputPrice, setValue])

  useEffect(() => {
    if(!productId) return

    setValue('nameproduct', nameproduct)
    setValue('price', price)
    setValue('image', image)
    setValue('desc', desc)
    setValue('category_id', { label: namecategory, id: _id })
  }, [setValue, nameproduct, namecategory, productId, _id, image, desc, price])

  const { data } = useGetListCategoryQuery()
  const { categories = [] } = data || {}
  const listCategoryOption = useMemo(
    () =>
      (categories || []).map(({ _id: value, namecategory: label }) => ({
        label,
        id: value,
      })),
    [categories]
  )
  
  const onChangePrice = (e) =>{
    const value = e.target.value
    setValue('price', value || '')
  }
  const onSubmit = async (data) => {
    const {category_id = {}} = data
    const {id = ''} = category_id || {}
    const dataForm = {...data, category_id:id}
    try {
      if(isEdit && productId){
        
        await updateProduct({productId, dataForm}).unwrap()
        onClose()
        toast.success('Sửa thành công!')
      }
      else {
        await createProduct(dataForm).unwrap()
        onClose()
        toast.success('Thêm thành công!')
      }
    } catch (error) {
      toast.error(`${error.message}`)
    }
  }
  return (
    <RHFFormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} px={3} py={3}>
        <Grid item xs={12} md={12}>
          <Stack spacing={1}>
            <Typography sx={{ fontWeight: 'bold' }}>Tên sản phẩm</Typography>
            <RHFTextField name='nameproduct' />
          </Stack>

          <Stack spacing={1}>
            <Typography sx={{ fontWeight: 'bold' }}>Loại</Typography>
            <RHFAutocomplete
              name='category_id'
              options={listCategoryOption}
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
          </Stack>

          <Stack spacing={1}>
            <Typography sx={{ fontWeight: 'bold' }}>Giá</Typography>
            <RHFTextField name='price' onChange={onChangePrice}/>
          </Stack>

          <Stack spacing={1}>
            <Typography sx={{ fontWeight: 'bold' }}>Ảnh</Typography>
            <UploadImage label='File Upload' name='image' setValue={setValue} />
          </Stack>

          <Stack spacing={1}>
            <Typography sx={{ fontWeight: 'bold' }}>Mô tả</Typography>
            <RHFTextField multiline rows={3} name='desc' />
          </Stack>
        </Grid>
      </Grid>

      <Grid item xs={12} mt={3}>
        <DialogActions>
          <LoadingButton
            type='submit'
            variant='contained'
           
          >
            Lưu
          </LoadingButton>

          <Button variant='outlined' color='inherit' onClick={onClose} >
            Thoát
          </Button>
        </DialogActions>
      </Grid>
    </RHFFormProvider>
  )
}

export default ProductForm
