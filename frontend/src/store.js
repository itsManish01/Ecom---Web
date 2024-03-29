import { configureStore } from "@reduxjs/toolkit";      
import { userReducer } from "./reducers/userReducer";
import { productReducer,productDetailsReducer, AdminAllProducts} from "./reducers/productReducer.js"
import {cartReducer} from "./reducers/cartReducer.js"
import { allOrdersReducer, orderReducer } from "./reducers/orderReducer.js";
const store = configureStore({
    reducer : {
        user : userReducer,
        products : productReducer,
        productDetails : productDetailsReducer,
        cart : cartReducer,
        order : orderReducer,
        orders : allOrdersReducer,
        allProducts : AdminAllProducts
    }
})

export default store;