import Routing from "./Routing";
import { Header, Footer } from './Components/Components';
import { commerce } from "./lib/commerce";
import { useState, useEffect } from "react";

const App = () => {
  const [allProduct, setAllProducts] = useState([]);
  const [category, setCategory] = useState([])

  const fetchProduct = async () => {
    const { data } = await commerce.products.list();
    setAllProducts(data)
  }

  const fetchCategory = async() =>{
    const {data: products} = await commerce.products.list();
    const {data: categoriesData} = await commerce.categories.list();

    const productPerCategory = categoriesData.reduce((acc, category)=>{
      return [
        ...acc,
        {
          ...category,
          productsData: products.filter(product=> product.categories.find(cat=> cat.id === category.id))
        }
      ]
    }, []);

    setCategory(productPerCategory)
  }

  useEffect(()=>{
    fetchCategory()
  })

  useEffect(() => {
    fetchProduct();
  });

  return (
    <>
      <Header />
      <Routing products={allProduct} categories={category} />
      <Footer />
    </>
  )
}

export default App
