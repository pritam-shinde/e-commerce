import { Container, Grid, Box } from "@mui/material";
import { Hero } from "./sections/sections";
import { SectionalHeading, ProductCard } from "../../Components/Components";

const Home = ({ category }) => {
  return (
    <>
      <main>
        <Container maxWidth="xxl" className="p-0">
          <Hero />,
          <Grid container={true}>
            <Grid item={true} xs={11} sm={11} md={10} lg={10} className="mx-auto">
              {
                category ? category.map(item => {
                  return <section className="mb-md-5 mb-3 mt-3">
                    <Container maxWidth="xxl">
                      <Box>
                        <SectionalHeading align="center" head={item.name} />
                        <Box mt={2}>
                          <Grid container={true} spacing={3}>
                            {
                              item.productsData.slice(0, 4).map(item => {
                                return <Grid item={true} xs={12} sm={6} md={4} lg={3}>
                                  <ProductCard image={item.image.url} price={item.price.formatted_with_symbol} prodName={item.name} permalink={item.permalink} />
                                </Grid>
                              })
                            }
                          </Grid>
                        </Box>
                      </Box>
                    </Container>
                  </section>
                }) : null
              }
            </Grid>
          </Grid>
        </Container>
      </main>
    </>
  )
}

export default Home