import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOAD_FAIL,
  USER_LOAD_REQUEST,
  USER_LOAD_SUCCESS,
  CLEAR_ALL_ERRORS,
  USER_REGISTER_FAIL,
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
    console.log("register")
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

export const loadUser = ()=> async(dispatch)=>{
  try {
    dispatch({
      type: USER_LOAD_REQUEST
    });
    const {data}=await axios.get("/api/v1/me");
    dispatch({
      type : USER_LOAD_SUCCESS,
      payload : data.user,
    })
  } catch (error) {
    dispatch({
      type : USER_LOAD_FAIL,
      payload : error.response.data.message
    })
  }
}

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ALL_ERRORS,
  });
};

export const logout = () => async (dispatch) => {};
