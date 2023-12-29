import {ORDER_ERROR,ORDER_FAIL,ORDER_REQUEST,ORDER_SUCCESS} from "../constants/orderConstants"

const initialState = {
  orderDetails : {},
  loading : false,
}

export const orderReducer = (state = initialState, action)=>{
  switch (action.type) {
    case ORDER_REQUEST:
      return {
        loading : true,
        ...state,
      }
    case ORDER_SUCCESS:
      return {
        loading : false,
        orderDetails : action.payload
      }
      
    case ORDER_FAIL:
      return {
        loading : true,
        error : action.payload
      }
    case ORDER_ERROR :
      return {
        ...state,
        error : null
      }
    default:
      return state;
  }
}