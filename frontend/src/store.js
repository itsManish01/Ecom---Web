import { configureStore } from "@reduxjs/toolkit";      
import { userReducer } from "./reducers/userReducer";
import { productReducer,productDetailsReducer} from "./reducers/productReducer.js"
import {cartReducer} from "./reducers/cartReducer.js"
const store = configureStore({
    reducer : {
        user : userReducer,
        products : productReducer,
        productDetails : productDetailsReducer,
        cart : cartReducer
    }
})

export default store;