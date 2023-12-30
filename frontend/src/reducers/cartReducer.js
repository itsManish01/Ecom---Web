import { ADD_TO_CART, REMOVE_FROM_CART ,SHIPPING_ADD , CLEAR_CART } from "../constants/cartConstants";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
   shippingInfo : localStorage.getItem("shippingInfo")
   ? JSON.parse(localStorage.getItem("shippingInfo"))
   : {},
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const items = state.cartItems.filter(
        (item) => item.product !== action.payload.product
      );
      return {
        ...state,
        cartItems: [...items, action.payload],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product !== action.payload.product
        ),
      };
    case SHIPPING_ADD : 
      return {
        ...state,
        shippingInfo : action.payload,    
      }
      case CLEAR_CART : 
      return{
        ...state,
        cartItems : []
      }
    default:
      return state;
  }
};
