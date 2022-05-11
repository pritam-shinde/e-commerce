import { Box, } from "@mui/material";
import Carousel from 're-carousel'
import {ProductCard} from '../Components'

const ProductSlider = ({ category, cat }) => {
let productsPerCat = category.filter(group=>{return group.name === cat});

    return (
        <>
            <Box>
                <Carousel>
                     {
                         productsPerCat[0].productsData.slice(0,6).map((item, index)=> {
                             return <Box>
                              1
                             </Box>
                         })
                     }
                </Carousel>
            </Box>
        </>
    )
}

export default ProductSlider