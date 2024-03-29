  import axios from "axios";
  import {CLEAR_ALL_ERRORS,
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_REQUEST_ADMIN,
    ALL_PRODUCT_SUCCESS_ADMIN,
    ALL_PRODUCT_FAIL_ADMIN,
  } from "../constants/productConstants";
  export const getProduct = (keyword = "",price = [0,500000], category="All", ratingAbove= 0)=> async(dispatch)=>{
      try {
        dispatch({
            type : ALL_PRODUCT_REQUEST
        });
        let url = `/api/v1/products?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&rating[gte]=${ratingAbove}`;
        if(category!=="All"){
            url = `/api/v1/products?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&rating[gte]=${ratingAbove}`;
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

export const createProduct =async(product)=>{
    const {data} = await axios.post('/api/v1/admin/product/new',product);
    return data;
}

export const deleteProduct = async (productID)=>{
    const { data }= await axios.delete(`/api/v1/admin/product/${productID}`);
    return data;
}

export const updateProduct = async(productID,product)=>{
    const { data } = await axios.put(`/api/v1/admin/product/${productID}`, product);
    return data;
}