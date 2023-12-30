import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS
} from "../constants/productConstants";

const initialState = {
    products: [],
    productsCount: 0,
    loading : true,
    error : null,
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case ALL_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.productsCount
      };
    case ALL_PRODUCT_FAIL:
      return {
        loading: true,
        error: action.payload,
      };
      
    default:
      return state;
  }
};
export const productDetailsReducer = (state = {
  product : {},
  loading : true,
}, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        product : action.payload
      };
      case PRODUCT_DETAILS_FAIL:
        return {
        ...state,
        loading: true,
        error: action.payload,
      };
    default:
      return state;
  }
};
