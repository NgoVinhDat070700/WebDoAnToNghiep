import { useRef, useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, MenuItem, Avatar, IconButton } from '@mui/material';
// components
import MenuPopover from '@/components/MenuPopover';
import { useSelector } from '@/redux/store';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';
import { auth } from '@/config/firebase-config';
import { getUser, setAuthtokenCredential, setRefreshToken } from '@/redux/api/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

// const MENU_OPTIONS = [
//   {
//     label: 'Home',
//     icon: 'eva:home-fill',
//     linkTo: '/',
//   },
//   {
//     label: 'Profile',
//     icon: 'eva:person-fill',
//     linkTo: '#',
//   },
//   {
//     label: 'Settings',
//     icon: 'eva:settings-2-fill',
//     linkTo: '#',
//   },
// ];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const anchorRef = useRef(null);
  const navigate = useNavigate()
  
  const [open, setOpen] = useState(null);
  const dispatch = useDispatch()
  const { user } = useSelector((state)=>state.auth)
  const {username = '', email = ''} = user || {}
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };
  
  const handleClose = () =>{
    setOpen(null);
  }
  const handleLogout = async() => {
    try {
      await signOut(auth);
      dispatch(getUser(null));
      dispatch(setAuthtokenCredential(null));
      dispatch(setRefreshToken(null));
      setOpen(null);
      navigate("/");
    } catch (error) {
      toast.error(`handleLogout ~ error: ${error}`)
    }
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src='' alt="photoURL" />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {username || ''}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {email || ''}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {/* <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} to={option.linkTo} component={RouterLink} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))}
        </Stack> */}

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Đăng xuất
        </MenuItem>
      </MenuPopover>
    </>
  );
}
