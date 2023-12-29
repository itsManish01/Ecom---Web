import { ADD_TO_CART, REMOVE_FROM_CART , SHIPPING_ADD } from "../constants/cartConstants"
export const addToCart = (product,quantity)=> async(dispatch,getState)=>{

    dispatch({
        type : ADD_TO_CART,
        payload : {
            product : product._id,
            name : product.name,
            price : product.price,
            image : product.images[0].url,
            stock : product.stock,
            quantity 
        }
    })
    
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}
export const removeFromCart = (id)=> async(dispatch,getState)=>{

    dispatch({
        type : REMOVE_FROM_CART,
        payload : { product : id}
    })
    
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}

export const shippingAdd = (details) =>async(dispatch,getState)=>{
    dispatch({
        type : SHIPPING_ADD,
        payload : details
    })
    localStorage.setItem("shippingInfo", JSON.stringify(getState().cart.shippingInfo));
}