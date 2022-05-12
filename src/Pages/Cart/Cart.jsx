import { Container, Grid, Box, Typography, Card, CardMedia, CardContent, CardActions, IconButton, Button } from '@mui/material'
import { Remove, Add } from '@mui/icons-material'
import React from 'react'
import { SectionalHeading } from '../../Components/Components'
import { Link } from 'react-router-dom'

const Cart = ({ cart, handleUpdateCartItemQuantity, handleCartItemRemove, handleUpdateCartEmpty }) => {
  return (
    <>
      <main style={{ marginTop: "3.7rem" }}>
        <Container maxWidth="xxl" className='py-3'>
          <Grid container={true}>
            <Grid item={true} xs={11} sm={11} md={10} lg={10} className="mx-auto">
              <SectionalHeading align="center" head="Cart" />
              <Box>
                {
                  cart ? !cart.line_items ? <Typography>Loading...</Typography> : cart.line_items.length === 0 ? <Typography>You have no item in your cart</Typography> :
                    <Grid container={true} spacing={3}>
                      <Grid item={true} xs={12} sm={8}>
                        <Box>
                          <Grid container={true} spacing={3}>
                            {
                              cart.line_items.map(item => {
                                return <Grid key={item.id} item={true} xs={12} sm={6} md={4}>
                                  <Card className='shadow' style={{ height: "27rem" }}>
                                    <CardMedia component="img" image={item.image.url} height="250" />
                                    <CardContent>
                                      <Typography variant='h6'>{item.name}</Typography>
                                      <Typography variant='body' style={{ color: "red" }}>{item.line_total.formatted_with_symbol}</Typography>
                                    </CardContent>
                                    <CardActions>
                                      <Grid container={true}>
                                        <Grid item={true} xs={6}>
                                          <IconButton onClick={() => { handleUpdateCartItemQuantity(item.id, item.quantity - 1) }}><Remove /></IconButton>
                                          <strong>{item.quantity}</strong>
                                          <IconButton onClick={() => { handleUpdateCartItemQuantity(item.id, item.quantity + 1) }}><Add /></IconButton>
                                        </Grid>
                                        <Grid item={true} xs={6} className="d-flex justify-content-end">
                                          <Button onClick={() => handleCartItemRemove(item.id)} variant="contained" color="secondary">Remove</Button>
                                        </Grid>
                                      </Grid>
                                    </CardActions>
                                  </Card>
                                </Grid>
                              })
                            }
                          </Grid>
                        </Box>
                      </Grid>
                      <Grid item={true} xs={12} sm={4}>
                        <Box p={1} className='bg-light'>
                          <Typography variant='h2' style={{fontSize: "1.5rem", fontWeight: "700 !important"}}>Cart Total</Typography>
                          <hr />
                          <Typography><strong>Sub-Total</strong> <span>{cart.subtotal.formatted_with_symbol}</span></Typography>
                          <Typography><strong>Total</strong> <span>{cart.subtotal.formatted_with_symbol}</span></Typography>
                          <hr />
                          <Box className='d-flex justify-content-between'>
                          <Button onClick={() => handleUpdateCartEmpty()} variant="contained" color="secondary">Empty Cart</Button>
                          <Link to="/checkout/" className='btn btn-primary'>Proceed To Checkout</Link>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                    : <Typography>You have no item in your cart</Typography>
                }
              </Box>
            </Grid>
          </Grid>
        </Container>
      </main>
    </>
  )
}

export default Cart