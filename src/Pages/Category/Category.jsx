import { Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SectionalHeading, ProductCard } from "../../Components/Components";

const Category = ({onAddToCart}) => {
  const [products, setProducts] = useState([]);
  const {permalink} = useParams()
  const [slug, setSlug] = useState(permalink)

  useEffect(()=>{
    setSlug(permalink)
  },[permalink])

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("X-Authorization", process.env.REACT_APP_CHEC_PUBLIC_KEY);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`https://api.chec.io/v1/products?category_slug=${slug}`, requestOptions)
      .then(response => response.json())
      .then(result => setProducts(result.data))
      .catch(error => console.log('error', error));
  },[slug]);

  return (
    <>
      <main style={{ marginTop: "3.7rem" }}>
        <Container maxWidth="xxl" className="py-3">
          <SectionalHeading align="center" head="Shop" />
          <Grid container={true} spacing={3} className="mt-3">
            <Grid item={true} sx={12} sm={5} md={4}></Grid>
            <Grid item={true} sx={12} sm={7} md={8}>
              <Grid container={true} spacing={3}>
                {
                  products.map(product => {
                    return <Grid key={product.id} item={true} xs={12} sm={6} md={6} lg={4}>
                      <ProductCard id={product.id}  onAddToCart={onAddToCart} image={product.image.url} price={product.price.formatted_with_symbol} prodName={product.name} permalink={product.permalink} />
                    </Grid>
                  })
                }
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </main>
    </>
  )
}

export default Category