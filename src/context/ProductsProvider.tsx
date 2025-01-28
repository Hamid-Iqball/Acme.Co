/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, ReactElement, useEffect, useState, } from "react"

// type created
export type ProductType = {
    sku:string,
    name:string,
    price:number,
}

const initState:ProductType[] = []


//initial state with the type assign to ProductType[]
// const initState: ProductType[]= [
//             {
//                 "sku":"item0001",
//                 "name":"Widget",
//                 "price":9.99
//             },
//             { 
//                 "sku":"item0021",
//                 "name":"Premium Widget",
//                 "price":19.99
//             },
//             {   
//                 "sku":"item0003",
//                 "name":"Deluxe Widget",
//                 "price":29.99
//             }
    
// ] 

// Ensurs the type of the the values that will be provided to the the context
export type UseProductsContextType = {
    products: ProductType[]
}

//initContextState
const initContextState:UseProductsContextType = {
    products:[]
} 

//Create Context with a type already created
const ProductContext = createContext<UseProductsContextType>(initContextState)

//Specify type for children
type ChildrenType = {
    children?:ReactElement| ReactElement[]
}


// Creating Context provider
export const ProductsProvider = ({children}:ChildrenType): ReactElement =>{
    const [products, SetProducts] = useState<ProductType[]>(initState)

    useEffect(()=>{
        const fetchProducts = async():Promise<ProductType[]>=>{
            const data = await fetch('http://localhost:3500/products').then(res=>{
                return res.json()
            }).catch(err=>{
                if(err instanceof Error) console.log(err)
            })
            
            return data
        }

        fetchProducts().then(products => SetProducts(products))
    },[])


    return <ProductContext.Provider value={{products}}>
        {children}
    </ProductContext.Provider>

}


export default ProductContext


