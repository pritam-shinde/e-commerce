import {Card, CardMedia, CardContent, Typography, CardActions, IconButton} from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import './sass/prodcard.css'

const ProdCard = ({permalink,image, prodName, price}) => {
  return (
    <>
    <Card className="shadow prodCard">
                  <Link to={`/product/${permalink}`}>
                    <CardMedia component="img" image={image} height="220" />
                    <CardContent>
                      <Typography variant="h5" gutterBottom>{prodName}</Typography>
                      <Typography variant="h6">{price}</Typography>
                    </CardContent>
                    <CardActions>
                      <IconButton><ShoppingCart /></IconButton>
                    </CardActions>
                  </Link>
                </Card>
    </>
  )
}

export default ProdCard