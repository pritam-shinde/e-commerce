import { useState, useEffect } from "react";
import Routing from "./Routing";
import { Header, Footer } from './Components/Components';
import { commerce } from "./lib/commerce";

const App = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState({})

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

  const handleUpdateCartItemQuantity = async(productId, quantity) => {
    setCart(await commerce.cart.update(productId, {quantity}))
  }

  const handleCartItemRemove = async (productId) => {
    setCart(await commerce.cart.remove(productId))
  }

  const handleUpdateCartEmpty = async () => {
    setCart(await commerce.cart.empty())
  }

  useEffect(() => { fetchProducts() }, []);
  useEffect(() => { fetchCart() },[cart])
  useEffect(() => { sortProductsPerCategory() });

  return (
    <>
      <Header cart={cart} />
      <Routing product={products} category={categories} onAddToCart={handleAddToCart} cart={cart} handleUpdateCartItemQuantity={handleUpdateCartItemQuantity} handleCartItemRemove={handleCartItemRemove} handleUpdateCartEmpty={handleUpdateCartEmpty} />
      <Footer />
    </>
  )
}

export default App
