import React, { useState, useEffect } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, Container, Grid, Box } from '@mui/material';
import { AddressForm, PaymentForm } from '../../Components/Components';
import { commerce } from '../../lib/commerce';
import { Navigate } from 'react-router-dom';

const steps = ["Shipping Address", "Payment Details"];

const Checkout = ({ cart, handleCheckoutCapture }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState({})
  const [shippingData, setShippingData] = useState({})

  useEffect(() => {
    if (cart.id) {
      const generateToken = async () => {
        try {
          const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
          setCheckoutToken(token);
        } catch {
          Navigate('/')
        }
      };
      generateToken();
    }
  }, [cart.id]);

  const nextStep = (previousActiveStep) => (setActiveStep(previousActiveStep + 1))
  const backStep = (previousActiveStep) => (setActiveStep(previousActiveStep - 1))

  const next = (data) => {
    setShippingData(data);
    nextStep(activeStep);
  }

  const Confirmation = () => {
    return <p>Confirmation</p>
  }
  return (
    <>
      <main style={{ marginTop: "3.7rem" }}>
        <Container maxWidth="xxl" className='py-5'>
          <Grid container={true}>
            <Grid item={true} xs={12} sm={10} md={10} lg={6} className="mx-auto" >
              <Box p={3} component={Paper} className="shadow">
                <Typography variant='h1' align='center' style={{ fontSize: "2rem", fontWeight: 700 }} gutterBottom>Checkout</Typography>
                <Stepper activeStep={activeStep}>
                  {
                    steps.map(step => {
                      return <Step key={step}>
                        <StepLabel>{step}</StepLabel>
                      </Step>
                    })
                  }
                </Stepper>
                {
                  activeStep === steps.length ? <Confirmation /> : checkoutToken && activeStep === 0 ? <AddressForm checkoutToken={checkoutToken} next={next} /> : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} backStep={backStep} activeStep={activeStep} handleCheckoutCapture={handleCheckoutCapture} nextStep={nextStep}  />
                }
              </Box>
            </Grid>
          </Grid>
        </Container>
      </main>
    </>
  )
}

export default Checkout