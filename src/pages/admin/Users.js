import Page from '@/components/Page'
import UserTable from '@/sections/admin/users'
import UserForm from '@/sections/admin/users/UserForm'
import { Container, Grid } from '@mui/material'
import { useRef } from 'react'

function User() {
  const ref = useRef()
  return (
    <Page title='Users'>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <UserTable ref={ref} />
          </Grid>
          
          <Grid item xs={12} md={4}>
            <UserForm ref={ref} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  )
}

export default User
