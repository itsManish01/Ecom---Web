
  import axios from "axios";
  import {CLEAR_ALL_ERRORS,
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_REQUEST_ADMIN,
    ALL_PRODUCT_SUCCESS_ADMIN,
    ALL_PRODUCT_FAIL_ADMIN,
  } from "../constants/productConstants";
  export const getProduct = (keyword = "" , currentPage=1  ,price = [0,500000], category="All", ratingAbove= 0)=> async(dispatch)=>{
      try {
        dispatch({
            type : ALL_PRODUCT_REQUEST
        });
        let url = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&rating[gte]=${ratingAbove}`;
        if(category!=="All"){
            url = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&rating[gte]=${ratingAbove}`;
        }
        const {data} = await axios.get(url);
        dispatch({
            type : ALL_PRODUCT_SUCCESS,
            payload : data
        })
    } catch (error) {
        dispatch({
            type : ALL_PRODUCT_FAIL,
            payload : error.response.data.message
        })
    }
}

export const AdminAllProducts = ()=> async(dispatch) => {
    try {
        dispatch({
            type : ALL_PRODUCT_REQUEST_ADMIN
        })
        const {data}  =await axios.get('/api/v1/admin/products');
        console.log(data);
        dispatch({
            type : ALL_PRODUCT_SUCCESS_ADMIN,
            payload : data.products,
        })
    } catch (error) {
        dispatch({
            type : ALL_PRODUCT_FAIL_ADMIN ,
            error : error.response.data.message
        })
    }
}


export const clearError = ()=> async(dispatch)=>{
    dispatch({
        type : CLEAR_ALL_ERRORS
    })
}

export const createProduct =(product)=>async()=>{
    const {data} = await axios.post('/api/v1/admin/product/new',product);
    return data;
}