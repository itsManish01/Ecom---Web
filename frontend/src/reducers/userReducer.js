import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_LOAD_FAIL,
  USER_LOAD_SUCCESS,
  USER_LOAD_REQUEST,
  CLEAR_ALL_ERRORS,
  USER_LOGOUT_FAIL,
  USER_LOGOUT_SUCESS,
} from "../constants/userConstants";

const initialState = {
  user: {},
  isAuth: false,
  loading : false,
  error :null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
    case USER_REGISTER_REQUEST:
    case USER_LOAD_REQUEST:
      return {
        loading: true,
        user: {},
        isAuth: false,
      };
    case USER_LOGIN_SUCCESS:
    case USER_REGISTER_SUCCESS:
    case USER_LOAD_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        isAuth: true,
      };
    case USER_LOGIN_FAIL:
    case USER_REGISTER_FAIL:
    case USER_LOAD_FAIL:
      return {
        loading: false,
        error: action.payload,
        isAuth: false,
        user: null,
      };
    case USER_LOGOUT_SUCESS :
      return {
        loading :false,
        user : null,
        isAuth : false
      }
    case USER_LOGOUT_FAIL:{
      return {
        ...state,
        error : action.payload
      }
    }
    case CLEAR_ALL_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
