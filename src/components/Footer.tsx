import { useCallback } from "react"
import useCart from "../hooks/useCart"

type PropsType = {
    viewCart:boolean
}
function Footer({viewCart}:PropsType) {

  const {totalItem,totalPrice} =  useCart()
  const year:number =new Date().getFullYear()
  const pageContent = viewCart ? <p>Shopping Cart &copy; {year}</p> :(
    <>
    <p>
        Total Items : {totalItem}
    </p>
    <p>
        Total Price : {totalPrice}
    </p>
    <p>
        Shopping Cart &copy; {year}
    </p>
    </>
  )

  const content = (
    <footer>
        {pageContent}
    </footer>
  )
  return content
}

export default Footer