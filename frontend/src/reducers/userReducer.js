import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_REQUEST,
  CLEAR_ALL_ERRORS,
} from "../constants/userConstants";

const initialState = {
  user: {},
  isAuth: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
    case USER_REGISTER_REQUEST:
      return {
        loading: true,
        user: {},
        isAuth: false,
      };
    case USER_LOGIN_SUCCESS:
    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        isAuth: true,
      };
    case USER_LOGIN_FAIL:
    case USER_REGISTER_FAIL:
      return {
        loading: false,
        error: action.payload,
        isAuth: false,
        user: {},
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
