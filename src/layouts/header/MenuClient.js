import React, { useCallback, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import AdbIcon from '@mui/icons-material/Adb';
import AccountPopover from './AccountPopover';
import  MenuLeft  from './MenuLeft';

import Logo from '@/assets/images/fetch_logo_text.png'
import { Link } from 'react-router-dom';

const listMenu = [
  {
    title:'Home',
    path:'/'
  },
  {
    title:'Products',
    path:'/products'
  },
  {
    title:'Blog',
    path:'/Blogs'
  },
  {
    title:'Cart',
    path:'/cart'
  },
  {
    title:'Login',
    path:'/login'
  },
  {
    title:'Resgiter',
    path:'/register'
  },
]

const Header = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const [openMenuLeft, setOpenMenuLeft] = useState(false)

  const handleCloseMenuLeft = useCallback(() => {
    setOpenMenuLeft(false)
  },[]);
  const handleOpenMenuLeft = useCallback(()=>{
    setOpenMenuLeft(true)
  },[])
  const handleCloseUserMenu = useCallback(() => {
    setAnchorElUser(null);
  },[]);
  return (
    <AppBar position="static" sx={{backgroundColor:'#fff', border:'1px solid black'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Box
            component="img"
            src={Logo}
            sx={{ width: 75 , height:50  }}
            />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={()=>setOpenMenuLeft(true)}
            >
              <MenuIcon />
            </IconButton>
            <MenuLeft openMenuLeft={openMenuLeft} handleCloseMenuLeft={handleCloseMenuLeft} handleOpenMenuLeft={handleOpenMenuLeft}/>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            FastFood
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {listMenu.map((page) => (
              <Button
                key={page}
                sx={{ my: 2, color: 'black', display: 'block' }}
                
              >
                <Link to={page.path} style={{textDecoration:'none', color: '#000'}}>
                  {page.title}
                </Link>
              </Button>
            ))}
          </Box>

        <AccountPopover handleOpenUserMenu={handleOpenUserMenu} handleCloseUserMenu={handleCloseUserMenu} anchorElUser={anchorElUser} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;