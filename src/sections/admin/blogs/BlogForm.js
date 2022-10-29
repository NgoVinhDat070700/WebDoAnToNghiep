import PropTypes from 'prop-types'

import { Box, Button, DialogActions, Divider, Drawer, Grid, Stack, Typography } from '@mui/material'
import RHFFormProvider from '@/components/hook-form/RHFFormProvider'
import RHFAutocomplete from '@/components/hook-form/RHFAutocomplete'
import RHFTextField from '@/components/hook-form/RHFTextField'
import UploadImage from '@/components/UploadImage'
import { LoadingButton } from '@mui/lab'
import { useForm } from 'react-hook-form'
import { useEffect, useMemo } from 'react'
import { useGetListCategoryQuery } from '../categories/CategorySlice'
import { toast } from 'react-toastify'

BlogForm.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  detailBlog: PropTypes.object,
  isEdit: PropTypes.bool,
  createBlog: PropTypes.func,
  updateBlog: PropTypes.func,
}

const defaultValues = {
  title: '',
  image: '',
  video: '',
  category_id: '',
  desc: ''
}
function BlogForm({ isOpen = false, onClose, detailBlog, isEdit, createBlog, updateBlog }) {
  const {
    title = '',
    image = '',
    video = '',
    category_id = {},
    desc = '',
    _id: blogId = ''
  } = detailBlog || {}
  const { namecategory = '', _id = '' } = category_id || {}
  const methods = useForm({ defaultValues })
  const { setValue, handleSubmit } = methods

  useEffect(() => {
    if(!blogId) return

    setValue('title', title)
    setValue('video', video)
    setValue('image', image)
    setValue('desc', desc)
    setValue('category_id', { label: namecategory, id: _id })
  }, [setValue, title, namecategory, blogId, _id, image, desc, video])
  
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
  const onSubmit = async (data) => {
    const {category_id = {}} = data
    const {id = ''} = category_id || {}
    const dataForm = {...data, category_id:id}
    try {
      if(isEdit && blogId){
        
        await updateBlog({blogId, dataForm}).unwrap()
        onClose()
        toast.success('Update Success!')
      }
      else {
        await createBlog(dataForm).unwrap()
        onClose()
        toast.success('Create Success!')
      }
    } catch (error) {
      toast.error(`${error.message}`)
    }
  }
  return (
    <Drawer open={isOpen} onClose={onClose} anchor='right' PaperProps={{ sx: { width: { xs: 1, sm: 480, md: 640 } } }}>
      <Stack spacing={1}>
        {isEdit ? (
          <Typography variant='h4'>Edit Product</Typography>
        ) : (
          <Typography variant='h4'>Create Product</Typography>
        )}
      </Stack>
      <Divider />
      <RHFFormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} px={3} py={3}>
          <Grid item xs={12} md={12}>
            <Stack spacing={1}>
              <Typography sx={{ fontWeight: 'bold' }}>Title</Typography>
              <RHFTextField name='title' />
            </Stack>

            <Stack spacing={1}>
              <Typography sx={{ fontWeight: 'bold' }}>Category</Typography>
              <RHFAutocomplete
                name='category_id'
                options={listCategoryOption}
                AutocompleteProps={{
                  size: 'small',
                  isOptionEqualToValue: (option, value) => option._id === value._id,
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
              <Typography sx={{ fontWeight: 'bold' }}>video</Typography>
              <RHFTextField name='video' label="Lấy id từ Youtube"/>
            </Stack>

            <Stack spacing={1}>
              <Typography sx={{ fontWeight: 'bold' }}>Image</Typography>
              <UploadImage label='File Upload' name='image' setValue={setValue} />
            </Stack>

            <Stack spacing={1}>
              <Typography sx={{ fontWeight: 'bold' }}>Description</Typography>
              <RHFTextField multiline rows={3} name='desc' />
            </Stack>
          </Grid>
        </Grid>

        <Grid item xs={12} mt={3}>
          <DialogActions>
            <LoadingButton type='submit' variant='contained'>
              Save
            </LoadingButton>

            <Button variant='outlined' color='inherit' onClick={onClose}>
              Cancel
            </Button>
          </DialogActions>
        </Grid>
      </RHFFormProvider>
    </Drawer>
  )
}

export default BlogForm
