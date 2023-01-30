import Page from '@/components/Page'
import DashboardDefault from '@/sections/admin/dashboad'
import { Container } from '@mui/material'

function Dashboard() {

  return (
    <Page title='Bảng điều khiển'>
      <Container>
        <DashboardDefault />
      </Container>
    </Page>
  )
}

export default Dashboard
