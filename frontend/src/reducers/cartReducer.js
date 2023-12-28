import { ADD_TO_CART, REMOVE_FROM_CART } from "../constants/cartConstants";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const items = state.cartItems.filter(
        (item) => item.product !== action.payload.product
      );
      return {
        cartItems: [...items, action.payload],
      };
    case REMOVE_FROM_CART:
      return {
        cartItems: state.cartItems.filter(
          (item) => item.product !== action.payload.product
        ),
      };

    default:
      return state;
  }
};
