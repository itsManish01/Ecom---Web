import { configureStore } from "@reduxjs/toolkit";      
import { userReducer } from "./reducers/userReducer";
import { productReducer,productDetailsReducer} from "./reducers/productReducer.js"
const store = configureStore({
    reducer : {
        user : userReducer,
        products : productReducer,
        productDetails : productDetailsReducer

    }
})

export default store;