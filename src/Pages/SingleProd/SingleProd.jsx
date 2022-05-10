import { useParams } from "react-router-dom";
import { Container, Grid, Box, Typography, Button } from "@mui/material";
import { commerce } from "../../lib/commerce";
import { useEffect, useState } from "react";
import parse from 'html-react-parser';
import './sass/singleprod.css'

const SingleProd = () => {
  const [prod, setProd] = useState()
  const { permalink } = useParams();

  const fetchProd = async() =>{
    let {data} = await commerce.products.list();
    let prod = data.filter(entries=> entries.permalink === permalink);
    setProd(prod)
  }

  useEffect(()=>{
    fetchProd()
  },[fetchProd]);


  return (
    <>
      <main id="singleProd" style={{ marginTop: "3.68rem" }}>
      {
        prod ? prod.map(item=>{
          return <Container maxWidth="xxl">
          <Grid container={true}>
            <Grid item={true} xs={11} sm={11} md={10} lg={10} className="mx-auto" >
              <Box py={3}>
                <Grid container={true} spacing={5}>
                  <Grid item={true} xs={12} sm={6}>
                    <img src={item.image.url} alt={item.name} className="img-fluid p-3" />
                  </Grid>
                  <Grid item={true} xs={12} sm={6}>
                    <Typography variant="h1" gutterBottom>{prod ? item.name ? item.name : null : null}</Typography>
                    <Typography variant="h2" gutterBottom>{prod ? item.price ? item.price.formatted_with_symbol : null : null}</Typography>
                    <Typography>{prod ? item.description ? parse(String(item.description)) : null : null}</Typography>
                    <Box className="d-flex flex-md-row flex-column justify-content-md-between align-items-start">
                      <Box>
                        <b>Quantity</b>
                      </Box>
                      <Box>
                        <Button variant="contained">Add To Cart</Button>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Container>
        }) : null 
      }
      </main>
    </>
  )
}

export default SingleProd