import { Link } from "react-router-dom";
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import './sass/productcard.css'

const ProductCard = ({ id, image, prodName, price, permalink, onAddToCart }) => {
    return (
        <>
            <Card className="shadow prodCard">
                <Link to={`/product/${permalink}`}>
                    <CardMedia component="img" image={image} height="180" />
                    <CardContent>
                        <Typography variant="h5" gutterBottom>{prodName}</Typography>
                        <Typography variant="h6" gutterBottom>{price}</Typography>
                    </CardContent>
                </Link>
                <CardActions className="d-flex justify-content-end">
                    <IconButton onClick={() => { onAddToCart(id, 1) }}><ShoppingCart /></IconButton>
                </CardActions>
            </Card>
        </>
    )
}

export default ProductCard