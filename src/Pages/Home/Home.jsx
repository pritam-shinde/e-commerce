import { Hero } from "./sections/sections";
import { Grid, Container, Box } from "@mui/material";
import { ProdCard, SectionHeading } from "../../Components/Components";

const Home = ({ products, categories }) => {
  return (
    <>
      <main>
        <Hero />
        <Grid container={true} spacing={5}>
          <Grid item={true} xs={11} sm={11} md={10} lg={10} className="mx-auto">
            {
              categories.map(item=>{
                return <section key={item.id} className="my-md-5">
                <Container maxWidth="xxl">
                  {
                    item ? item.productsData.length > 4 ? <SectionHeading align="center" head={item.name} /> : null : null
                  }
                    <Box>
                      <Grid container={true} spacing={3}>
                        {
                             item ? item.productsData ? item.productsData.slice(0,4).map(item=>{
                              return <Grid item={true} xs={12} sm={6} md={4} lg={3}>
                                <ProdCard permalink={item.permalink} image={item.image.url} prodName={item.name} price={item.price.formatted_with_symbol} />
                              </Grid>
                            }) : null : null
                        }
                      </Grid>
                    </Box>
                </Container>
              </section>
              })
            }
            
          </Grid>
        </Grid>
      </main>
    </>
  )
}

export default Home