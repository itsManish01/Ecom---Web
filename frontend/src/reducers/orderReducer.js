import {ORDER_ERROR,ORDER_FAIL,ORDER_REQUEST,ORDER_SUCCESS,
  ALL_ORDER_REQUEST,ALL_ORDER_SUCCESS,ALL_ORDER_FAIL,
  ORDER_DETAILS_FAIL,ORDER_DETAILS_REQUEST,ORDER_DETAILS_SUCCESS
} from "../constants/orderConstants"

const initialState1 = {
  orderDetails : {},
  loading : false,
}

export const orderReducer = (state = initialState1, action)=>{
  switch (action.type) {
    case ORDER_REQUEST:
    case  ORDER_DETAILS_REQUEST: 
      return {
        loading : true,
        orderDetails:{},
      }
    case ORDER_SUCCESS:
    case ORDER_DETAILS_SUCCESS :
      return {
        loading : false,
        orderDetails : action.payload
      }
      
    case ORDER_FAIL:
    case ORDER_DETAILS_FAIL :
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

const initialState2 = {
  orders : [],
  loading : null,
}
export const allOrdersReducer = (state = initialState2, action)=>{
  switch (action.type) {
    case ALL_ORDER_REQUEST:
      return{
        loading : true,
        orders : [],
      }
    case ALL_ORDER_SUCCESS:
      return {
        loading : false,
        orders : action.payload,
      }
    case ALL_ORDER_FAIL:
      return{
        ...state,
        loading : true,
        error : action.payload
      }
    default:
      return state;
  }
}  