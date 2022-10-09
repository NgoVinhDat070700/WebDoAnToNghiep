import HeaderMenu from '../layouts/header/MenuAdmin'
import PropTypes from 'prop-types'
import SiderBar_Admin from './sidebar/SiderBar_Admin'
import { useState } from 'react';
// material
import { styled } from '@mui/material/styles';
//--------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

// ----------------------------------------------------------------------

export default function LayoutAdmin({children}) {
  const [open, setOpen] = useState(false);

  return (
    <RootStyle>
      <HeaderMenu onOpenSidebar={() => setOpen(true)} />
      <SiderBar_Admin isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      <MainStyle>
        {children}
      </MainStyle>
      
    </RootStyle>
  );
}
LayoutAdmin.propTypes = {
    children: PropTypes.node
}
