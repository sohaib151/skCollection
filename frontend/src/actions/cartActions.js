import { CART_ADD_ITEM, CART_REMOVE_ITEM, SAVE_SHIPPING_ADDRESS ,SAVE_PAYMENT_METHOD} from "../constants/cartConstants";

import axios from "axios";

export const addToCart=(id,qty)=>async(dispatch,getState)=>{
const {data}=await axios.get(`/products/${id}`)

dispatch({
    type:CART_ADD_ITEM,
    payload:{
    product:data._id,
    image:data.image,
    price:data.price,
    name:data.name,
    countInStock:data.countInStock,
    qty,
    }
})
localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart=(id)=>async(dispatch,getState)=>{
dispatch({
    type:CART_REMOVE_ITEM,
    payload:id,
})
localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}

// save shipping address

export const saveShippingAddress=(data)=>async(dispatch)=>{
    dispatch({
        type:SAVE_SHIPPING_ADDRESS,
        payload:data,
    })
    localStorage.setItem('shippingAddress',JSON.stringify(data))
    }

    export const savePaymentMethod=(data)=>async(dispatch)=>{
        dispatch({
            type:SAVE_PAYMENT_METHOD,
            payload:data,
        })
        localStorage.setItem('paymentMethod',JSON.stringify(data))
        }