import { configureStore } from "@reduxjs/toolkit";      
import { userReducer } from "./reducers/userReducer";
import { productReducer} from "./reducers/productReducer.js"
const store = configureStore({
    reducer : {
        user : userReducer,
        products : productReducer,

    }
})

export default store;