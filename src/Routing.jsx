import { Routes, Route } from 'react-router-dom';
import { Home, Category, SingleProd, Cart, Checkout, ThankYou, PrivacyPolicy, TnC, Disclaimer } from './Pages/Pages';

const Routing = ({category, products, onAddToCart, cart, handleUpdateCartItemQuantity, handleCartItemRemove, handleUpdateCartEmpty, handleCheckoutCapture, order, error}) => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home category={category} onAddToCart={onAddToCart}  />} />
        <Route path='/category/:permalink/' element={<Category onAddToCart={onAddToCart} />} />
        <Route path='/product/:permalink/' element={<SingleProd products={products}  />} />
        <Route path='/cart/' element={<Cart cart={cart} handleUpdateCartItemQuantity={handleUpdateCartItemQuantity} handleCartItemRemove={handleCartItemRemove} handleUpdateCartEmpty={handleUpdateCartEmpty} />} />
        <Route path='/checkout/' element={<Checkout cart={cart} handleCheckoutCapture={handleCheckoutCapture} order={order} error={error} />} />
        <Route path='/thank-you/' element={<ThankYou />} />
        <Route path='/privacy-policy/' element={<PrivacyPolicy />} />
        <Route path='/terms-and-conditions/' element={<TnC />} />
        <Route path='/disclaimer/' element={<Disclaimer />} />
      </Routes>
    </>
  )
}

export default Routing