import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  CLEAR_ALL_ERRORS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  ALL_PRODUCT_REQUEST_ADMIN,
  ALL_PRODUCT_SUCCESS_ADMIN,
  ALL_PRODUCT_FAIL_ADMIN,
} from "../constants/productConstants";

export const productReducer = (
  state = {
    products: [],
    productsCount: 0,
    loading: true,
    error: null,
  },
  action
) => {
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
        productsCount: action.payload.productsCount,
      };
    case ALL_PRODUCT_FAIL:
      return {
        loading: true,
        error: action.payload,
      };
    case CLEAR_ALL_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
export const productDetailsReducer = (
  state = {
    product: {},
    loading: true,
  },
  action
) => {
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
        product: action.payload,
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

export const AdminAllProducts = (
  state = {
    allProducts: {},
    loading: true,
  },
  action
) => {
  switch (action.type) {
    case ALL_PRODUCT_REQUEST_ADMIN:
      return {
        loading : true,
        ...state
      };
    case ALL_PRODUCT_SUCCESS_ADMIN:
      return {
        allProducts : action.payload,
        loading : false,
      };
    case ALL_PRODUCT_FAIL_ADMIN:
      return {
        ...state,
        loading : true,
        error : action.payload
      };
      case CLEAR_ALL_ERRORS : 
      return {
        ...state,
        loading: true,
        error : undefined
      }
    default:
      return state;
  }
};
