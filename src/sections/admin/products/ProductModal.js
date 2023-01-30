import PropTypes from 'prop-types'

import { Divider, Drawer, Stack, Typography } from "@mui/material";
import ProductForm from './ProductForm';

ProductModal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    detailProduct: PropTypes.object,
    isEdit: PropTypes.bool,
    createProduct: PropTypes.func,
    updateProduct: PropTypes.func
}
function ProductModal({isOpen = false, onClose, detailProduct, isEdit, createProduct, updateProduct}) {
    return (
        <Drawer
        open={isOpen}
        onClose={onClose}
        anchor='right'
        PaperProps={{ sx: { width: { xs: 1, sm: 480, md: 640 } } }}
        >
            <Stack spacing={1}>
                {isEdit ?(<Typography  variant='h4'>Sửa sản phẩm</Typography>):(<Typography  variant='h4'>Xóa sản phẩm</Typography>)}
            </Stack>
            <Divider />
            <ProductForm detailProduct={detailProduct} onClose={onClose} isEdit={isEdit} createProduct={createProduct} updateProduct={updateProduct}/>
        </Drawer>
    );
}

export default ProductModal;