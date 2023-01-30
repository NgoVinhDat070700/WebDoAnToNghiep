import Page from '@/components/Page'
import useResponsive from '@/hooks/useResponsive'
import AuthSocial from '@/sections/auth/AuthSocial'
import RegisterForm from '@/sections/auth/register/RegisterForm'

import { Alert, Card, Container, styled, Typography } from '@mui/material'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}))

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}))

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}))

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}))

// ----------------------------------------------------------------------

export default function Register() {

  const navigate = useNavigate()
  const [status, setStatus] = useState('')
  const smUp = useResponsive('up', 'sm')

  const mdUp = useResponsive('up', 'md')

  return (
    <Page title='Register'>
      <RootStyle>
        <HeaderStyle>
          {smUp && (
            <Typography variant='body2' sx={{ mt: { md: -2 } }}>
              Bạn chưa có tài khoản? {''}
              <Link variant='subtitle2' to='/register'>
                Bắt đầu
              </Link>
            </Typography>
          )}
        </HeaderStyle>

        {mdUp && (
          <SectionStyle>
            <Typography variant='h3' sx={{ px: 5, mt: 10, mb: 5 }}>
              Xin chào, chào mừng bạn trở lại
            </Typography>
            <img src='/static/illustrations/illustration_login.png' alt='login' />
          </SectionStyle>
        )}

        <Container maxWidth='sm'>
          <ContentStyle>
            <Typography variant='h4' gutterBottom>
              Đăng ký vào Fetch Food
            </Typography>

            <Typography sx={{ color: 'text.secondary', mb: 5 }}>Nhập thông tin chi tiết của bạn dưới đây.</Typography>

            <AuthSocial />

            <RegisterForm setStatus={setStatus} />

            {!smUp && (
              <Typography variant='body2' align='center' sx={{ mt: 3 }}>
                Bạn chưa có tài khoản?{' '}
                <Link variant='subtitle2' to='/register'>
                  Bắt đầu 
                </Link>
              </Typography>
            )}
            {status === 'success' && (
              <Alert severity='info'>
                <span
                  onClick={() => {
                    navigate('/login')
                  }}
                >
                  <a target='_blank' rel='noopener noreferrer' href={'https://mail.google.com/mail/u/0/#inbox'}>
                    Đi đến hòm thư
                  </a>
                </span>
              </Alert>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  )
}
