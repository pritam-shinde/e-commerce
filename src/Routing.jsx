import { Routes, Route } from 'react-router-dom';
import { Home, Category, SingleProd, Cart, Checkout, ThankYou, PrivacyPolicy, TnC, Disclaimer } from './Pages/Pages';

const Routing = ({products, categories}) => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home products={products} categories={categories} />} />
        <Route path='/category/:permalink' element={<Category />} />
        <Route path='/product/:permalink' element={<SingleProd />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/thank-you' element={<ThankYou />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/terms-and-conditions' element={<TnC />} />
        <Route path='/disclaimer' element={<Disclaimer />} />
      </Routes>
    </>
  )
}

export default Routing