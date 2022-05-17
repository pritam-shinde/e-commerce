import { useState, useEffect } from "react";
import Routing from "./Routing";
import { Header, Footer } from './Components/Components';
import { commerce } from "./lib/commerce";
import { Error } from "@mui/icons-material";
import { loadStripe } from '@stripe/stripe-js';

const App = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errormessage, setErrorMessage] = useState("");
  const stripe = loadStripe('pk_test_51L0IDlSJ5WCZzt5kxahkk7cKVygLwIWnRLkJjcfAx4aLDGIowRefFYMZ6Lan5PG0BGqLzwq0BeyPuHLLvFhWmzAA00JaS6uPcG');
  const fetchProducts = () => {
    var myHeaders = new Headers();
    myHeaders.append("X-Authorization", process.env.REACT_APP_CHEC_PUBLIC_KEY);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("https://api.chec.io/v1/products?limit=1000", requestOptions)
      .then(response => response.json())
      .then(result => setProducts(result.data))
      .catch(error => console.log('error', error));
  }

  const sortProductsPerCategory = async () => {
    let { data } = await commerce.categories.list();

    const productsPerCategory = data.reduce((acc, category) => {
      return [
        ...acc,
        {
          ...category,
          productsData: products.filter(product => product.categories.find(cat => cat.id === category.id))
        }
      ]
    }, []);

    setCategories(productsPerCategory);
  }

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  }

  const handleAddToCart = async (productId, quantity) => {
    setCart(await commerce.cart.add(productId, quantity));
  }

  const handleUpdateCartItemQuantity = async (productId, quantity) => {
    setCart(await commerce.cart.update(productId, { quantity }))
  }

  const handleCartItemRemove = async (productId) => {
    setCart(await commerce.cart.remove(productId))
  }

  const handleUpdateCartEmpty = async () => {
    setCart(await commerce.cart.empty())
  }

  const handlerefreshCart = async () => {
    setCart(await commerce.cart.refresh())
  }

  const handleCheckoutCapture = async (checkoutToken, newOrder) => {
    try {
      setOrder(await commerce.checkout.capture(checkoutToken, {...newOrder}));
      handlerefreshCart()
    } catch (error) {
        setErrorMessage(error.data.error.message);
    }
  }

  console.log(`order`, order)

  useEffect(() => { fetchProducts() }, []);
  useEffect(() => { fetchCart() }, [cart])
  useEffect(() => { sortProductsPerCategory() });

  return (
    <>
      <Header cart={cart} />
      <Routing product={products} category={categories} onAddToCart={handleAddToCart} cart={cart} handleUpdateCartItemQuantity={handleUpdateCartItemQuantity} handleCartItemRemove={handleCartItemRemove} handleUpdateCartEmpty={handleUpdateCartEmpty} handleCheckoutCapture={handleCheckoutCapture} order={order} error={errormessage} />
      <Footer />
    </>
  )
}

export default App
