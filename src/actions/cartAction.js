import Axios from "axios"
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT, CART_SAVE_SHIPPING } from "../constantes/cartConstantes"

export const addToCart = (produtoId, qtd) => async (dispatch, getState) =>{

    const {data} = await Axios.get(`/api/produtos/${produtoId}`)
    dispatch({
        type: CART_ADD_ITEM,
        payload:{
            name : data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            produto: data._id,
            qtd
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

}

export const removeFromCart = (produtoId) => (dispatch, getState)=>{
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: produtoId
    
    }) 

    localStorage.setItem('cartItems' , JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAdress = (data) => (dispatch) =>{
    dispatch({
        type: CART_SAVE_SHIPPING,
        payload: data
    })

    localStorage.setItem('shippingAddress' , JSON.stringify(data))

}

export const savePayment = (data) => (dispatch) =>{

    dispatch({
        type: CART_SAVE_PAYMENT,
        payload: data
    })
}