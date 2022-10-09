import {Stack, TextField } from '@mui/material'
import { useState } from 'react'

import PropTypes from 'prop-types'
import RHFTextField from './hook-form/RHFTextField'
import { API_UPLOAD_IMAGE } from '@/routes/api'
import { _postApi } from '@/utils/axios'
import Iconify from './Iconify'
import { LoadingButton } from '@mui/lab'

UploadImage.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  setValue:PropTypes.func
}
export default function UploadImage({ label = '', name = '', setValue }) {
  const [isLoading, setIsLoading] = useState(false)
  // const { enqueueSnackbar } = useSnackbar()
  const handleUploadFile = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()

    formData.append(name, file)

    try {
      setIsLoading(true)
      const res = await _postApi(API_UPLOAD_IMAGE, formData)
      setValue(name, res.image)
      setIsLoading(false)
    } catch (error) {
      
      setIsLoading(false)
    }
  }
  return (
    <Stack direction='row' alignItems='center' spacing={2}>
      <RHFTextField type='text' label={label} name={name} disabled />

      <input id='file-upload' type='file' hidden />

      <label>
        <LoadingButton
          loading={isLoading}
          component='div'
        >
          <TextField
            type='file'
            sx={{ display: 'none' }}
            onChange={handleUploadFile}
           
          />
          <Iconify icon={'bxs:cloud-upload'} width={32} height={32} />
        </LoadingButton>
      </label>
    </Stack>
  )
}
