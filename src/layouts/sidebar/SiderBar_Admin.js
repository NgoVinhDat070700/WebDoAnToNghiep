import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
// material
import { styled } from '@mui/material/styles'
import { Box, Link, Drawer, Stack } from '@mui/material'
import NavSection from '@/components/NavSection'

import Scrollbar from '@/components/Scrollbar'
import useResponsive from '@/hooks/useResponsive'
import navConfig from '@/config/NavConfig'
import Logo from '@/assets/images/fetch_logo2.png'
import { useSelector } from '@/redux/store'
import useLocales from '@/hooks/useLocales'

const DRAWER_WIDTH = 280

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}))

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  fontSize: 25,
  fontWeight: 'bold',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
}))

// ----------------------------------------------------------------------

SiderBar_Admin.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
}

export default function SiderBar_Admin({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation()
  const { translate } = useLocales()
  const isDesktop = useResponsive('up', 'lg')

  const { user } = useSelector((state) => state.auth)
  const { username = '' } = user || {}
  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        <Box component='img' src={Logo} sx={{ width: 100 }} />
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline='none' component={RouterLink} to='#'>
          <AccountStyle>
            {translate('hello')}, {username}
          </AccountStyle>
        </Link>
      </Box>

      <NavSection navConfig={navConfig} />

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
        <Stack alignItems='center' spacing={3} sx={{ pt: 5, borderRadius: 2, position: 'relative' }}>
          <Box
            component='img'
            src='/static/illustrations/illustration_avatar.png'
            sx={{ width: 100, position: 'absolute', top: -50 }}
          />
        </Stack>
      </Box>
    </Scrollbar>
  )

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant='persistent'
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  )
}
