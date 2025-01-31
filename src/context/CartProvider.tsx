/* eslint-disable no-fallthrough */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { createContext, useMemo, useReducer } from "react"

//type of CartItemType
export type CartItemType ={
    sku:string,
    name:string,
    price:number,
    qty:number
}

// type of 
type CartStateType = {cart:CartItemType[]}

//initialState
const initCartState:CartStateType = {cart:[]}

//String literals
const REDUCER_ACTION_TYPE = {
    ADD:'ADD',
    REMOVE:'REMOVE',
    QTY:'QTY',
    SUBMIT:'SUBMIT'
}

//Export type of Reducer_Action_type
export type ReducerActionType = typeof REDUCER_ACTION_TYPE

//type of reducer Action
export type ReducerAction ={
type:string,
payload?:CartItemType
}

const reducer = (state:CartStateType, action:ReducerAction):CartStateType =>{
    switch (action.type) {
        case REDUCER_ACTION_TYPE.ADD:{
            if(!action.payload){
                throw new Error("action.payload is missing in ADD action")
            }
            const {sku,name,price} = action.payload

            const filteredCart: CartItemType[] = state.cart.filter((item)=>item.sku!==sku)

            const itemExists:CartItemType|undefined = state.cart.find((item)=>item.sku === sku)

            const qty:number = itemExists? itemExists.qty+1:1

            return {...state}
        }

        case REDUCER_ACTION_TYPE.REMOVE:{
            if(!action.payload){
                throw new Error("action.payload is missing in REMOVE action")
            }
            const {sku} = action.payload
            const filteredCart:CartItemType[] = state.cart.filter((item)=>item.sku!==sku)

            return {...state, cart:[...filteredCart]}
            
        }
        case REDUCER_ACTION_TYPE.QTY:{
            if(!action.payload){
                throw new Error("action.payload is missing in Quantity action")
            }
            const {sku,qty} = action.payload
            const itemExists:CartItemType | undefined = state.cart.find(item=>item.sku===sku) 

            if(!itemExists){
                throw new Error('Item must exist in order to update quantity')
            }

            const updateItem:CartItemType = {...itemExists,qty}

            const filteredCart:CartItemType[] = state.cart.filter(item=>item.sku!==sku)

            return {...state, cart:[...filteredCart,updateItem]}


        }
        case REDUCER_ACTION_TYPE.SUBMIT:{
            return {...state, cart:[]}
        }

        default:
            throw new Error('Unidentified reducer action type')
    }
}


const useCartContext = (initCartState:CartStateType) =>{
    const [state,dispatch] = useReducer(reducer,initCartState)

    const REDUCER_ACTIONS= useMemo(()=>{  //Memoization help with avoiding re rendering
        return REDUCER_ACTION_TYPE
    },[])


    const totalItem:number = state.cart.reduce((previousValue,cartItem)=>{
        return previousValue+cartItem.qty
    },0)

    const totalPrice = new Intl.NumberFormat('en-US', {style:'currency',currency:'USD'}).format(
        state.cart.reduce((previousValue , cartItem)=>{
            return previousValue + (cartItem.qty*cartItem.price)
        },0)
    )
    

    const cart = state.cart.sort((a,b)=>{
        const itemA = Number(a.sku.slice(-4))
        const itemB = Number(b.sku.slice(-4))

        return itemA-itemB
    })

    return {dispatch,REDUCER_ACTIONS, totalItem,totalPrice,cart}
}

export type useCartContextType = ReturnType<typeof useCartContext>


const initCartContextState:useCartContextType = {
    dispatch:()=>{},
    REDUCER_ACTIONS:REDUCER_ACTION_TYPE,
    totalItem:0,
    totalPrice:'',
    cart:[],
}

export const CartContext = createContext<useCartContextType>(initCartContextState)