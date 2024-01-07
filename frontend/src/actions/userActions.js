import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  
  CLEAR_ALL_ERRORS,
  USER_REGISTER_FAIL,
  USER_LOGOUT_FAIL,
  USER_LOGOUT_SUCESS,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_REQUEST,
} from "../constants/userConstants";

import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const { data } = await axios.post("/api/v1/login", { email, password });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const register = (name,email,password,avatar) => async(dispatch)=>{
    try {
        dispatch({
          type: USER_REGISTER_REQUEST,
        });
        const { data } = await axios.post("/api/v1/register", { name, email, password,avatar });
        dispatch({
          type: USER_REGISTER_SUCCESS,
          payload: data.user,
        });
      } catch (error) {
        dispatch({
          type: USER_REGISTER_FAIL,
          payload: error.response.data.message,
        });
      }
}

export const logout = () => async (dispatch) => {
  try {
    await axios.get("/api/v1/logout")
    dispatch({
      type : USER_LOGOUT_SUCESS ,
    })
  } catch (error) {
    dispatch({
      type : USER_LOGOUT_FAIL,
      payload : error.response.data.message
    })
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ALL_ERRORS,
  });
};

