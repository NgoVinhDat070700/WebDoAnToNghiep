import Page from '@/components/Page'
import useLocales from '@/hooks/useLocales'
import DashboardDefault from '@/sections/admin/dashboad'
import { Container } from '@mui/material'

function Dashboard() {
  const { translate } = useLocales()
  return (
    <Page title={translate('dashboard')}>
      <Container>
        <DashboardDefault />
      </Container>
    </Page>
  )
}

export default Dashboard
