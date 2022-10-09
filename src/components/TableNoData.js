// @mui
import { Box, TableCell, TableRow, Typography } from '@mui/material'

import PropTypes from 'prop-types'

TableNoData.propTypes = {
  isNotFound: PropTypes.bool,
}

export default function TableNoData({ isNotFound }) {
  if (!isNotFound) return null
  return (
    <TableRow>
      <TableCell colSpan={12}>
        <Box
          sx={{
            '& span.MuiBox-root': { height: 160 },
          }}
        >
          <Typography variant='h5' align='center' alignItems='center'>
            No Data
          </Typography>
        </Box>
      </TableCell>
    </TableRow>
  )
}
