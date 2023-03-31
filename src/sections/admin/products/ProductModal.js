import PropTypes from 'prop-types'

import { Divider, Drawer, Stack, Typography } from '@mui/material'
import ProductForm from './ProductForm'
import useLocales from '@/hooks/useLocales'

ProductModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  detailProduct: PropTypes.object,
  isEdit: PropTypes.bool,
  createProduct: PropTypes.func,
  updateProduct: PropTypes.func,
}
function ProductModal({ isOpen = false, onClose, detailProduct, isEdit, createProduct, updateProduct }) {
  const { translate } = useLocales()
  return (
    <Drawer open={isOpen} onClose={onClose} anchor='right' PaperProps={{ sx: { width: { xs: 1, sm: 480, md: 640 } } }}>
      <Stack spacing={1}>
        {isEdit ? (
          <Typography variant='h4'>{translate('page.product.update')}</Typography>
        ) : (
          <Typography variant='h4'>{translate('page.product.create')}</Typography>
        )}
      </Stack>
      <Divider />
      <ProductForm
        detailProduct={detailProduct}
        onClose={onClose}
        isEdit={isEdit}
        createProduct={createProduct}
        updateProduct={updateProduct}
      />
    </Drawer>
  )
}

export default ProductModal
