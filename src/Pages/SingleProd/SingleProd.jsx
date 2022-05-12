import { Grid, Container, Box, Typography, Button } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { commerce } from "../../lib/commerce";
import { LocalShipping, Autorenew } from "@mui/icons-material";
import parse from 'html-react-parser';
import './sass/singleprod.css'

const SingleProd = ({ onAddToCart }) => {
  const [product, setProduct] = useState()
  const [width, setWidth] = useState();
  const { permalink } = useParams();

  useEffect(() => {
    setWidth(window.innerWidth)
  }, [width]);

  const fetchProduct = async () => {
    const response = await commerce.products.retrieve(`${permalink}`, { type: 'permalink' });
    setProduct(response)
  }

  useEffect(() => {
    fetchProduct()
  })

  return (
    <>
      <main style={{ marginTop: "3.7rem" }} id="singleprod">
        <Container maxWidth="xxl" className="py-md-5 py-3">
          <Grid container={true}>
            <Grid item={true} xs={11} sm={11} md={10} lg={10} className="mx-auto">
              <Box>
                <Grid container={true} spacing={5}>
                  <Grid item={true} xs={12} sm={5} md={6}>
                    {
                      width <= 599 ? <Typography variant="h1" gutterBottom>{product ? product.name : null}</Typography> : null
                    }
                    {
                      product ? <img src={product.image.url} alt={product.name} /> : null
                    }
                  </Grid>
                  <Grid item={true} xs={12} sm={7} md={6}>
                    {
                      width <= 599 ? null : <Typography variant="h1" gutterBottom>{product ? product.name : null}</Typography>
                    }
                    {
                      product ? <Typography variant="h2" style={{ color: "red" }} gutterBottom>{product.price.formatted_with_symbol}</Typography> : null
                    }
                    <Grid container={true}>
                      {
                        [{ id: "service-1", title: "FREE SHIPPING", icon: <LocalShipping /> }, { id: "service-2", title: "FREE RETURN", icon: <Autorenew /> }].map(item => {
                          return <Grid key={item.id} item={true} xs={6} >
                            <Box className="d-flex align-items-center justify-content-center border flex-md-row flex-column py-3 my-3">
                              {item.icon}
                              <Typography variant="h6" className="ms-3">{item.title}</Typography>
                            </Box>
                          </Grid>
                        })
                      }
                      {
                        product ? <Typography variant="body">{parse(String(product.description))}</Typography> : null
                      }
                    </Grid>
                    <Box mt={3}>
                      <Grid container={true} spacing={5}>
                        <Grid item={true} xs={12} sm={6}>

                        </Grid>
                        <Grid item={true} xs={12} sm={6}>
                          <Box>
                            <Button onClick={() => { onAddToCart(product.id, 1);  }} variant="contained" className="btn d-block w-100 btn-danger">ADD To Cart</Button>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </main>
    </>
  )
}

export default SingleProd