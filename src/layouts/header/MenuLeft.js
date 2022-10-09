import { SwipeableDrawer, ListItem, ListItemButton, ListItemText, Box, List } from '@mui/material'
import PropTypes from 'prop-types'
import { forwardRef } from 'react'
const listMenu = [
  'Home',
  'Products',
  'Blog',
  'About Us',
  'Shop',
  'Login',
  'Register',
]
const MenuLeft = forwardRef(({openMenuLeft,handleCloseMenuLeft,handleOpenMenuLeft},ref) => (
    <SwipeableDrawer open={openMenuLeft} onOpen={handleOpenMenuLeft} onClose={handleCloseMenuLeft}>
      <Box ref={ref}>
        <List>
          {listMenu.map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </SwipeableDrawer>
  )
)
MenuLeft.propTypes = {
    openMenuLeft:PropTypes.bool,
    handleCloseMenuLeft:PropTypes.func,
    handleOpenMenuLeft:PropTypes.func
}
export default MenuLeft
