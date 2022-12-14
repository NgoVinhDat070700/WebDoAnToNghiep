import PropTypes from 'prop-types'
import { forwardRef } from 'react'
// @mui
import { Box } from '@mui/material'

// ----------------------------------------------------------------------

const Page = forwardRef(({ children, title = '', meta, ...other }, ref) => (
  <>
    <title>{`${(document.title = title)} | KingFood`}</title>
    <meta>{meta}</meta>
    <Box ref={ref} {...other}>
      {children}
    </Box>
  </>
))

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  meta: PropTypes.node,
}

export default Page
