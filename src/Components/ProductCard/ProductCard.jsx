import { Link } from "react-router-dom";
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import './sass/productcard.css'

const ProductCard = ({ image, prodName, price, permalink }) => {
    return (
        <>
            <Card className="shadow prodCard">
                <Link to={`/product/${permalink}`}>
                    <CardMedia component="img" image={image} height="180" />
                    <CardContent>
                        <Typography variant="h5" gutterBottom>{prodName}</Typography>
                        <Typography variant="h6" gutterBottom>{price}</Typography>
                    </CardContent>
                    <CardActions className="d-flex justify-content-end">
                        <IconButton><ShoppingCart /></IconButton>
                    </CardActions>
                </Link>
            </Card>
        </>
    )
}

export default ProductCard