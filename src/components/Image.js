
import { URL_IMAGE } from '@/config';
import { Box } from '@mui/material';
import PropTypes from 'prop-types'

Image.propTypes = {
    image: PropTypes.string,
    sx: PropTypes.object
}
function Image({image, sx }) {
    return (
        <Box component='img' sx={sx} src={`${URL_IMAGE}/${image}`} />
    );
}

export default Image;