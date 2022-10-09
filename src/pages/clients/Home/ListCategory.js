import Image from '@/components/Image'
import Scrollbar from '@/components/Scrollbar'
import { useGetListCategoryQuery } from '@/sections/admin/categories/CategorySlice'
import { Box, Button, Card, Container, Typography } from '@mui/material'

function ListCategory() {
    const {data} = useGetListCategoryQuery()
    const {categories = []} = data || {}
  return (
    <Scrollbar>
      <Container sx={{display:'flex', p:2}}>
      {categories.map((item) => (
        // eslint-disable-next-line react/jsx-key
        <Card sx={{p:2, mr:2}}>
          <Image image={item.image} sx={{width: 250, height: 250}}/>
          <Box>
            <Typography variant='h5'>{item.namecategory}</Typography>
            <Button>Xem</Button>
          </Box>
        </Card>
      ))}
      </Container>
    </Scrollbar>
  )
}

export default ListCategory
