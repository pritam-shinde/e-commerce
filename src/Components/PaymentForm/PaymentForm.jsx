import React from 'react';
import { Typography, Button, Divider, Box } from '@mui/material';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Review from './Review';

const PaymentForm = ({ shippingData, checkoutToken, backStep, activeStep, handleCheckoutCapture, nextStep }) => {
  const stripePromise = loadStripe('pk_test_51KyvrMSBleOnk0CVyprqPbvlsrirR3N8M5qoEZpNcQOs0q7rR4sbl3eb9xu96wOmvzqC6oGJM26JeoIVXYoUiruD00jP1Pp6Lo');

  const handleSubmit = async (e, elements, stripe) => {
    e.preventDefault()
    if (!elements || !stripe) return
    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });

    if (error) {
      console.log('[error]', error)
    } else {
      const { firstName, lastName, email, phone, City, address, shippingCountry, options, shippingSubdivision, zip } = shippingData;
      const order = {
        line_items: checkoutToken.live.line_items,
        customer: { firstname: firstName, lastname: lastName, email, phone },
        shipping: {
          type: "primary",
          street: address,
          town_city: City,
          county_state: shippingSubdivision,
          postal_zip: zip,
          country: shippingCountry,
          name: `${firstName} ${lastName}`
        },
        fulfillment: { shipping_method: options[0].id },
        billing: {
          name: `${firstName} ${lastName}`,
          street: address,
          town_city: City,
          county_state: shippingSubdivision,
          postal_zip_code: zip,
          country: shippingCountry
        },
        payment: {
          gateway: "stripe",
          stripe: {
            payment_method_id: paymentMethod.id
          }
        }
      }

      console.log(order)
      handleCheckoutCapture(checkoutToken.id, order)
      nextStep(activeStep)
    }

  }

  return (
    <>
      <Review checkoutToken={checkoutToken} shippingData={shippingData} />
      <Divider />
      <Box p={3}>
        <Typography variant='h6'>Payment Methods</Typography>
        <Elements stripe={stripePromise}>
          <ElementsConsumer>
            {({ elements, stripe }) => (
              <>
                <form onSubmit={(e) => handleSubmit(e, elements, stripe)} className="p-2">
                  <CardElement />
                  <br /><br />
                  <Box className='d-flex justify-content-between'>
                    <Button onClick={() => backStep(activeStep)} >Back</Button>
                    <Button type="submit" disabled={!stripe} variant="contained" color="primary">Pay {checkoutToken.live.subtotal.formatted_with_symbol}</Button>

                  </Box>
                </form>
              </>
            )}
          </ElementsConsumer>
        </Elements>
      </Box>
    </>
  )
}

export default PaymentForm