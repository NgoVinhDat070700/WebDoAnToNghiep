import PropTypes from 'prop-types';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import { alpha, styled } from '@mui/material/styles';
import {  Link, Card, Grid, Avatar, CardContent, Typography, Button } from '@mui/material';

import { URL_IMAGE } from '@/config';
import Iconify from '@/components/Iconify';
import { useDispatch } from '@/redux/store';
import { addCart } from '@/redux/api/cartSlice';
// utils

// ----------------------------------------------------------------------

const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)',
});

const TitleStyle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  fontSize:18,
  fontWeight:'bold',
  WebkitBoxOrient: 'vertical',
});

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2),
}));

const CoverImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  handleViewProductDetail: PropTypes.func,
  index: PropTypes.number,
};

export default function ProductCard({ product, handleViewProductDetail }) {
  const navigate = useNavigate()

  const { nameproduct, image, price } = product;
  const dispatch = useDispatch()
  const handleAddToCart = (data) => {
    dispatch(addCart(data))
    navigate('/cart')

  }
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card sx={{ position: 'relative', borderRadius:5 }}>
        <CardMediaStyle
          sx={{
              pt: 'calc(100% * 4 / 5)',
              '&:after': {
                top: 0,
                content: "''",
                width: '100%',
                height: '100%',
                position: 'absolute',
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
              },
          }}
        >
          <AvatarStyle
            src={`${URL_IMAGE}/${image}`}
            alt='Name'
            sx={{
              
                zIndex: 9,
                top: 24,
                left: 24,
                width: 40,
                height: 40,
            }}
          />

          <CoverImgStyle alt={nameproduct} src={`${URL_IMAGE}/${image}`} />
        </CardMediaStyle>

        <CardContent
          sx={{
            pt: 4,
          }}
        >
          <Typography gutterBottom variant="subtitle2" sx={{ color: '#000', display: 'block', fontSize: 18 }}>
            Price: {price}
          </Typography>

          <TitleStyle
            to="#"
            color="inherit"
            variant="subtitle2"
            underline="hover"
            component={RouterLink}
            onClick={handleViewProductDetail}
          >
            {nameproduct}
          </TitleStyle>
          <Button sx={{backgroundColor:'#FFCC66'}} variant="contained" onClick={()=>handleAddToCart({id:product._id,nameproduct:product.nameproduct,price:product.price,image:product.image,quatity:+1})}>Add To Cart<Iconify icon={'bytesize:cart'} sx={{width:16, height:16}} /></Button>
        </CardContent>
      </Card>
    </Grid>
  );
}
