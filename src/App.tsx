import { useState } from "react"
import Cart from "./components/Cart"
import Footer from "./components/Footer"
import Header from "./components/Header"
import ProductList from "./components/ProductList"


function App() {
 const [viewCart, setViewCart] = useState<boolean>(false)
 const pageContent = viewCart ? <Cart/> : <ProductList/>

 const content = (
  <div className="bg-slate-100 h-screen flex flex-col gap-3 p-2">
  <Header viewCart ={viewCart} setViewCart={setViewCart} />
  {pageContent}
  <Footer viewCart={viewCart}/>
  </div>
 )
  return content
}

export default App